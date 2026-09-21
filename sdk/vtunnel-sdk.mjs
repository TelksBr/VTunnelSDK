import './vtunnel-sdk.js';

const VTunnelSDK =
  typeof globalThis !== 'undefined' ? globalThis.VTunnelSDK : undefined;

const VTunnelBridgeError =
  typeof globalThis !== 'undefined'
    ? globalThis.VTunnelBridgeError
    : undefined;

const DTunnelSDK = VTunnelSDK;
const DTunnelBridgeError = VTunnelBridgeError;

export {
  VTunnelSDK,
  VTunnelBridgeError,
  DTunnelSDK,
  DTunnelBridgeError,
};
export default VTunnelSDK;
