import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import type { VTunnelSDK as SDK, VTunnelSDKOptions, VTunnelRewardedAdState, VTunnelAdsState } from '../sdk/vtunnel-sdk.js';
import type { VTunnelSDKSimulatorController } from '../sdk/vtunnel-sdk.simulator.js';
const require = createRequire(import.meta.url);
const { VTunnelSDK } = require('../sdk/vtunnel-sdk.js') as { VTunnelSDK: new(options: VTunnelSDKOptions) => SDK };
const { installVTunnelSDKSimulator } = require('../sdk/vtunnel-sdk.simulator.js') as { installVTunnelSDKSimulator: (options: object) => VTunnelSDKSimulatorController };
function setup(state: object = {}) {
  const window: Record<string, any> = {};
  const sim = installVTunnelSDKSimulator({ window, state });
  const sdk = new VTunnelSDK({ window, strict: true });
  return { window, sim, sdk };
}

test('Ads requests forward to the Dt compatibility bridge and return parsed native state', () => {
  const calls: string[] = [];
  const sdk = new VTunnelSDK({ window: { DtAds: {
    getState: () => JSON.stringify({ enabled: true, remainingSeconds: 123 }),
    showRewarded: () => calls.push('show'), cancelRewarded: () => calls.push('cancel'), preloadRewarded: () => calls.push('preload'),
  } }, strict: true });
  assert.equal(sdk.ads.isSupported(), true);
  assert.equal(sdk.ads.getState()?.remainingSeconds, 123);
  sdk.ads.preloadRewarded(); sdk.ads.showRewarded(); sdk.ads.cancelRewarded();
  assert.deepEqual(calls, ['preload', 'show', 'cancel']);
  sdk.destroy();
});

test('rewarded lifecycle grants time exactly once and emits one event per transition', () => {
  const { sdk, sim } = setup();
  const states: VTunnelRewardedAdState[] = [];
  sdk.on('adsRewardedState', event => states.push(event.payload));
  const initial = sdk.ads.getState()!.remainingSeconds;
  sdk.ads.showRewarded();
  assert.equal(states.length, 1);
  assert.equal(states[0].state, 'LOADING');
  sim.simulateRewardedResult('ready'); sim.simulateRewardedResult('shown');
  sdk.ads.cancelRewarded(); // Video already playing: cancel must do nothing.
  assert.equal(sdk.ads.getState()!.rewarded.state, 'SHOWING');
  sim.simulateRewardedResult('rewarded'); sim.simulateRewardedResult('rewarded');
  assert.equal(states.filter(s => s.state === 'REWARDED').length, 1);
  assert.equal(sdk.main.getRemainingConnectionTime(), initial + 7200);
  sim.simulateRewardedResult('closed');
  assert.equal(sdk.ads.getState()!.rewarded.busy, false);
  assert.equal(sdk.ads.getState()!.rewarded.rewardEarned, true);
  sim.simulateRewardedResult('rewarded');
  assert.equal(sdk.main.getRemainingConnectionTime(), initial + 7200);
  sdk.destroy(); sim.uninstall();
});

test('cancel, duplicate requests, ad errors and premature close never grant time', () => {
  const { sdk, sim } = setup();
  const states: VTunnelRewardedAdState[] = [];
  sdk.on('adsRewardedState', e => states.push(e.payload));
  const initial = sdk.main.getRemainingConnectionTime();
  sdk.ads.showRewarded(); const id = sdk.ads.getState()!.rewarded.requestId;
  sdk.ads.showRewarded();
  assert.equal(states.at(-1)!.state, 'REJECTED');
  assert.equal(sdk.ads.getState()!.rewarded.requestId, id);
  sdk.ads.cancelRewarded();
  assert.equal(sdk.ads.getState()!.rewarded.state, 'CANCELLED');
  sim.simulateRewardedResult('rewarded');
  sdk.ads.showRewarded(); sim.simulateRewardedResult('failed', 'No fill');
  assert.equal(states.at(-1)!.error, 'No fill');
  sdk.ads.showRewarded(); sim.simulateRewardedResult('shown'); sim.simulateRewardedResult('closed');
  assert.equal(sdk.main.getRemainingConnectionTime(), initial);
  sim.setState({ adsEnabled: false }); sdk.ads.showRewarded();
  assert.equal(states.at(-1)!.state, 'FAILED');
  assert.equal(sdk.ads.getState()!.rewarded.busy, false);
  sdk.destroy(); sim.uninstall();
});

test('timer warning, one grace window and expiry use native snapshots even with native UI disabled', () => {
  const { sdk, sim } = setup({ vpnState: 'CONNECTED', remainingConnectionTime: 11, ads: { warningSeconds: 10, nativeUi: { warningPrompt: false, expiredPrompt: false } } });
  const warning: VTunnelAdsState[] = [], expired: VTunnelAdsState[] = [], ticks: number[] = [];
  sdk.on('adsTimeWarning', e => warning.push(e.payload));
  sdk.on('adsTimeExpired', e => expired.push(e.payload));
  sdk.on('adsTimerUpdated', e => ticks.push(e.payload));
  sim.tickAds();
  assert.equal(warning.length, 1); assert.equal(warning[0].remainingSeconds, 10);
  assert.equal(warning[0].nativeUi.warningPrompt, false);
  sim.tickAds(10); assert.equal(sdk.ads.getState()!.remainingSeconds, 120);
  sim.tickAds(120);
  assert.equal(expired.length, 1); assert.equal(expired[0].remainingSeconds, 0);
  assert.equal(expired[0].vpnConnected, false);
  assert.equal(expired[0].nativeUi.expiredPrompt, false);
  assert.equal(ticks.at(-1), 0);
  sdk.destroy(); sim.uninstall();
});

test('preload exposes readiness and new native state callback is parsed for every alias', () => {
  const { sdk, sim, window } = setup();
  sdk.ads.preloadRewarded(); assert.equal(sdk.ads.getState()!.rewarded.ready, true);
  let last: VTunnelRewardedAdState | undefined;
  sdk.on('adsRewardedState', e => last = e.payload);
  for (const callback of ['VtAdsRewardedStateEvent', 'DtAdsRewardedStateEvent', 'vtAdsRewardedStateListener', 'dtAdsRewardedStateListener']) {
    window[callback](JSON.stringify({ state: 'READY', ready: true }));
    assert.equal(last!.ready, true);
  }
  sdk.destroy(); sim.uninstall();
});

test('old Android DOM timer fallback registers once and removes listeners on destroy', () => {
  const listeners = new Map<string, (event: any) => void>();
  const window = { addEventListener: (name: string, fn: any) => listeners.set(name, fn), removeEventListener: (name: string) => listeners.delete(name) };
  const sdk = new VTunnelSDK({ window });
  assert.equal(sdk.ads.isSupported(), false);
  const ticks: number[] = [];
  sdk.on('adsTimerUpdated', e => ticks.push(e.payload));
  sdk.registerNativeEventHandlers();
  assert.equal(listeners.size, 1);
  listeners.get('vt_ads_timer_updated')!({ detail: 42 });
  assert.deepEqual(ticks, [42]);
  sdk.destroy(); assert.equal(listeners.size, 0);
});
