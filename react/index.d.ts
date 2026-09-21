import type { Context, ReactElement, ReactNode } from 'react';
import type {
  VTunnelAnyNativeEventEnvelope,
  VTunnelAnySemanticEventEnvelope,
  VTunnelCallbackName,
  VTunnelErrorEvent,
  VTunnelNativeEventByCallback,
  VTunnelSDK,
  VTunnelSDKOptions,
  VTunnelSemanticEventEnvelope,
  VTunnelSemanticEventName,
  DTunnelAnyNativeEventEnvelope,
  DTunnelAnySemanticEventEnvelope,
  DTunnelCallbackName,
  DTunnelErrorEvent,
  DTunnelNativeEventByCallback,
  DTunnelSDK as DTunnelSDKType,
  DTunnelSDKOptions as DTunnelSDKOptionsType,
  DTunnelSemanticEventEnvelope as DTunnelSemanticEventEnvelopeType,
  DTunnelSemanticEventName as DTunnelSemanticEventNameType,
} from '../sdk/vtunnel-sdk';

export interface VTunnelSDKProviderProps {
  children?: ReactNode;
  sdk?: VTunnelSDK;
  options?: VTunnelSDKOptions;
}

export declare const VTunnelSDKContext: Context<VTunnelSDK | null>;

export declare function VTunnelSDKProvider(
  props: VTunnelSDKProviderProps,
): ReactElement;

export declare function useVTunnelSDK(): VTunnelSDK;

export declare function useVTunnelEvent<E extends VTunnelSemanticEventName>(
  eventName: E,
  listener: (event: VTunnelSemanticEventEnvelope<E>) => void,
): void;

export declare function useVTunnelEvent(
  eventName: 'nativeEvent',
  listener: (event: VTunnelAnySemanticEventEnvelope) => void,
): void;

export declare function useVTunnelEvent<E extends VTunnelCallbackName>(
  eventName: `native:${E}`,
  listener: (event: VTunnelNativeEventByCallback<E>) => void,
): void;

export declare function useVTunnelEvent(
  eventName: `native:${string}`,
  listener: (event: VTunnelAnyNativeEventEnvelope) => void,
): void;

export declare function useVTunnelEvent(
  eventName: 'error',
  listener: (event: VTunnelErrorEvent) => void,
): void;

export declare function useVTunnelEvent(
  eventName: string,
  listener: (event: unknown) => void,
): void;

export declare function useVTunnelNativeEvent(
  listener: (event: VTunnelAnySemanticEventEnvelope) => void,
): void;

export declare function useVTunnelError(
  listener: (event: VTunnelErrorEvent) => void,
): void;

// Backward-compatible DTunnel aliases
export type DTunnelSDKProviderProps = VTunnelSDKProviderProps;
export declare const DTunnelSDKContext: Context<VTunnelSDK | null>;
export declare function DTunnelSDKProvider(
  props: DTunnelSDKProviderProps,
): ReactElement;
export declare function useDTunnelSDK(): VTunnelSDK;
export declare function useDTunnelEvent<E extends DTunnelSemanticEventNameType>(
  eventName: E,
  listener: (event: DTunnelSemanticEventEnvelopeType<E>) => void,
): void;
export declare function useDTunnelEvent(
  eventName: 'nativeEvent',
  listener: (event: DTunnelAnySemanticEventEnvelope) => void,
): void;
export declare function useDTunnelEvent<E extends DTunnelCallbackName>(
  eventName: `native:${E}`,
  listener: (event: DTunnelNativeEventByCallback<E>) => void,
): void;
export declare function useDTunnelEvent(
  eventName: `native:${string}`,
  listener: (event: DTunnelAnyNativeEventEnvelope) => void,
): void;
export declare function useDTunnelEvent(
  eventName: 'error',
  listener: (event: DTunnelErrorEvent) => void,
): void;
export declare function useDTunnelEvent(
  eventName: string,
  listener: (event: unknown) => void,
): void;
export declare function useDTunnelNativeEvent(
  listener: (event: DTunnelAnySemanticEventEnvelope) => void,
): void;
export declare function useDTunnelError(
  listener: (event: DTunnelErrorEvent) => void,
): void;
