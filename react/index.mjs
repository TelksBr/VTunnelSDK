import React, { createContext, useContext, useEffect, useRef } from 'react';
import { VTunnelSDK as ImportedVTunnelSDK, DTunnelSDK as ImportedDTunnelSDK } from '../sdk/vtunnel-sdk.mjs';

const VTunnelSDK = ImportedVTunnelSDK || ImportedDTunnelSDK;

if (typeof VTunnelSDK !== 'function') {
  throw new Error(
    'VTunnelSDK nao foi encontrado. Importe "vtunnel-sdk" antes de usar "vtunnel-sdk/react".',
  );
}

const DTunnelSDK = VTunnelSDK;
const VTunnelSDKContext = createContext(null);
const DTunnelSDKContext = VTunnelSDKContext;

function VTunnelSDKProvider(props) {
  const sdk = props.sdk ?? null;
  const options = props.options ?? {};
  const children = props.children;

  const createdSdkRef = useRef(null);

  if (!sdk && !createdSdkRef.current) {
    createdSdkRef.current = new VTunnelSDK(options);
  }

  const value = sdk ?? createdSdkRef.current;

  useEffect(() => {
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
  const sdk = useContext(VTunnelSDKContext);
  if (!sdk) {
    throw new Error('useVTunnelSDK precisa estar dentro de <VTunnelSDKProvider>.');
  }
  return sdk;
}

const useDTunnelSDK = useVTunnelSDK;

function useVTunnelEvent(eventName, listener) {
  const sdk = useVTunnelSDK();
  const listenerRef = useRef(listener);

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
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

export {
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
