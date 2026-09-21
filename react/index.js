'use strict';

const React = require('react');
const sdkModule = require('../sdk/vtunnel-sdk.js');

const VTunnelSDK =
  (sdkModule && (sdkModule.VTunnelSDK || sdkModule.DTunnelSDK || sdkModule.default)) ||
  (typeof globalThis !== 'undefined' ? (globalThis.VTunnelSDK || globalThis.DTunnelSDK) : undefined);

if (typeof VTunnelSDK !== 'function') {
  throw new Error(
    'VTunnelSDK nao foi encontrado. Importe "vtunnel-sdk" antes de usar "vtunnel-sdk/react".',
  );
}

const DTunnelSDK = VTunnelSDK;
const VTunnelSDKContext = React.createContext(null);
const DTunnelSDKContext = VTunnelSDKContext;

function VTunnelSDKProvider(props) {
  const sdk = props.sdk || null;
  const options = props.options || {};
  const children = props.children;

  const createdSdkRef = React.useRef(null);

  if (!sdk && !createdSdkRef.current) {
    createdSdkRef.current = new VTunnelSDK(options);
  }

  const value = sdk || createdSdkRef.current;

  React.useEffect(() => {
    if (sdk) return undefined;

    return () => {
      if (
        createdSdkRef.current &&
        typeof createdSdkRef.current.destroy === 'function'
      ) {
        createdSdkRef.current.destroy();
      }
    };
  }, [sdk]);

  return React.createElement(VTunnelSDKContext.Provider, { value }, children);
}

const DTunnelSDKProvider = VTunnelSDKProvider;

function useVTunnelSDK() {
  const sdk = React.useContext(VTunnelSDKContext);
  if (!sdk) {
    throw new Error('useVTunnelSDK precisa estar dentro de <VTunnelSDKProvider>.');
  }
  return sdk;
}

const useDTunnelSDK = useVTunnelSDK;

function useVTunnelEvent(eventName, listener) {
  const sdk = useVTunnelSDK();
  const listenerRef = React.useRef(listener);

  React.useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  React.useEffect(() => {
    const unsubscribe = sdk.on(eventName, (event) => {
      listenerRef.current(event);
    });
    return unsubscribe;
  }, [sdk, eventName]);
}

const useDTunnelEvent = useVTunnelEvent;

function useVTunnelNativeEvent(listener) {
  useVTunnelEvent('nativeEvent', listener);
}

const useDTunnelNativeEvent = useVTunnelNativeEvent;

function useVTunnelError(listener) {
  useVTunnelEvent('error', listener);
}

const useDTunnelError = useVTunnelError;

module.exports = {
  VTunnelSDKContext,
  VTunnelSDKProvider,
  useVTunnelSDK,
  useVTunnelEvent,
  useVTunnelNativeEvent,
  useVTunnelError,
  DTunnelSDKContext,
  DTunnelSDKProvider,
  useDTunnelSDK,
  useDTunnelEvent,
  useDTunnelNativeEvent,
  useDTunnelError,
};
