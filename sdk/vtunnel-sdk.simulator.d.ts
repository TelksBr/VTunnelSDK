import type {
  VTunnelAction,
  VTunnelAirplaneState,
  VTunnelAppColors,
  VTunnelAssistantState,
  VTunnelBridgeHost,
  VTunnelBridgeObjectName,
  VTunnelCallbackName,
  VTunnelCategory,
  VTunnelCheckUserResult,
  VTunnelDefaultConfig,
  VTunnelHotSpotStatus,
  VTunnelHotSpotInfo,
  VTunnelMessage,
  VTunnelNetworkData,
  VTunnelNotification,
  VTunnelPendingImport,
  VTunnelSemanticEventName,
  VTunnelVPNState,
  VTunnelCustomDnsConfig,
  VTunnelDnsPreset,
} from './vtunnel-sdk.js';

export interface VTunnelSDKSimulatorState {
  username: string;
  password: string;
  uuid: string;
  localConfigVersion: number;
  cdnCount: number;
  configs: VTunnelCategory[];
  defaultConfig: VTunnelDefaultConfig;
  selectedConfigId: number;
  importPublicKey: string;
  hasPendingImport: boolean;
  pendingImportDetails: VTunnelPendingImport | null;
  logs: Array<Record<string, string>>;
  vpnState: VTunnelVPNState;
  airplaneState: VTunnelAirplaneState;
  assistantState: VTunnelAssistantState;
  localIp: string | null;
  localIpv6: string | null;
  networkName: string | null;
  pingResult: string | null;
  adsEnabled: boolean;
  remainingConnectionTime: number;
  remainingConnectionTimerText: string;
  lastVpnError: string | null;
  clipboardText: string;
  isDarkMode: boolean;
  appColors: VTunnelAppColors;
  diagnosticReport: string;
  isSafeMode: boolean;
  checkUserResult: VTunnelCheckUserResult | null;
  checkUserError: string | null;
  messageError: VTunnelMessage | null;
  notification: VTunnelNotification | null;
  translations: Record<string, string>;
  translationPrefix: string;
  appConfig: Record<string, unknown>;
  deviceId: string;
  networkData: VTunnelNetworkData;
  statusBarHeight: number;
  navigationBarHeight: number;
  hotSpotStatus: VTunnelHotSpotStatus;
  hotSpotPort: number | null;
  hotSpotInfo: VTunnelHotSpotInfo;
  networkDownloadBytes: number;
  networkUploadBytes: number;
  appVersion: string;
  lastExternalUrl: string | null;
  lastAction: VTunnelAction | (string & {}) | null;
  lastWebViewUrl: string | null;
  notifications: VTunnelNotification[];
  closed: boolean;
  customDns: VTunnelCustomDnsConfig;
  dnsPresets: VTunnelDnsPreset[];
  lastCustomDnsDialogShown?: boolean;
}

export type VTunnelSDKSimulatorStatePatch = {
  [K in keyof VTunnelSDKSimulatorState]?: VTunnelSDKSimulatorState[K] extends
    | Array<unknown>
    | string
    | number
    | boolean
    | null
    | undefined
    ? VTunnelSDKSimulatorState[K]
    : VTunnelSDKSimulatorState[K] extends Record<string, unknown>
      ? Partial<VTunnelSDKSimulatorState[K]>
      : VTunnelSDKSimulatorState[K];
};

export interface VTunnelSDKSimulatorCallRecord {
  objectName: string;
  methodName: string;
  args: unknown[];
  result: unknown;
  timestamp: number;
}

export type VTunnelSDKSimulatorImplementation = ((...args: unknown[]) => unknown) | unknown;

export interface VTunnelSDKSimulatorOptions {
  window?: VTunnelBridgeHost;
  state?: VTunnelSDKSimulatorStatePatch;
  autoEvents?: boolean;
  allowInWebView?: boolean;
}

export interface VTunnelSDKSimulatorController {
  readonly window: VTunnelBridgeHost;
  readonly bridgeObjectNames: readonly VTunnelBridgeObjectName[];
  readonly callbackNames: readonly VTunnelCallbackName[];
  readonly semanticEventToCallback: Readonly<
    Record<VTunnelSemanticEventName, VTunnelCallbackName>
  >;
  readonly autoEvents: boolean;
  readonly allowInWebView: boolean;

  install(): this;
  uninstall(): this;
  isInstalled(): boolean;
  isBlockedByWebView(): boolean;

  getState(): VTunnelSDKSimulatorState;
  setState(nextState: VTunnelSDKSimulatorStatePatch): this;
  resetState(nextState?: VTunnelSDKSimulatorStatePatch): this;

  getCalls(): VTunnelSDKSimulatorCallRecord[];
  clearCalls(): this;

  setImplementation(
    objectName: VTunnelBridgeObjectName | (string & {}),
    methodName: string,
    implementation: VTunnelSDKSimulatorImplementation,
  ): this;
  removeImplementation(
    objectName: VTunnelBridgeObjectName | (string & {}),
    methodName: string,
  ): this;
  clearImplementations(): this;

  emit(
    name: VTunnelSemanticEventName,
    payload?: unknown,
  ): boolean;
  emit(
    name: VTunnelCallbackName,
    payload?: unknown,
    ...extraArgs: unknown[]
  ): boolean;

  getBridgeObject(objectName: VTunnelBridgeObjectName | (string & {})): unknown;
}

export interface VTunnelSDKSimulatorAPI {
  readonly BRIDGE_OBJECT_NAMES: readonly VTunnelBridgeObjectName[];
  readonly VT_BRIDGE_OBJECT_NAMES: readonly string[];
  readonly DT_BRIDGE_OBJECT_NAMES: readonly string[];
  readonly NATIVE_CALLBACK_NAMES: readonly VTunnelCallbackName[];
  readonly SEMANTIC_EVENT_TO_CALLBACK: Readonly<
    Record<VTunnelSemanticEventName, VTunnelCallbackName>
  >;
  createVTunnelSDKSimulator(options?: VTunnelSDKSimulatorOptions): VTunnelSDKSimulatorController;
  installVTunnelSDKSimulator(options?: VTunnelSDKSimulatorOptions): VTunnelSDKSimulatorController;
  createDTunnelSDKSimulator(options?: VTunnelSDKSimulatorOptions): VTunnelSDKSimulatorController;
  installDTunnelSDKSimulator(options?: VTunnelSDKSimulatorOptions): VTunnelSDKSimulatorController;
}

export const BRIDGE_OBJECT_NAMES: readonly VTunnelBridgeObjectName[];
export const VT_BRIDGE_OBJECT_NAMES: readonly string[];
export const DT_BRIDGE_OBJECT_NAMES: readonly string[];
export const NATIVE_CALLBACK_NAMES: readonly VTunnelCallbackName[];
export const SEMANTIC_EVENT_TO_CALLBACK: Readonly<
  Record<VTunnelSemanticEventName, VTunnelCallbackName>
>;

export function createVTunnelSDKSimulator(
  options?: VTunnelSDKSimulatorOptions,
): VTunnelSDKSimulatorController;

export function installVTunnelSDKSimulator(
  options?: VTunnelSDKSimulatorOptions,
): VTunnelSDKSimulatorController;

export function createDTunnelSDKSimulator(
  options?: VTunnelSDKSimulatorOptions,
): VTunnelSDKSimulatorController;

export function installDTunnelSDKSimulator(
  options?: VTunnelSDKSimulatorOptions,
): VTunnelSDKSimulatorController;

declare const VTunnelSDKSimulator: VTunnelSDKSimulatorAPI;

// Backward compatibility type aliases
export type DTunnelSDKSimulatorState = VTunnelSDKSimulatorState;
export type DTunnelSDKSimulatorStatePatch = VTunnelSDKSimulatorStatePatch;
export type DTunnelSDKSimulatorCallRecord = VTunnelSDKSimulatorCallRecord;
export type DTunnelSDKSimulatorImplementation = VTunnelSDKSimulatorImplementation;
export type DTunnelSDKSimulatorOptions = VTunnelSDKSimulatorOptions;
export type DTunnelSDKSimulatorController = VTunnelSDKSimulatorController;
export type DTunnelSDKSimulatorAPI = VTunnelSDKSimulatorAPI;

declare global {
  interface Window {
    VTunnelSDKSimulator: VTunnelSDKSimulatorAPI;
    VTunnelSDKSimulatorController?: VTunnelSDKSimulatorController;
    DTunnelSDKSimulator: VTunnelSDKSimulatorAPI;
    DTunnelSDKSimulatorController?: VTunnelSDKSimulatorController;
  }

  var VTunnelSDKSimulator: VTunnelSDKSimulatorAPI;
  var VTunnelSDKSimulatorController: VTunnelSDKSimulatorController | undefined;
  var DTunnelSDKSimulator: VTunnelSDKSimulatorAPI;
  var DTunnelSDKSimulatorController: VTunnelSDKSimulatorController | undefined;
}

export default VTunnelSDKSimulator;
