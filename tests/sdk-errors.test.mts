import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { VTunnelSDK, DTunnelSDK } = require('../sdk/vtunnel-sdk.js') as {
  VTunnelSDK: new (options?: {
    window?: Record<string, unknown>;
    strict?: boolean;
    autoRegisterNativeEvents?: boolean;
  }) => {
    main: { getVpnState: () => string | null };
    on: (eventName: 'error', listener: (event: { error: unknown }) => void) => void;
    destroy: () => void;
  };
  DTunnelSDK: new (options?: {
    window?: Record<string, unknown>;
    strict?: boolean;
    autoRegisterNativeEvents?: boolean;
  }) => {
    main: { getVpnState: () => string | null };
    on: (eventName: 'error', listener: (event: { error: unknown }) => void) => void;
    destroy: () => void;
  };
};

test('strict=false returns null and emits error event when bridge object is missing', () => {
  const sdk = new VTunnelSDK({
    window: {},
    strict: false,
    autoRegisterNativeEvents: false,
  });

  const errors: Array<{
    code?: string;
    details?: Record<string, unknown>;
  }> = [];

  sdk.on('error', (event) => {
    errors.push((event as { error: { code?: string; details?: Record<string, unknown> } }).error);
  });

  const result = sdk.main.getVpnState();

  assert.equal(result, null);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].code, 'BRIDGE_OBJECT_NOT_FOUND');
  assert.equal(errors[0].details?.objectName, 'VtGetVpnState');
  assert.equal(errors[0].details?.methodName, 'execute');

  sdk.destroy();
});

test('strict=true throws VTunnelBridgeError when bridge object is missing', () => {
  const sdk = new VTunnelSDK({
    window: {},
    strict: true,
    autoRegisterNativeEvents: false,
  });

  assert.throws(
    () => sdk.main.getVpnState(),
    (error) =>
      Boolean(
        error &&
          typeof error === 'object' &&
          'name' in error &&
          'code' in error &&
          'details' in error &&
          ((error as { name?: string }).name === 'VTunnelBridgeError' ||
           (error as { name?: string }).name === 'DTunnelBridgeError') &&
          (error as { code?: string }).code === 'BRIDGE_OBJECT_NOT_FOUND' &&
          (error as { details?: { objectName?: string } }).details?.objectName ===
            'VtGetVpnState',
      ),
  );

  sdk.destroy();
});
