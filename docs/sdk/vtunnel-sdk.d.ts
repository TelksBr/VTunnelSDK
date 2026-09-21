export type VTunnelSemanticEventName =
  | 'vpnState'
  | 'vpnStartedSuccess'
  | 'vpnStoppedSuccess'
  | 'newLog'
  | 'newDefaultConfig'
  | 'checkUserStarted'
  | 'checkUserResult'
  | 'checkUserError'
  | 'messageError'
  | 'showSuccessToast'
  | 'showErrorToast'
  | 'notification'
  | 'localIp'
  | 'networkName'
  | 'pingResult'
  | 'checkingAppUpdate'
  | 'airplaneState'
  | 'hotSpotState'
  | 'reloadRequest';

export type VTunnelCallbackName =
  | 'VtVpnStateEvent'
  | 'VtVpnStartedSuccessEvent'
  | 'VtVpnStoppedSuccessEvent'
  | 'VtNewLogEvent'
  | 'VtNewDefaultConfigEvent'
  | 'VtCheckUserStartedEvent'
  | 'VtCheckUserResultEvent'
  | 'VtCheckUserErrorEvent'
  | 'VtMessageErrorEvent'
  | 'VtSuccessToastEvent'
  | 'VtErrorToastEvent'
  | 'VtNotificationEvent'
  | 'VtLocalIpEvent'
  | 'VtNetworkNameEvent'
  | 'VtPingResultEvent'
  | 'VtCheckingAppUpdateEvent'
  | 'VtAirplaneStateEvent'
  | 'VtHotSpotStateEvent'
  | 'VtReloadRequestEvent'
  | 'vtVpnStateListener'
  | 'vtVpnStartedSuccessListener'
  | 'vtVpnStoppedSuccessListener'
  | 'vtOnNewLogListener'
  | 'vtConfigClickListener'
  | 'vtCheckUserStartedListener'
  | 'vtCheckUserModelListener'
  | 'vtCheckUserErrorListener'
  | 'vtMessageErrorListener'
  | 'vtShowSuccessToastListener'
  | 'vtShowErrorToastListener'
  | 'vtLocalIpListener'
  | 'vtNetworkNameListener'
  | 'vtPingResultListener'
  | 'vtCheckingAppUpdateListener'
  | 'vtAirplaneStateListener'
  | 'vtHotSpotStateListener'
  | 'vtReloadRequestListener'
  | 'DtVpnStateEvent'
  | 'DtVpnStartedSuccessEvent'
  | 'DtVpnStoppedSuccessEvent'
  | 'DtNewLogEvent'
  | 'DtNewDefaultConfigEvent'
  | 'DtCheckUserStartedEvent'
  | 'DtCheckUserResultEvent'
  | 'DtCheckUserErrorEvent'
  | 'DtMessageErrorEvent'
  | 'DtSuccessToastEvent'
  | 'DtErrorToastEvent'
  | 'DtNotificationEvent'
  | 'DtLocalIpEvent'
  | 'DtNetworkNameEvent'
  | 'DtPingResultEvent'
  | 'DtCheckingAppUpdateEvent'
  | 'DtAirplaneStateEvent'
  | 'DtHotSpotStateEvent'
  | 'DtReloadRequestEvent'
  | 'dtVpnStateListener'
  | 'dtVpnStartedSuccessListener'
  | 'dtVpnStoppedSuccessListener'
  | 'dtOnNewLogListener'
  | 'dtConfigClickListener'
  | 'dtCheckUserStartedListener'
  | 'dtCheckUserModelListener'
  | 'dtCheckUserErrorListener'
  | 'dtMessageErrorListener'
  | 'dtShowSuccessToastListener'
  | 'dtShowErrorToastListener'
  | 'dtLocalIpListener'
  | 'dtNetworkNameListener'
  | 'dtPingResultListener'
  | 'dtCheckingAppUpdateListener'
  | 'dtAirplaneStateListener'
  | 'dtHotSpotStateListener'
  | 'dtReloadRequestListener';

export type DTunnelBridgeObjectName =
  | 'DtSetConfig'
  | 'DtGetConfigs'
  | 'DtGetCategories'
  | 'DtGetSelectedCategory'
  | 'DtGetSelectedCategoryId'
  | 'DtGetConfigsByCategory'
  | 'DtGetSelectedConfig'
  | 'DtGetSelectedConfigId'
  | 'DtGetConfigCount'
  | 'DtGetDefaultConfig'
  | 'DtExecuteDialogConfig'
  | 'DtGetImportPublicKey'
  | 'DtCopyImportPublicKey'
  | 'DtImportConfig'
  | 'DtHasPendingConfigImport'
  | 'DtGetPendingConfigImportDetails'
  | 'DtUsername'
  | 'DtPassword'
  | 'DtGetLocalConfigVersion'
  | 'DtCDNCount'
  | 'DtEndpointCount'
  | 'DtUuid'
  | 'DtGetUser'
  | 'DtGetLogs'
  | 'DtClearLogs'
  | 'DtExecuteVpnStart'
  | 'DtExecuteVpnStop'
  | 'DtGetVpnState'
  | 'DtIsVpnRunning'
  | 'DtStartAppUpdate'
  | 'DtStartCheckUser'
  | 'DtShowLoggerDialog'
  | 'DtGetLocalIP'
  | 'DtAirplaneActivate'
  | 'DtAirplaneDeactivate'
  | 'DtAirplaneState'
  | 'DtAppIsCurrentAssistant'
  | 'DtShowMenuDialog'
  | 'DtShowDialogAdsRewarded'
  | 'DtIsAdsEnabled'
  | 'DtGetRemainingConnectionTime'
  | 'DtGetRemainingConnectionTimerText'
  | 'DtGetLastVpnError'
  | 'DtGetNetworkName'
  | 'DtGetPingResult'
  | 'DtPingResult'
  | 'DtTranslateText'
  | 'DtCleanApp'
  | 'DtGoToVoiceInputSettings'
  | 'DtGetAppConfig'
  | 'DtIgnoreBatteryOptimizations'
  | 'DtStartApnActivity'
  | 'DtStartNetworkActivity'
  | 'DtStartWebViewActivity'
  | 'DtStartRadioInfoActivity'
  | 'DtGetDeviceID'
  | 'DtSendNotification'
  | 'DtGetNetworkData'
  | 'DtGetStatusBarHeight'
  | 'DtGetNavigationBarHeight'
  | 'DtOpenExternalUrl'
  | 'DtStartHotSpotService'
  | 'DtStopHotSpotService'
  | 'DtGetStatusHotSpotService'
  | 'DtGetNetworkDownloadBytes'
  | 'DtGetNetworkUploadBytes'
  | 'DtAppVersion'
  | 'DtActionHandler'
  | 'DtCloseApp'
  | 'DtCopyToClipboard'
  | 'DtGetClipboardText'
  | 'DtShowToast'
  | 'DtVibrate'
  | 'DtIsDarkMode'
  | 'DtGetAppColors'
  | 'DtGetDiagnosticReport'
  | 'DtCopyDiagnosticReport'
  | 'DtIsSafeMode'
  | 'DtCustomDns'
  | 'DtShowCustomDnsDialog';

export type VTOnlyBridgeObjectName =
  | 'VtSetConfig'
  | 'VtGetConfigs'
  | 'VtGetCategories'
  | 'VtGetSelectedCategory'
  | 'VtGetSelectedCategoryId'
  | 'VtGetConfigsByCategory'
  | 'VtGetSelectedConfig'
  | 'VtGetSelectedConfigId'
  | 'VtGetConfigCount'
  | 'VtGetDefaultConfig'
  | 'VtExecuteDialogConfig'
  | 'VtGetImportPublicKey'
  | 'VtCopyImportPublicKey'
  | 'VtImportConfig'
  | 'VtHasPendingConfigImport'
  | 'VtGetPendingConfigImportDetails'
  | 'VtUsername'
  | 'VtPassword'
  | 'VtGetLocalConfigVersion'
  | 'VtCDNCount'
  | 'VtEndpointCount'
  | 'VtUuid'
  | 'VtGetUser'
  | 'VtGetLogs'
  | 'VtClearLogs'
  | 'VtExecuteVpnStart'
  | 'VtExecuteVpnStop'
  | 'VtGetVpnState'
  | 'VtIsVpnRunning'
  | 'VtStartAppUpdate'
  | 'VtStartCheckUser'
  | 'VtShowLoggerDialog'
  | 'VtGetLocalIP'
  | 'VtAirplaneActivate'
  | 'VtAirplaneDeactivate'
  | 'VtAirplaneState'
  | 'VtAppIsCurrentAssistant'
  | 'VtShowMenuDialog'
  | 'VtShowDialogAdsRewarded'
  | 'VtIsAdsEnabled'
  | 'VtGetRemainingConnectionTime'
  | 'VtGetRemainingConnectionTimerText'
  | 'VtGetLastVpnError'
  | 'VtGetNetworkName'
  | 'VtGetPingResult'
  | 'VtPingResult'
  | 'VtTranslateText'
  | 'VtCleanApp'
  | 'VtGoToVoiceInputSettings'
  | 'VtGetAppConfig'
  | 'VtIgnoreBatteryOptimizations'
  | 'VtStartApnActivity'
  | 'VtStartNetworkActivity'
  | 'VtStartWebViewActivity'
  | 'VtStartRadioInfoActivity'
  | 'VtGetDeviceID'
  | 'VtSendNotification'
  | 'VtGetNetworkData'
  | 'VtGetStatusBarHeight'
  | 'VtGetNavigationBarHeight'
  | 'VtOpenExternalUrl'
  | 'VtStartHotSpotService'
  | 'VtStopHotSpotService'
  | 'VtGetStatusHotSpotService'
  | 'VtGetNetworkDownloadBytes'
  | 'VtGetNetworkUploadBytes'
  | 'VtAppVersion'
  | 'VtActionHandler'
  | 'VtCloseApp'
  | 'VtCopyToClipboard'
  | 'VtGetClipboardText'
  | 'VtShowToast'
  | 'VtVibrate'
  | 'VtIsDarkMode'
  | 'VtGetAppColors'
  | 'VtGetDiagnosticReport'
  | 'VtCopyDiagnosticReport'
  | 'VtIsSafeMode'
  | 'VtCustomDns'
  | 'VtShowCustomDnsDialog';

export type VTunnelBridgeObjectName = VTOnlyBridgeObjectName | DTunnelBridgeObjectName;

export type VTunnelVPNState =
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'CONNECTING'
  | 'STOPPING'
  | 'NO_NETWORK'
  | 'AUTH'
  | 'AUTH_FAILED';

export type VTunnelAirplaneState = 'ACTIVE' | 'INACTIVE';
export type VTunnelAssistantState = 'ENABLED' | 'DISABLED';
export type VTunnelHotSpotStatus = 'RUNNING' | 'STOPPED';

export type VTunnelAction =
  | 'CDN_UPDATE'
  | 'CONFIG_UPDATE'
  | 'CATEGORY_UPDATE'
  | 'APP_CONFIG_UPDATE'
  | 'APP_TEXT_UPDATE'
  | 'APP_START_VPN'
  | 'APP_RECONNECT_VPN'
  | 'APP_RESTART_VPN'
  | 'APP_STOP_VPN'
  | 'FCM_TOKEN';

export interface VTunnelNotification {
  title: string;
  message: string;
  image: string;
}

export interface VTunnelMessage {
  title: string;
  content: string;
}

export interface VTunnelCheckUserResult {
  username: string;
  count_connections: string;
  limit_connections: string;
  expiration_date: string;
  expiration_days: string;
}

export type VTunnelLogEntry = Record<string, string>;

export interface VTunnelConfigListItem {
  id: number;
  name: string;
  description: string | null;
  mode: string;
  sorter: number;
  icon: string | null;
  requires_username?: boolean;
  requires_password?: boolean;
  requires_uuid?: boolean;
}

export interface VTunnelCategory {
  id: number;
  name: string;
  color: string;
  sorter: number;
  items: VTunnelConfigListItem[];
}

export interface VTunnelCategorySummary {
  id: number;
  name: string;
  color: string;
  sorter: number;
  count: number;
}

export interface VTunnelCategoryDetail {
  id: number;
  name: string;
  color: string;
  sorter: number;
}

export interface VTunnelUserCredentials {
  username: string;
  password: string;
  uuid: string;
}

export interface VTunnelPendingImport {
  payload: string;
}

export interface VTunnelAppColors {
  backgroundColor: string;
  cardColor: string;
  cardStatusColor: string;
  cardConfigColor: string;
  dialogBackgroundColor: string;
  dialogLoggerColor: string;
  borderColor: string;
  inputColor: string;
  textColor: string;
  buttonColor: string;
  iconColor: string;
}

export interface VTunnelDefaultConfig {
  id: number;
  category_id: number;
  name: string;
  description: string;
  mode: string;
  sorter: number;
  icon: string;
  requires_username?: boolean;
  requires_password?: boolean;
  requires_uuid?: boolean;
}

export interface VTunnelNetworkData {
  type_name: string | null;
  extra_info: string | null;
  type: string | null;
  reason: string | null;
  detailed_state: string | null;
}

export interface VTunnelAppConfigValue<T = unknown> {
  value: T;
}

export interface VTunnelCustomDnsConfig {
  enabled: boolean;
  primary: string;
  secondary: string;
  servers: string[];
}

export interface VTunnelDnsPreset {
  name: string;
  primary: string;
  secondary: string;
}

export type VTunnelParsedJson<T> = T | string | null;

export interface VTunnelEventPayloadMap {
  vpnState: VTunnelVPNState | null;
  vpnStartedSuccess: undefined;
  vpnStoppedSuccess: undefined;
  newLog: undefined;
  newDefaultConfig: undefined;
  checkUserStarted: undefined;
  checkUserResult: VTunnelParsedJson<VTunnelCheckUserResult>;
  checkUserError: string | null;
  messageError: VTunnelParsedJson<VTunnelMessage>;
  showSuccessToast: string | null;
  showErrorToast: string | null;
  notification: VTunnelParsedJson<VTunnelNotification>;
  localIp: string | null;
  networkName: string | null;
  pingResult: string | null;
  checkingAppUpdate: boolean | string | null;
  airplaneState: VTunnelAirplaneState | string | null;
  hotSpotState: VTunnelHotSpotStatus | string | null;
  reloadRequest: string | null;
}

export interface VTunnelEventRawPayloadMap {
  vpnState: string | null;
  vpnStartedSuccess: undefined;
  vpnStoppedSuccess: undefined;
  newLog: undefined;
  newDefaultConfig: undefined;
  checkUserStarted: undefined;
  checkUserResult: string | null;
  checkUserError: string | null;
  messageError: string | null;
  showSuccessToast: string | null;
  showErrorToast: string | null;
  notification: string | null;
  localIp: string | null;
  networkName: string | null;
  pingResult: string | null;
  checkingAppUpdate: boolean | string | null;
  airplaneState: string | null;
  hotSpotState: string | null;
  reloadRequest: string | null;
}

export interface VTunnelEventCallbackMap {
  vpnState: 'VtVpnStateEvent';
  vpnStartedSuccess: 'VtVpnStartedSuccessEvent';
  vpnStoppedSuccess: 'VtVpnStoppedSuccessEvent';
  newLog: 'VtNewLogEvent';
  newDefaultConfig: 'VtNewDefaultConfigEvent';
  checkUserStarted: 'VtCheckUserStartedEvent';
  checkUserResult: 'VtCheckUserResultEvent';
  checkUserError: 'VtCheckUserErrorEvent';
  messageError: 'VtMessageErrorEvent';
  showSuccessToast: 'VtSuccessToastEvent';
  showErrorToast: 'VtErrorToastEvent';
  notification: 'VtNotificationEvent';
  localIp: 'VtLocalIpEvent';
  networkName: 'VtNetworkNameEvent';
  pingResult: 'VtPingResultEvent';
  checkingAppUpdate: 'VtCheckingAppUpdateEvent';
  airplaneState: 'VtAirplaneStateEvent';
  hotSpotState: 'VtHotSpotStateEvent';
  reloadRequest: 'VtReloadRequestEvent';
}

export interface DTunnelEventCallbackMap {
  vpnState: 'DtVpnStateEvent';
  vpnStartedSuccess: 'DtVpnStartedSuccessEvent';
  vpnStoppedSuccess: 'DtVpnStoppedSuccessEvent';
  newLog: 'DtNewLogEvent';
  newDefaultConfig: 'DtNewDefaultConfigEvent';
  checkUserStarted: 'DtCheckUserStartedEvent';
  checkUserResult: 'DtCheckUserResultEvent';
  checkUserError: 'DtCheckUserErrorEvent';
  messageError: 'DtMessageErrorEvent';
  showSuccessToast: 'DtSuccessToastEvent';
  showErrorToast: 'DtErrorToastEvent';
  notification: 'DtNotificationEvent';
  localIp: 'DtLocalIpEvent';
  networkName: 'DtNetworkNameEvent';
  pingResult: 'DtPingResultEvent';
  checkingAppUpdate: 'DtCheckingAppUpdateEvent';
  airplaneState: 'DtAirplaneStateEvent';
  hotSpotState: 'DtHotSpotStateEvent';
  reloadRequest: 'DtReloadRequestEvent';
}

export interface VTunnelCallbackToEventMap {
  VtVpnStateEvent: 'vpnState';
  vtVpnStateListener: 'vpnState';
  DtVpnStateEvent: 'vpnState';
  dtVpnStateListener: 'vpnState';
  VtVpnStartedSuccessEvent: 'vpnStartedSuccess';
  vtVpnStartedSuccessListener: 'vpnStartedSuccess';
  DtVpnStartedSuccessEvent: 'vpnStartedSuccess';
  dtVpnStartedSuccessListener: 'vpnStartedSuccess';
  VtVpnStoppedSuccessEvent: 'vpnStoppedSuccess';
  vtVpnStoppedSuccessListener: 'vpnStoppedSuccess';
  DtVpnStoppedSuccessEvent: 'vpnStoppedSuccess';
  dtVpnStoppedSuccessListener: 'vpnStoppedSuccess';
  VtNewLogEvent: 'newLog';
  vtOnNewLogListener: 'newLog';
  DtNewLogEvent: 'newLog';
  dtOnNewLogListener: 'newLog';
  VtNewDefaultConfigEvent: 'newDefaultConfig';
  vtConfigClickListener: 'newDefaultConfig';
  DtNewDefaultConfigEvent: 'newDefaultConfig';
  dtConfigClickListener: 'newDefaultConfig';
  VtCheckUserStartedEvent: 'checkUserStarted';
  vtCheckUserStartedListener: 'checkUserStarted';
  DtCheckUserStartedEvent: 'checkUserStarted';
  dtCheckUserStartedListener: 'checkUserStarted';
  VtCheckUserResultEvent: 'checkUserResult';
  vtCheckUserModelListener: 'checkUserResult';
  DtCheckUserResultEvent: 'checkUserResult';
  dtCheckUserModelListener: 'checkUserResult';
  VtCheckUserErrorEvent: 'checkUserError';
  vtCheckUserErrorListener: 'checkUserError';
  DtCheckUserErrorEvent: 'checkUserError';
  dtCheckUserErrorListener: 'checkUserError';
  VtMessageErrorEvent: 'messageError';
  vtMessageErrorListener: 'messageError';
  DtMessageErrorEvent: 'messageError';
  dtMessageErrorListener: 'messageError';
  VtSuccessToastEvent: 'showSuccessToast';
  vtShowSuccessToastListener: 'showSuccessToast';
  DtSuccessToastEvent: 'showSuccessToast';
  dtShowSuccessToastListener: 'showSuccessToast';
  VtErrorToastEvent: 'showErrorToast';
  vtShowErrorToastListener: 'showErrorToast';
  DtErrorToastEvent: 'showErrorToast';
  dtShowErrorToastListener: 'showErrorToast';
  VtNotificationEvent: 'notification';
  DtNotificationEvent: 'notification';
  VtLocalIpEvent: 'localIp';
  vtLocalIpListener: 'localIp';
  DtLocalIpEvent: 'localIp';
  dtLocalIpListener: 'localIp';
  VtNetworkNameEvent: 'networkName';
  vtNetworkNameListener: 'networkName';
  DtNetworkNameEvent: 'networkName';
  dtNetworkNameListener: 'networkName';
  VtPingResultEvent: 'pingResult';
  vtPingResultListener: 'pingResult';
  DtPingResultEvent: 'pingResult';
  dtPingResultListener: 'pingResult';
  VtCheckingAppUpdateEvent: 'checkingAppUpdate';
  vtCheckingAppUpdateListener: 'checkingAppUpdate';
  DtCheckingAppUpdateEvent: 'checkingAppUpdate';
  dtCheckingAppUpdateListener: 'checkingAppUpdate';
  VtAirplaneStateEvent: 'airplaneState';
  vtAirplaneStateListener: 'airplaneState';
  DtAirplaneStateEvent: 'airplaneState';
  dtAirplaneStateListener: 'airplaneState';
  VtHotSpotStateEvent: 'hotSpotState';
  vtHotSpotStateListener: 'hotSpotState';
  DtHotSpotStateEvent: 'hotSpotState';
  dtHotSpotStateListener: 'hotSpotState';
  VtReloadRequestEvent: 'reloadRequest';
  vtReloadRequestListener: 'reloadRequest';
  DtReloadRequestEvent: 'reloadRequest';
  dtReloadRequestListener: 'reloadRequest';
}

export interface VTunnelSemanticEventEnvelope<E extends VTunnelSemanticEventName = VTunnelSemanticEventName> {
  name: E;
  callbackName: VTunnelEventCallbackMap[E] | VTunnelCallbackName;
  payload: VTunnelEventPayloadMap[E];
  rawPayload: VTunnelEventRawPayloadMap[E];
  args: unknown[];
  timestamp: number;
}

export interface DTunnelSemanticEventEnvelope<E extends DTunnelSemanticEventName = DTunnelSemanticEventName> {
  name: E;
  callbackName: DTunnelEventCallbackMap[E];
  payload: VTunnelEventPayloadMap[E];
  rawPayload: VTunnelEventRawPayloadMap[E];
  args: unknown[];
  timestamp: number;
}

export interface VTunnelNativeEventByCallback<C extends VTunnelCallbackName = VTunnelCallbackName> {
  name: C extends keyof VTunnelCallbackToEventMap ? VTunnelCallbackToEventMap[C] : string | null;
  callbackName: C;
  payload: C extends keyof VTunnelCallbackToEventMap
    ? VTunnelEventPayloadMap[VTunnelCallbackToEventMap[C]]
    : unknown;
  rawPayload: unknown;
  args: unknown[];
  timestamp: number;
}

export type VTunnelAnySemanticEventEnvelope = {
  [K in VTunnelSemanticEventName]: VTunnelSemanticEventEnvelope<K>;
}[VTunnelSemanticEventName];

export type VTunnelAnyNativeEventEnvelope = {
  [K in VTunnelCallbackName]: VTunnelNativeEventByCallback<K>;
}[VTunnelCallbackName];

export interface VTunnelErrorEvent {
  name: 'error';
  error: VTunnelBridgeError;
  timestamp: number;
}

export declare class VTunnelBridgeError extends Error {
  name: 'VTunnelBridgeError';
  code: string;
  details: Record<string, unknown>;
  constructor(code: string, message: string, details?: Record<string, unknown>);
}

export interface VTunnelBridgeHost {
  [key: string]: unknown;
}

export interface VTunnelSDKLogger {
  error(message?: unknown, ...optionalParams: unknown[]): void;
  warn?(message?: unknown, ...optionalParams: unknown[]): void;
  info?(message?: unknown, ...optionalParams: unknown[]): void;
  debug?(message?: unknown, ...optionalParams: unknown[]): void;
}

export interface VTunnelSDKOptions {
  window?: VTunnelBridgeHost;
  strict?: boolean;
  logger?: VTunnelSDKLogger | null;
  autoRegisterNativeEvents?: boolean;
}

export interface VTunnelDebugSnapshot {
  strict: boolean;
  autoRegisterNativeEvents: boolean;
  ready: boolean;
  bridgeAvailability: Record<string, boolean>;
  registeredNativeCallbacks: string[];
  timestamp: number;
}

export declare class VTunnelConfigModule {
  setConfig(id: number): void;
  getConfigs(): VTunnelCategory[] | null;
  getCategories(): VTunnelCategorySummary[] | null;
  getSelectedCategory(): VTunnelCategoryDetail | null;
  getSelectedCategoryId(): number | null;
  getConfigsByCategory(categoryId: number): VTunnelConfigListItem[] | null;
  getSelectedConfig(): VTunnelDefaultConfig | null;
  getSelectedConfigId(): number | null;
  getConfigCount(): number | null;
  getDefaultConfig(): VTunnelDefaultConfig | null;
  openConfigDialog(): void;
  getImportPublicKey(): string | null;
  copyImportPublicKey(): void;
  importConfig(payload: string): void;
  hasPendingConfigImport(): boolean;
  getPendingConfigImportDetails(): VTunnelPendingImport | null;
  getUsername(): string | null;
  setUsername(value: string): void;
  getPassword(): string | null;
  setPassword(value: string): void;
  getLocalConfigVersion(): number | null;
  getCdnCount(): number | null;
  getEndpointCount(): number | null;
  getUuid(): string | null;
  setUuid(value: string): void;
  getUser(): VTunnelUserCredentials | null;
}

export declare class VTunnelMainModule {
  getLogs(): VTunnelLogEntry[] | null;
  clearLogs(): void;
  startVpn(): void;
  stopVpn(): void;
  getVpnState(): VTunnelVPNState | null;
  isVpnRunning(): boolean;
  startAppUpdate(): void;
  startCheckUser(): void;
  showLoggerDialog(): void;
  getLocalIp(): string | null;
  activateAirplaneMode(): void;
  deactivateAirplaneMode(): void;
  getAirplaneState(): VTunnelAirplaneState | null;
  getAssistantState(): VTunnelAssistantState | null;
  isCurrentAssistantEnabled(): boolean;
  showMenuDialog(): void;
  showAdsRewardedDialog(): void;
  isAdsEnabled(): boolean;
  getRemainingConnectionTime(): number | null;
  getRemainingConnectionTimerText(): string | null;
  getLastVpnError(): string | null;
  getNetworkName(): string | null;
  getPingResult(): string | null;
}

export declare class VTunnelTextModule {
  translate(label: string | null): string | null;
}

export declare class VTunnelAppModule {
  cleanApp(): void;
  goToVoiceInputSettings(): void;
  getAppConfig<T = unknown>(name: string): VTunnelAppConfigValue<T> | null;
  ignoreBatteryOptimizations(): void;
  startApnActivity(): void;
  startNetworkActivity(): void;
  startWebViewActivity(url?: string | null): void;
  startRadioInfoActivity(): void;
}

export declare class VTunnelAndroidModule {
  getDeviceId(): string | null;
  sendNotification(
    title: string,
    message: string,
    imageUrl?: string | null,
  ): void;
  getNetworkData(): VTunnelNetworkData | null;
  getStatusBarHeight(): number | null;
  getNavigationBarHeight(): number | null;
  openExternalUrl(url: string): void;
  startHotSpotService(port?: number): void;
  stopHotSpotService(): void;
  getHotSpotStatus(): VTunnelHotSpotStatus | null;
  isHotSpotRunning(): boolean;
  getNetworkDownloadBytes(): number | null;
  getNetworkUploadBytes(): number | null;
  getAppVersion(): string | null;
  handleAction(action: VTunnelAction | (string & {})): void;
  closeApp(): void;
  copyToClipboard(text: string): void;
  getClipboardText(): string | null;
  showToast(message: string): void;
  vibrate(durationMillis?: number): void;
  isDarkMode(): boolean;
  getAppColors(): VTunnelAppColors | null;
  getDiagnosticReport(): string | null;
  copyDiagnosticReport(): void;
  isSafeMode(): boolean;
}

export declare class VTunnelDnsModule {
  get(): VTunnelCustomDnsConfig | null;
  isEnabled(): boolean;
  setEnabled(enabled: boolean): void;
  set(enabled: boolean, primary: string, secondary: string): void;
  set(config: { enabled?: boolean; primary?: string; secondary?: string }): void;
  save(enabled: boolean, primary: string, secondary: string): void;
  getPresets(): VTunnelDnsPreset[] | null;
  showDialog(): void;
}

export declare class VTunnelSDK {
  static VERSION: string;
  static BRIDGE_OBJECTS: readonly VTunnelBridgeObjectName[];
  static VT_BRIDGE_OBJECTS: readonly VTunnelBridgeObjectName[];
  static DT_BRIDGE_OBJECTS: readonly VTunnelBridgeObjectName[];
  static EVENT_DEFINITIONS: Record<
    VTunnelSemanticEventName,
    {
      callbacks: readonly VTunnelCallbackName[];
      parseAsJson: boolean;
    }
  >;
  static VTunnelBridgeError: typeof VTunnelBridgeError;
  static DTunnelBridgeError: typeof VTunnelBridgeError;

  readonly version: string;
  readonly window: VTunnelBridgeHost;
  readonly strict: boolean;
  readonly autoRegisterNativeEvents: boolean;

  readonly config: VTunnelConfigModule;
  readonly main: VTunnelMainModule;
  readonly text: VTunnelTextModule;
  readonly app: VTunnelAppModule;
  readonly android: VTunnelAndroidModule;
  readonly dns: VTunnelDnsModule;

  constructor(options?: VTunnelSDKOptions);

  on<E extends VTunnelSemanticEventName>(
    eventName: E,
    listener: (event: VTunnelSemanticEventEnvelope<E>) => void,
  ): () => void;
  on(
    eventName: 'nativeEvent',
    listener: (event: VTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  on<E extends VTunnelCallbackName>(
    eventName: `native:${E}`,
    listener: (event: VTunnelNativeEventByCallback<E>) => void,
  ): () => void;
  on(
    eventName: `native:${string}`,
    listener: (event: VTunnelAnyNativeEventEnvelope) => void,
  ): () => void;
  on(
    eventName: 'error',
    listener: (event: VTunnelErrorEvent) => void,
  ): () => void;

  once<E extends VTunnelSemanticEventName>(
    eventName: E,
    listener: (event: VTunnelSemanticEventEnvelope<E>) => void,
  ): () => void;
  once(
    eventName: 'nativeEvent',
    listener: (event: VTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  once<E extends VTunnelCallbackName>(
    eventName: `native:${E}`,
    listener: (event: VTunnelNativeEventByCallback<E>) => void,
  ): () => void;
  once(
    eventName: `native:${string}`,
    listener: (event: VTunnelAnyNativeEventEnvelope) => void,
  ): () => void;
  once(
    eventName: 'error',
    listener: (event: VTunnelErrorEvent) => void,
  ): () => void;

  off(eventName: string, listener: (...args: unknown[]) => void): void;
  removeAllListeners(eventName?: string): void;

  onNativeEvent(
    listener: (event: VTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  onError(listener: (event: VTunnelErrorEvent) => void): () => void;

  getBridgeObject<T = unknown>(objectName: VTunnelBridgeObjectName | string): T;
  hasBridgeObject(objectName: VTunnelBridgeObjectName | string): boolean;
  getBridgeAvailability(): Record<VTunnelBridgeObjectName, boolean>;
  isReady(requiredObjects?: Array<VTunnelBridgeObjectName | string>): boolean;

  call<T = unknown>(
    objectName: VTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): T;
  callJson<T = unknown>(
    objectName: VTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): T | null;
  callVoid(
    objectName: VTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): void;

  registerNativeEventHandlers(): this;
  unregisterNativeEventHandlers(): this;

  createDebugSnapshot(): VTunnelDebugSnapshot;
  destroy(): void;
}

// Backward-compatibility Aliases
export type DTunnelSemanticEventName = VTunnelSemanticEventName;
export type DTunnelCallbackName = VTunnelCallbackName;
export type DTunnelVPNState = VTunnelVPNState;
export type DTunnelAirplaneState = VTunnelAirplaneState;
export type DTunnelAssistantState = VTunnelAssistantState;
export type DTunnelHotSpotStatus = VTunnelHotSpotStatus;
export type DTunnelAction = VTunnelAction;
export type DTunnelNotification = VTunnelNotification;
export type DTunnelMessage = VTunnelMessage;
export type DTunnelCheckUserResult = VTunnelCheckUserResult;
export type DTunnelLogEntry = VTunnelLogEntry;
export type DTunnelConfigListItem = VTunnelConfigListItem;
export type DTunnelCategory = VTunnelCategory;
export type DTunnelCategorySummary = VTunnelCategorySummary;
export type DTunnelCategoryDetail = VTunnelCategoryDetail;
export type DTunnelUserCredentials = VTunnelUserCredentials;
export type DTunnelPendingImport = VTunnelPendingImport;
export type DTunnelAppColors = VTunnelAppColors;
export type DTunnelDefaultConfig = VTunnelDefaultConfig;
export type DTunnelNetworkData = VTunnelNetworkData;
export type DTunnelAppConfigValue<T = unknown> = VTunnelAppConfigValue<T>;
export type DTunnelParsedJson<T> = VTunnelParsedJson<T>;
export type DTunnelEventPayloadMap = VTunnelEventPayloadMap;
export type DTunnelEventRawPayloadMap = VTunnelEventRawPayloadMap;
export type DTunnelCallbackToEventMap = VTunnelCallbackToEventMap;
export type DTunnelNativeEventByCallback<C extends DTunnelCallbackName = DTunnelCallbackName> = VTunnelNativeEventByCallback<C>;
export type DTunnelAnySemanticEventEnvelope = VTunnelAnySemanticEventEnvelope;
export type DTunnelAnyNativeEventEnvelope = VTunnelAnyNativeEventEnvelope;
export type DTunnelErrorEvent = VTunnelErrorEvent;
export type DTunnelBridgeError = VTunnelBridgeError;
export declare const DTunnelBridgeError: typeof VTunnelBridgeError;
export type DTunnelBridgeHost = VTunnelBridgeHost;
export type DTunnelSDKLogger = VTunnelSDKLogger;
export type DTunnelSDKOptions = VTunnelSDKOptions;
export type DTunnelDebugSnapshot = VTunnelDebugSnapshot;
export type DTunnelConfigModule = VTunnelConfigModule;
export declare const DTunnelConfigModule: typeof VTunnelConfigModule;
export type DTunnelMainModule = VTunnelMainModule;
export declare const DTunnelMainModule: typeof VTunnelMainModule;
export type DTunnelTextModule = VTunnelTextModule;
export declare const DTunnelTextModule: typeof VTunnelTextModule;
export type DTunnelAppModule = VTunnelAppModule;
export declare const DTunnelAppModule: typeof VTunnelAppModule;
export type DTunnelAndroidModule = VTunnelAndroidModule;
export declare const DTunnelAndroidModule: typeof VTunnelAndroidModule;
export type DTunnelCustomDnsConfig = VTunnelCustomDnsConfig;
export type DTunnelDnsPreset = VTunnelDnsPreset;
export type DTunnelDnsModule = VTunnelDnsModule;
export declare const DTunnelDnsModule: typeof VTunnelDnsModule;

export declare class DTunnelSDK {
  static VERSION: string;
  static BRIDGE_OBJECTS: readonly DTunnelBridgeObjectName[];
  static EVENT_DEFINITIONS: Record<
    DTunnelSemanticEventName,
    {
      callbacks: readonly DTunnelCallbackName[];
      parseAsJson: boolean;
    }
  >;
  static DTunnelBridgeError: typeof DTunnelBridgeError;

  readonly version: string;
  readonly window: DTunnelBridgeHost;
  readonly strict: boolean;
  readonly autoRegisterNativeEvents: boolean;

  readonly config: DTunnelConfigModule;
  readonly main: DTunnelMainModule;
  readonly text: DTunnelTextModule;
  readonly app: DTunnelAppModule;
  readonly android: DTunnelAndroidModule;
  readonly dns: DTunnelDnsModule;

  constructor(options?: DTunnelSDKOptions);

  on<E extends DTunnelSemanticEventName>(
    eventName: E,
    listener: (event: DTunnelSemanticEventEnvelope<E>) => void,
  ): () => void;
  on(
    eventName: 'nativeEvent',
    listener: (event: DTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  on<E extends DTunnelCallbackName>(
    eventName: `native:${E}`,
    listener: (event: DTunnelNativeEventByCallback<E>) => void,
  ): () => void;
  on(
    eventName: `native:${string}`,
    listener: (event: DTunnelAnyNativeEventEnvelope) => void,
  ): () => void;
  on(
    eventName: 'error',
    listener: (event: DTunnelErrorEvent) => void,
  ): () => void;

  once<E extends DTunnelSemanticEventName>(
    eventName: E,
    listener: (event: DTunnelSemanticEventEnvelope<E>) => void,
  ): () => void;
  once(
    eventName: 'nativeEvent',
    listener: (event: DTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  once<E extends DTunnelCallbackName>(
    eventName: `native:${E}`,
    listener: (event: DTunnelNativeEventByCallback<E>) => void,
  ): () => void;
  once(
    eventName: `native:${string}`,
    listener: (event: DTunnelAnyNativeEventEnvelope) => void,
  ): () => void;
  once(
    eventName: 'error',
    listener: (event: DTunnelErrorEvent) => void,
  ): () => void;

  off(eventName: string, listener: (...args: unknown[]) => void): void;
  removeAllListeners(eventName?: string): void;

  onNativeEvent(
    listener: (event: DTunnelAnySemanticEventEnvelope) => void,
  ): () => void;
  onError(listener: (event: DTunnelErrorEvent) => void): () => void;

  getBridgeObject<T = unknown>(objectName: DTunnelBridgeObjectName | string): T;
  hasBridgeObject(objectName: DTunnelBridgeObjectName | string): boolean;
  getBridgeAvailability(): Record<DTunnelBridgeObjectName, boolean>;
  isReady(requiredObjects?: Array<DTunnelBridgeObjectName | string>): boolean;

  call<T = unknown>(
    objectName: DTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): T;
  callJson<T = unknown>(
    objectName: DTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): T | null;
  callVoid(
    objectName: DTunnelBridgeObjectName | string,
    methodName: string,
    args?: unknown[],
  ): void;

  registerNativeEventHandlers(): this;
  unregisterNativeEventHandlers(): this;

  createDebugSnapshot(): DTunnelDebugSnapshot;
  destroy(): void;
}

export default VTunnelSDK;

