import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { DTunnelSDK } = require('../sdk/dtunnel-sdk.js') as {
  DTunnelSDK: new (options?: {
    window?: Record<string, unknown>;
    strict?: boolean;
    autoRegisterNativeEvents?: boolean;
  }) => {
    readonly main: {
      getVpnState: () => string | null;
      startVpn: () => void;
    };
    readonly app: {
      getAppConfig: (name: string) => { value: unknown } | null;
    };
    readonly on: (
      eventName: string,
      listener: (event: { payload: unknown }) => void,
    ) => () => void;
    readonly destroy: () => void;
  };
};

const simulatorModule = require('../sdk/dtunnel-sdk.simulator.js') as {
  BRIDGE_OBJECT_NAMES: readonly string[];
  installDTunnelSDKSimulator: (options?: {
    window?: Record<string, unknown>;
    autoEvents?: boolean;
    state?: Record<string, unknown>;
    allowInWebView?: boolean;
  }) => {
    install: () => void;
    uninstall: () => void;
    isInstalled: () => boolean;
    isBlockedByWebView: () => boolean;
    getCalls: () => Array<{
      objectName: string;
      methodName: string;
      args: unknown[];
      result: unknown;
    }>;
    setState: (state: Record<string, unknown>) => void;
    emit: (name: string, payload?: unknown, ...extraArgs: unknown[]) => boolean;
    simulateConfigImport: (configs?: Array<Record<string, unknown>>, source?: string) => unknown;
  };
};

test('installs all bridge objects and integrates with SDK calls/events', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
    autoEvents: true,
  });

  simulatorModule.BRIDGE_OBJECT_NAMES.forEach((objectName) => {
    assert.equal(typeof windowRef[objectName], 'object');
  });

  const sdk = new DTunnelSDK({
    window: windowRef,
    strict: true,
    autoRegisterNativeEvents: true,
  });

  let lastVpnState: unknown = null;
  sdk.on('vpnState', (event) => {
    lastVpnState = event.payload;
  });

  sdk.main.startVpn();

  assert.equal(sdk.main.getVpnState(), 'CONNECTED');
  assert.equal(lastVpnState, 'CONNECTED');

  const calls = simulator.getCalls();
  assert.equal(
    calls.some(
      (call) =>
        (call.objectName === 'VtExecuteVpnStart' || call.objectName === 'DtExecuteVpnStart') &&
        call.methodName === 'execute',
    ),
    true,
  );

  sdk.destroy();
  simulator.uninstall();
});

test('supports state patching and manual semantic event emission', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
    autoEvents: false,
  });

  simulator.setState({
    appConfig: { support_url: 'https://sim.local/support' },
    checkUserResult: {
      username: 'qa-user',
      count_connections: '1',
      limit_connections: '3',
      expiration_date: '2099-12-31',
      expiration_days: '9999',
    },
  });

  const sdk = new DTunnelSDK({
    window: windowRef,
    strict: true,
    autoRegisterNativeEvents: true,
  });

  const appConfig = sdk.app.getAppConfig('support_url');
  assert.equal(appConfig?.value, 'https://sim.local/support');

  let userPayload: Record<string, string> | null = null;
  sdk.on('checkUserResult', (event) => {
    userPayload = event.payload as Record<string, string> | null;
  });

  const emitted = simulator.emit('checkUserResult', {
    username: 'qa-user',
    count_connections: '1',
    limit_connections: '3',
    expiration_date: '2099-12-31',
    expiration_days: '9999',
  });

  assert.equal(emitted, true);
  const parsedUserPayload = userPayload as Record<string, string> | null;
  assert.equal(parsedUserPayload?.username, 'qa-user');
  assert.equal(parsedUserPayload?.limit_connections, '3');

  sdk.destroy();
  simulator.uninstall();
});

test('does not install simulator when native WebView bridge is present', () => {
  const nativeBridge = { execute: () => 'CONNECTED' };
  const windowRef: Record<string, unknown> = {
    DtGetVpnState: nativeBridge,
  };

  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
  });

  assert.equal(simulator.isInstalled(), false);
  assert.equal(simulator.isBlockedByWebView(), true);
  assert.equal(windowRef.DtGetVpnState, nativeBridge);
});

test('simulator correctly resolves categories, import keys, colors and device methods', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
    autoEvents: false,
  });

  const sdk = new DTunnelSDK({
    window: windowRef,
    strict: true,
    autoRegisterNativeEvents: false,
  });

  const categories = (sdk as unknown as { config: { getCategories: () => Array<{ id: number; name: string }> } }).config.getCategories();
  assert.equal(Array.isArray(categories), true);
  assert.equal(categories[0].name, 'Brasil');

  const importKey = (sdk as unknown as { config: { getImportPublicKey: () => string } }).config.getImportPublicKey();
  assert.equal(importKey, 'vtunnel_pub_key_mock_123');

  const isAds = (sdk as unknown as { main: { isAdsEnabled: () => boolean } }).main.isAdsEnabled();
  assert.equal(isAds, true);

  const colors = (sdk as unknown as { android: { getAppColors: () => { backgroundColor: string } } }).android.getAppColors();
  assert.equal(colors.backgroundColor, '#121212');

  const isDark = (sdk as unknown as { android: { isDarkMode: () => boolean } }).android.isDarkMode();
  assert.equal(isDark, true);

  sdk.destroy();
  simulator.uninstall();
});

test('simulator correctly manages custom DNS module state and dialog', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
    autoEvents: true,
  });

  const { VTunnelSDK } = require('../sdk/vtunnel-sdk.js');
  const sdk = new VTunnelSDK({
    window: windowRef,
    strict: true,
    autoRegisterNativeEvents: false,
  });

  // Default state: disabled
  assert.equal(sdk.dns.isEnabled(), false);

  const initialDns = sdk.dns.get();
  assert.equal(initialDns.enabled, false);
  assert.equal(initialDns.primary, '1.1.1.1');
  assert.equal(initialDns.secondary, '1.0.0.1');

  // Presets available
  const presets = sdk.dns.getPresets();
  assert.equal(Array.isArray(presets), true);
  assert.equal(presets.length > 0, true);
  assert.equal(presets[0].id, 'cloudflare');

  // Set new DNS via object
  sdk.dns.set({ enabled: true, primary: '8.8.8.8', secondary: '8.8.4.4' });
  assert.equal(sdk.dns.isEnabled(), true);
  const updatedDns = sdk.dns.get();
  assert.equal(updatedDns.enabled, true);
  assert.equal(updatedDns.primary, '8.8.8.8');
  assert.equal(updatedDns.secondary, '8.8.4.4');

  // Set new DNS via positional args
  sdk.dns.set(false, '9.9.9.9', '149.112.112.112');
  assert.equal(sdk.dns.isEnabled(), false);
  const positionalDns = sdk.dns.get();
  assert.equal(positionalDns.primary, '9.9.9.9');

  // Show native custom DNS dialog
  sdk.dns.showDialog();
  const calls = simulator.getCalls();
  const dialogCall = calls.find((c) => c.objectName === 'VtShowCustomDnsDialog' && c.methodName === 'execute');
  assert.ok(dialogCall, 'VtShowCustomDnsDialog.execute was called');

  sdk.destroy();
  simulator.uninstall();
});

test('simulator drives Play in-app update through playUpdateState events', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({
    window: windowRef,
    autoEvents: true,
    state: { playUpdate: { status: 'available', mode: 'FLEXIBLE', nativePrompt: false, availableVersionCode: 455 } },
  });

  const { VTunnelSDK } = require('../sdk/vtunnel-sdk.js');
  const sdk = new VTunnelSDK({ window: windowRef, strict: true });

  const statuses: string[] = [];
  sdk.on('playUpdateState', (event: { payload: { status: string } }) => {
    // Vt + Dt aliases both fire for the same change.
    if (statuses[statuses.length - 1] !== event.payload.status) statuses.push(event.payload.status);
  });

  const initial = sdk.playUpdate.getState();
  assert.equal(initial.status, 'available');
  assert.equal(initial.availableVersionCode, 455);
  assert.equal(initial.nativePrompt, false);

  sdk.playUpdate.start('FLEXIBLE');
  assert.deepEqual(statuses, ['downloading', 'downloaded']);
  assert.equal(sdk.playUpdate.isDownloaded(), true);

  sdk.playUpdate.complete();
  assert.deepEqual(statuses, ['downloading', 'downloaded', 'installing', 'installed']);
  assert.equal(sdk.playUpdate.getState().status, 'installed');

  const startCall = simulator.getCalls().find((c) => c.objectName === 'VtPlayUpdate' && c.methodName === 'start');
  assert.deepEqual(startCall?.args, ['FLEXIBLE']);

  sdk.destroy();
  simulator.uninstall();
});

test('simulator drives offline config import through configImport events', () => {
  const windowRef: Record<string, unknown> = {};
  const simulator = simulatorModule.installDTunnelSDKSimulator({ window: windowRef, autoEvents: true });

  const { VTunnelSDK } = require('../sdk/vtunnel-sdk.js');
  const sdk = new VTunnelSDK({ window: windowRef, strict: true });

  const events: Array<{ status: string; count: number; configs: Array<{ id?: number; name: string }> }> = [];
  sdk.on('configImport', (event: { payload: (typeof events)[number] }) => {
    // Vt + Dt aliases both fire for the same change.
    if (events[events.length - 1]?.status !== event.payload.status) events.push(event.payload);
  });

  assert.equal(sdk.configImport.getPending(), null);
  assert.equal(sdk.configImport.hasPending(), false);

  simulator.simulateConfigImport([{ name: 'VIVO SSH', mode: 'SSH' }, { name: 'TIM XRAY', mode: 'XRAY' }], 'clipboard');
  assert.equal(events[0].status, 'pending');
  assert.equal(events[0].count, 2);
  const pending = sdk.configImport.getPending();
  assert.equal(pending.source, 'clipboard');
  assert.deepEqual(pending.configs.map((c: { name: string }) => c.name), ['VIVO SSH', 'TIM XRAY']);

  sdk.configImport.confirm();
  assert.equal(events[1].status, 'imported');
  assert.equal(events[1].configs.every((c) => typeof c.id === 'number'), true);
  assert.equal(sdk.configImport.hasPending(), false);

  simulator.simulateConfigImport([{ name: 'OUTRA' }]);
  sdk.configImport.reject();
  assert.deepEqual(events.map((e) => e.status), ['pending', 'imported', 'pending', 'rejected']);
  assert.equal(sdk.configImport.getPending(), null);

  sdk.destroy();
  simulator.uninstall();
});

