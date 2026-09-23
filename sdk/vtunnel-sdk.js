/* eslint-disable no-console */
(function initVTunnelSDK(globalScope) {
  'use strict';

  const VT_BRIDGE_OBJECTS = Object.freeze([
    'VtSetConfig',
    'VtGetConfigs',
    'VtGetCategories',
    'VtGetSelectedCategory',
    'VtGetSelectedCategoryId',
    'VtGetConfigsByCategory',
    'VtGetSelectedConfig',
    'VtGetSelectedConfigId',
    'VtGetConfigCount',
    'VtGetDefaultConfig',
    'VtExecuteDialogConfig',
    'VtGetImportPublicKey',
    'VtCopyImportPublicKey',
    'VtImportConfig',
    'VtHasPendingConfigImport',
    'VtGetPendingConfigImportDetails',
    'VtUsername',
    'VtPassword',
    'VtGetLocalConfigVersion',
    'VtCDNCount',
    'VtEndpointCount',
    'VtUuid',
    'VtGetUser',
    'VtGetLogs',
    'VtClearLogs',
    'VtExecuteVpnStart',
    'VtExecuteVpnStop',
    'VtGetVpnState',
    'VtIsVpnRunning',
    'VtStartAppUpdate',
    'VtStartCheckUser',
    'VtShowLoggerDialog',
    'VtGetLocalIP',
    'VtGetLocalIPv6',
    'VtGetLocalIPs',
    'VtAirplaneActivate',
    'VtAirplaneDeactivate',
    'VtAirplaneState',
    'VtAppIsCurrentAssistant',
    'VtShowMenuDialog',
    'VtShowDialogAdsRewarded',
    'VtIsAdsEnabled',
    'VtGetRemainingConnectionTime',
    'VtGetRemainingConnectionTimerText',
    'VtGetLastVpnError',
    'VtGetNetworkName',
    'VtGetPingResult',
    'VtTranslateText',
    'VtCleanApp',
    'VtGoToVoiceInputSettings',
    'VtGetAppConfig',
    'VtIgnoreBatteryOptimizations',
    'VtStartApnActivity',
    'VtStartNetworkActivity',
    'VtStartWebViewActivity',
    'VtStartRadioInfoActivity',
    'VtGetDeviceID',
    'VtSendNotification',
    'VtGetNetworkData',
    'VtGetStatusBarHeight',
    'VtGetNavigationBarHeight',
    'VtOpenExternalUrl',
    'VtStartHotSpotService',
    'VtStopHotSpotService',
    'VtGetStatusHotSpotService',
    'VtGetNetworkDownloadBytes',
    'VtGetNetworkUploadBytes',
    'VtAppVersion',
    'VtActionHandler',
    'VtCloseApp',
    'VtCopyToClipboard',
    'VtGetClipboardText',
    'VtShowToast',
    'VtVibrate',
    'VtIsDarkMode',
    'VtGetAppColors',
    'VtGetDiagnosticReport',
    'VtCopyDiagnosticReport',
    'VtIsSafeMode',
    'VtCustomDns',
    'VtShowCustomDnsDialog',
  ]);

  const DT_BRIDGE_OBJECTS = Object.freeze(
    VT_BRIDGE_OBJECTS.map((name) => (name.startsWith('Vt') ? 'Dt' + name.slice(2) : name)),
  );

  const BRIDGE_OBJECTS = Object.freeze(Array.from(new Set([...VT_BRIDGE_OBJECTS, ...DT_BRIDGE_OBJECTS])));

  const EVENT_DEFINITIONS = freezeEventDefinitions({
    vpnState: {
      callbacks: ['VtVpnStateEvent', 'vtVpnStateListener', 'DtVpnStateEvent', 'dtVpnStateListener'],
      parseAsJson: false,
    },
    vpnStartedSuccess: {
      callbacks: ['VtVpnStartedSuccessEvent', 'vtVpnStartedSuccessListener', 'DtVpnStartedSuccessEvent', 'dtVpnStartedSuccessListener'],
      parseAsJson: false,
    },
    vpnStoppedSuccess: {
      callbacks: ['VtVpnStoppedSuccessEvent', 'vtVpnStoppedSuccessListener', 'DtVpnStoppedSuccessEvent', 'dtVpnStoppedSuccessListener'],
      parseAsJson: false,
    },
    newLog: {
      callbacks: ['VtNewLogEvent', 'vtOnNewLogListener', 'DtNewLogEvent', 'dtOnNewLogListener'],
      parseAsJson: false,
    },
    newDefaultConfig: {
      callbacks: ['VtNewDefaultConfigEvent', 'vtConfigClickListener', 'DtNewDefaultConfigEvent', 'dtConfigClickListener'],
      parseAsJson: false,
    },
    checkUserStarted: {
      callbacks: ['VtCheckUserStartedEvent', 'vtCheckUserStartedListener', 'DtCheckUserStartedEvent', 'dtCheckUserStartedListener'],
      parseAsJson: false,
    },
    checkUserResult: {
      callbacks: ['VtCheckUserResultEvent', 'vtCheckUserModelListener', 'DtCheckUserResultEvent', 'dtCheckUserModelListener'],
      parseAsJson: true,
    },
    checkUserError: {
      callbacks: ['VtCheckUserErrorEvent', 'vtCheckUserErrorListener', 'DtCheckUserErrorEvent', 'dtCheckUserErrorListener'],
      parseAsJson: false,
    },
    messageError: {
      callbacks: ['VtMessageErrorEvent', 'vtMessageErrorListener', 'DtMessageErrorEvent', 'dtMessageErrorListener'],
      parseAsJson: true,
    },
    showSuccessToast: {
      callbacks: ['VtSuccessToastEvent', 'vtShowSuccessToastListener', 'DtSuccessToastEvent', 'dtShowSuccessToastListener'],
      parseAsJson: false,
    },
    showErrorToast: {
      callbacks: ['VtErrorToastEvent', 'vtShowErrorToastListener', 'DtErrorToastEvent', 'dtShowErrorToastListener'],
      parseAsJson: false,
    },
    notification: {
      callbacks: ['VtNotificationEvent', 'DtNotificationEvent'],
      parseAsJson: true,
    },
    localIp: {
      callbacks: ['VtLocalIpEvent', 'vtLocalIpListener', 'DtLocalIpEvent', 'dtLocalIpListener'],
      parseAsJson: false,
    },
    localIpv6: {
      callbacks: ['VtLocalIpv6Event', 'vtLocalIpv6Listener', 'DtLocalIpv6Event', 'dtLocalIpv6Listener'],
      parseAsJson: false,
    },
    networkName: {
      callbacks: ['VtNetworkNameEvent', 'vtNetworkNameListener', 'DtNetworkNameEvent', 'dtNetworkNameListener'],
      parseAsJson: false,
    },
    pingResult: {
      callbacks: ['VtPingResultEvent', 'vtPingResultListener', 'DtPingResultEvent', 'dtPingResultListener'],
      parseAsJson: false,
    },
    checkingAppUpdate: {
      callbacks: ['VtCheckingAppUpdateEvent', 'vtCheckingAppUpdateListener', 'DtCheckingAppUpdateEvent', 'dtCheckingAppUpdateListener'],
      parseAsJson: false,
    },
    airplaneState: {
      callbacks: ['VtAirplaneStateEvent', 'vtAirplaneStateListener', 'DtAirplaneStateEvent', 'dtAirplaneStateListener'],
      parseAsJson: false,
    },
    hotSpotState: {
      callbacks: ['VtHotSpotStateEvent', 'vtHotSpotStateListener', 'DtHotSpotStateEvent', 'dtHotSpotStateListener'],
      parseAsJson: false,
    },
    reloadRequest: {
      callbacks: ['VtReloadRequestEvent', 'vtReloadRequestListener', 'DtReloadRequestEvent', 'dtReloadRequestListener'],
      parseAsJson: false,
    },
  });

  const CALLBACK_TO_EVENT = Object.freeze(
    buildCallbackIndex(EVENT_DEFINITIONS),
  );

  function freezeEventDefinitions(definitions) {
    const clone = { ...definitions };
    Object.keys(clone).forEach((eventName) => {
      const eventConfig = clone[eventName];
      clone[eventName] = Object.freeze({
        callbacks: Object.freeze([...eventConfig.callbacks]),
        parseAsJson: Boolean(eventConfig.parseAsJson),
      });
    });
    return Object.freeze(clone);
  }

  function buildCallbackIndex(definitions) {
    const index = {};
    Object.keys(definitions).forEach((eventName) => {
      const callbacks = definitions[eventName].callbacks;
      callbacks.forEach((callbackName) => {
        index[callbackName] = eventName;
      });
    });
    return index;
  }

  function isFunction(value) {
    return typeof value === 'function';
  }

  function safeParseJson(value) {
    if (value === null || value === undefined) return null;
    if (typeof value !== 'string') return value;
    try {
      return JSON.parse(value);
    } catch (_error) {
      return value;
    }
  }

  class VTunnelBridgeError extends Error {
    constructor(code, message, details) {
      super(message);
      this.name = 'VTunnelBridgeError';
      this.code = code;
      this.details = details || {};
    }
  }

  const DTunnelBridgeError = VTunnelBridgeError;

  class EventBus {
    constructor() {
      this.listenersByEvent = new Map();
    }

    on(eventName, listener) {
      if (!isFunction(listener)) {
        throw new TypeError('Listener precisa ser uma funcao.');
      }

      let listeners = this.listenersByEvent.get(eventName);
      if (!listeners) {
        listeners = new Set();
        this.listenersByEvent.set(eventName, listeners);
      }

      listeners.add(listener);
      return () => this.off(eventName, listener);
    }

    once(eventName, listener) {
      const unsubscribe = this.on(eventName, (payload) => {
        unsubscribe();
        listener(payload);
      });
      return unsubscribe;
    }

    off(eventName, listener) {
      const listeners = this.listenersByEvent.get(eventName);
      if (!listeners) return;

      listeners.delete(listener);
      if (listeners.size === 0) {
        this.listenersByEvent.delete(eventName);
      }
    }

    emit(eventName, payload) {
      const listeners = this.listenersByEvent.get(eventName);
      if (!listeners || listeners.size === 0) return;

      Array.from(listeners).forEach((listener) => {
        try {
          listener(payload);
        } catch (error) {
          console.error('[VTunnelSDK] listener error:', eventName, error);
        }
      });
    }

    clear(eventName) {
      if (eventName) {
        this.listenersByEvent.delete(eventName);
        return;
      }
      this.listenersByEvent.clear();
    }
  }

  class BridgeGateway {
    constructor(options) {
      this.windowRef = options.windowRef;
      this.strict = Boolean(options.strict);
      this.logger = options.logger || console;
      this.eventBus = options.eventBus;
    }

    getAlternateObjectName(objectName) {
      if (typeof objectName !== 'string') return null;
      if (objectName.startsWith('Vt')) {
        return 'Dt' + objectName.slice(2);
      }
      if (objectName.startsWith('Dt')) {
        return 'Vt' + objectName.slice(2);
      }
      return null;
    }

    getObject(objectName) {
      if (!this.windowRef) return undefined;
      if (this.windowRef[objectName]) return this.windowRef[objectName];
      const alt = this.getAlternateObjectName(objectName);
      if (alt && this.windowRef[alt]) return this.windowRef[alt];
      return undefined;
    }

    hasObject(objectName) {
      return Boolean(this.getObject(objectName));
    }

    call(options) {
      const objectName = options.objectName;
      const methodName = options.methodName;
      const args = Array.isArray(options.args) ? options.args : [];
      const parseJson = Boolean(options.parseJson);
      const expectVoid = Boolean(options.expectVoid);

      const target = this.getObject(objectName);
      if (!target) {
        return this.handleFailure(
          new VTunnelBridgeError(
            'BRIDGE_OBJECT_NOT_FOUND',
            `Objeto de bridge nao encontrado: ${objectName}`,
            { objectName, methodName },
          ),
        );
      }

      const method = target[methodName];
      if (!isFunction(method)) {
        return this.handleFailure(
          new VTunnelBridgeError(
            'BRIDGE_METHOD_NOT_FOUND',
            `Metodo de bridge nao encontrado: ${objectName}.${methodName}()`,
            { objectName, methodName },
          ),
        );
      }

      let result;
      try {
        result = method.apply(target, args);
      } catch (cause) {
        return this.handleFailure(
          new VTunnelBridgeError(
            'BRIDGE_CALL_FAILED',
            `Falha na chamada de bridge: ${objectName}.${methodName}()`,
            { objectName, methodName, args, cause },
          ),
        );
      }

      if (expectVoid) return undefined;
      return parseJson ? safeParseJson(result) : result;
    }

    handleFailure(error) {
      if (this.strict) {
        throw error;
      }

      if (this.logger && isFunction(this.logger.error)) {
        this.logger.error('[VTunnelSDK]', error.message, error.details || {});
      }

      this.eventBus.emit('error', {
        name: 'error',
        error,
        timestamp: Date.now(),
      });
      return null;
    }
  }

  class NativeEventsAdapter {
    constructor(options) {
      this.windowRef = options.windowRef;
      this.eventBus = options.eventBus;
      this.wrappersByCallback = new Map();
    }

    register() {
      Object.keys(CALLBACK_TO_EVENT).forEach((callbackName) => {
        if (this.wrappersByCallback.has(callbackName)) return;

        const wrapper = (...args) => {
          this.dispatch(callbackName, args);
        };

        this.windowRef[callbackName] = wrapper;
        this.wrappersByCallback.set(callbackName, wrapper);
      });
    }

    unregister() {
      this.wrappersByCallback.forEach((wrapper, callbackName) => {
        if (this.windowRef[callbackName] === wrapper) {
          try {
            delete this.windowRef[callbackName];
          } catch (_error) {
            this.windowRef[callbackName] = undefined;
          }
        }
      });

      this.wrappersByCallback.clear();
    }

    getRegisteredCallbacks() {
      return Array.from(this.wrappersByCallback.keys());
    }

    dispatch(callbackName, args) {
      const semanticName = CALLBACK_TO_EVENT[callbackName] || null;
      const rawPayload = args.length <= 1 ? args[0] : args;

      let payload = rawPayload;
      if (semanticName) {
        const definition = EVENT_DEFINITIONS[semanticName];
        payload =
          definition && definition.parseAsJson
            ? safeParseJson(rawPayload)
            : rawPayload;
      }

      const envelope = {
        name: semanticName,
        callbackName,
        payload,
        rawPayload,
        args,
        timestamp: Date.now(),
      };

      if (semanticName) {
        this.eventBus.emit(semanticName, envelope);
      }
      this.eventBus.emit(`native:${callbackName}`, envelope);
      this.eventBus.emit('nativeEvent', envelope);
    }
  }

  class ModuleBase {
    constructor(gateway) {
      this.gateway = gateway;
    }

    call(objectName, methodName, args) {
      return this.gateway.call({ objectName, methodName, args });
    }

    callJson(objectName, methodName, args) {
      return this.gateway.call({
        objectName,
        methodName,
        args,
        parseJson: true,
      });
    }

    callVoid(objectName, methodName, args) {
      this.gateway.call({ objectName, methodName, args, expectVoid: true });
    }
  }

  class ConfigModule extends ModuleBase {
    setConfig(id) {
      this.callVoid('VtSetConfig', 'execute', [id]);
    }
    getConfigs() {
      return this.callJson('VtGetConfigs', 'execute');
    }
    getCategories() {
      return this.callJson('VtGetCategories', 'execute');
    }
    getSelectedCategory() {
      return this.callJson('VtGetSelectedCategory', 'execute');
    }
    getSelectedCategoryId() {
      return this.call('VtGetSelectedCategoryId', 'execute');
    }
    getConfigsByCategory(categoryId) {
      return this.callJson('VtGetConfigsByCategory', 'execute', [categoryId]);
    }
    getSelectedConfig() {
      return this.callJson('VtGetSelectedConfig', 'execute');
    }
    getSelectedConfigId() {
      return this.call('VtGetSelectedConfigId', 'execute');
    }
    getConfigCount() {
      return this.call('VtGetConfigCount', 'execute');
    }
    getDefaultConfig() {
      return this.callJson('VtGetDefaultConfig', 'execute');
    }
    openConfigDialog() {
      this.callVoid('VtExecuteDialogConfig', 'execute');
    }
    getImportPublicKey() {
      return this.call('VtGetImportPublicKey', 'execute');
    }
    copyImportPublicKey() {
      this.callVoid('VtCopyImportPublicKey', 'execute');
    }
    importConfig(payload) {
      this.callVoid('VtImportConfig', 'execute', [payload]);
    }
    hasPendingConfigImport() {
      return Boolean(this.call('VtHasPendingConfigImport', 'execute'));
    }
    getPendingConfigImportDetails() {
      return this.callJson('VtGetPendingConfigImportDetails', 'execute');
    }
    getUsername() {
      return this.call('VtUsername', 'get');
    }
    setUsername(value) {
      this.callVoid('VtUsername', 'set', [value]);
    }
    getPassword() {
      return this.call('VtPassword', 'get');
    }
    setPassword(value) {
      this.callVoid('VtPassword', 'set', [value]);
    }
    getLocalConfigVersion() {
      return this.call('VtGetLocalConfigVersion', 'execute');
    }
    getCdnCount() {
      if (this.gateway.hasObject('VtEndpointCount')) {
        return this.call('VtEndpointCount', 'execute');
      }
      return this.call('VtCDNCount', 'execute');
    }
    getEndpointCount() {
      return this.getCdnCount();
    }
    getUuid() {
      return this.call('VtUuid', 'get');
    }
    setUuid(value) {
      this.callVoid('VtUuid', 'set', [value]);
    }
    getUser() {
      return this.callJson('VtGetUser', 'execute');
    }
  }

  class MainModule extends ModuleBase {
    getLogs() {
      return this.callJson('VtGetLogs', 'execute');
    }
    clearLogs() {
      this.callVoid('VtClearLogs', 'execute');
    }
    startVpn() {
      this.callVoid('VtExecuteVpnStart', 'execute');
    }
    stopVpn() {
      this.callVoid('VtExecuteVpnStop', 'execute');
    }
    getVpnState() {
      return this.call('VtGetVpnState', 'execute');
    }
    isVpnRunning() {
      return Boolean(this.call('VtIsVpnRunning', 'execute'));
    }
    startAppUpdate() {
      this.callVoid('VtStartAppUpdate', 'execute');
    }
    startCheckUser() {
      this.callVoid('VtStartCheckUser', 'execute');
    }
    showLoggerDialog() {
      this.callVoid('VtShowLoggerDialog', 'execute');
    }
    getLocalIp() {
      return this.call('VtGetLocalIP', 'execute');
    }
    getLocalIpv6() {
      return this.call('VtGetLocalIPv6', 'execute');
    }
    getLocalIps() {
      return this.call('VtGetLocalIPs', 'execute');
    }
    activateAirplaneMode() {
      this.callVoid('VtAirplaneActivate', 'execute');
    }
    deactivateAirplaneMode() {
      this.callVoid('VtAirplaneDeactivate', 'execute');
    }
    getAirplaneState() {
      return this.call('VtAirplaneState', 'execute');
    }
    getAssistantState() {
      return this.call('VtAppIsCurrentAssistant', 'execute');
    }
    isCurrentAssistantEnabled() {
      return this.getAssistantState() === 'ENABLED';
    }
    showMenuDialog() {
      this.callVoid('VtShowMenuDialog', 'execute');
    }
    showAdsRewardedDialog() {
      this.callVoid('VtShowDialogAdsRewarded', 'execute');
    }
    isAdsEnabled() {
      return Boolean(this.call('VtIsAdsEnabled', 'execute'));
    }
    getRemainingConnectionTime() {
      return this.call('VtGetRemainingConnectionTime', 'execute');
    }
    getRemainingConnectionTimerText() {
      return this.call('VtGetRemainingConnectionTimerText', 'execute');
    }
    getLastVpnError() {
      return this.call('VtGetLastVpnError', 'execute');
    }
    getNetworkName() {
      return this.call('VtGetNetworkName', 'execute');
    }
    getPingResult() {
      return this.call('VtGetPingResult', 'execute');
    }
  }

  class TextModule extends ModuleBase {
    translate(label) {
      return this.call('VtTranslateText', 'execute', [label]);
    }
  }

  class AppModule extends ModuleBase {
    cleanApp() {
      this.callVoid('VtCleanApp', 'execute');
    }
    goToVoiceInputSettings() {
      this.callVoid('VtGoToVoiceInputSettings', 'execute');
    }
    getAppConfig(name) {
      return this.callJson('VtGetAppConfig', 'execute', [name]);
    }
    ignoreBatteryOptimizations() {
      this.callVoid('VtIgnoreBatteryOptimizations', 'execute');
    }
    startApnActivity() {
      this.callVoid('VtStartApnActivity', 'execute');
    }
    startNetworkActivity() {
      this.callVoid('VtStartNetworkActivity', 'execute');
    }
    startWebViewActivity(url) {
      if (arguments.length === 0) {
        this.callVoid('VtStartWebViewActivity', 'execute');
        return;
      }
      this.callVoid('VtStartWebViewActivity', 'execute', [url]);
    }
    startRadioInfoActivity() {
      this.callVoid('VtStartRadioInfoActivity', 'execute');
    }
  }

  class AndroidModule extends ModuleBase {
    getDeviceId() {
      return this.call('VtGetDeviceID', 'execute');
    }
    sendNotification(title, message, imageUrl) {
      this.callVoid('VtSendNotification', 'execute', [
        title,
        message,
        imageUrl || null,
      ]);
    }
    getNetworkData() {
      return this.callJson('VtGetNetworkData', 'execute');
    }
    getStatusBarHeight() {
      return this.call('VtGetStatusBarHeight', 'execute');
    }
    getNavigationBarHeight() {
      return this.call('VtGetNavigationBarHeight', 'execute');
    }
    openExternalUrl(url) {
      this.callVoid('VtOpenExternalUrl', 'execute', [url]);
    }
    startHotSpotService(port) {
      if (arguments.length === 0) {
        this.callVoid('VtStartHotSpotService', 'execute');
        return;
      }
      this.callVoid('VtStartHotSpotService', 'execute', [port]);
    }
    stopHotSpotService() {
      this.callVoid('VtStopHotSpotService', 'execute');
    }
    getHotSpotStatus() {
      return this.call('VtGetStatusHotSpotService', 'execute');
    }
    isHotSpotRunning() {
      return this.getHotSpotStatus() === 'RUNNING';
    }
    getNetworkDownloadBytes() {
      return this.call('VtGetNetworkDownloadBytes', 'execute');
    }
    getNetworkUploadBytes() {
      return this.call('VtGetNetworkUploadBytes', 'execute');
    }
    getAppVersion() {
      return this.call('VtAppVersion', 'execute');
    }
    handleAction(action) {
      this.callVoid('VtActionHandler', 'execute', [action]);
    }
    closeApp() {
      this.callVoid('VtCloseApp', 'execute');
    }
    copyToClipboard(text) {
      this.callVoid('VtCopyToClipboard', 'execute', [text]);
    }
    getClipboardText() {
      return this.call('VtGetClipboardText', 'execute');
    }
    showToast(message) {
      this.callVoid('VtShowToast', 'execute', [message]);
    }
    vibrate(durationMillis) {
      this.callVoid('VtVibrate', 'execute', [durationMillis || 50]);
    }
    isDarkMode() {
      return Boolean(this.call('VtIsDarkMode', 'execute'));
    }
    getAppColors() {
      return this.callJson('VtGetAppColors', 'execute');
    }
    getDiagnosticReport() {
      return this.call('VtGetDiagnosticReport', 'execute');
    }
    copyDiagnosticReport() {
      this.callVoid('VtCopyDiagnosticReport', 'execute');
    }
    isSafeMode() {
      return Boolean(this.call('VtIsSafeMode', 'execute'));
    }
  }

  class DnsModule extends ModuleBase {
    get() {
      return this.callJson('VtCustomDns', 'get');
    }
    isEnabled() {
      return Boolean(this.call('VtCustomDns', 'isEnabled'));
    }
    setEnabled(enabled) {
      this.callVoid('VtCustomDns', 'setEnabled', [Boolean(enabled)]);
    }
    set(enabledOrConfig, primary, secondary) {
      if (typeof enabledOrConfig === 'object' && enabledOrConfig !== null) {
        this.callVoid('VtCustomDns', 'set', [JSON.stringify(enabledOrConfig)]);
        return;
      }
      this.callVoid('VtCustomDns', 'set', [
        Boolean(enabledOrConfig),
        String(primary || ''),
        String(secondary || ''),
      ]);
    }
    save(enabled, primary, secondary) {
      this.callVoid('VtCustomDns', 'save', [
        Boolean(enabled),
        String(primary || ''),
        String(secondary || ''),
      ]);
    }
    getPresets() {
      return this.callJson('VtCustomDns', 'getPresets');
    }
    showDialog() {
      this.callVoid('VtShowCustomDnsDialog', 'execute');
    }
  }

  class VTunnelSDK {
    constructor(options) {
      const config = options || {};

      this.window = config.window || globalScope;
      this.strict = Boolean(config.strict);
      this.logger = config.logger || console;
      this.autoRegisterNativeEvents = config.autoRegisterNativeEvents !== false;
      this.version = VTunnelSDK.VERSION;

      this.eventBus = new EventBus();
      this.gateway = new BridgeGateway({
        windowRef: this.window,
        strict: this.strict,
        logger: this.logger,
        eventBus: this.eventBus,
      });

      this.nativeEvents = new NativeEventsAdapter({
        windowRef: this.window,
        eventBus: this.eventBus,
      });

      this.config = new ConfigModule(this.gateway);
      this.main = new MainModule(this.gateway);
      this.text = new TextModule(this.gateway);
      this.app = new AppModule(this.gateway);
      this.android = new AndroidModule(this.gateway);
      this.dns = new DnsModule(this.gateway);

      if (this.autoRegisterNativeEvents) {
        this.registerNativeEventHandlers();
      }
    }

    on(eventName, listener) {
      return this.eventBus.on(eventName, listener);
    }

    once(eventName, listener) {
      return this.eventBus.once(eventName, listener);
    }

    off(eventName, listener) {
      this.eventBus.off(eventName, listener);
    }

    removeAllListeners(eventName) {
      this.eventBus.clear(eventName);
    }

    onNativeEvent(listener) {
      return this.on('nativeEvent', listener);
    }

    onError(listener) {
      return this.on('error', listener);
    }

    getBridgeObject(objectName) {
      return this.gateway.getObject(objectName);
    }

    hasBridgeObject(objectName) {
      return this.gateway.hasObject(objectName);
    }

    getBridgeAvailability() {
      const availability = {};
      BRIDGE_OBJECTS.forEach((objectName) => {
        availability[objectName] = this.hasBridgeObject(objectName);
      });
      return availability;
    }

    isReady(requiredObjects) {
      const targets =
        Array.isArray(requiredObjects) && requiredObjects.length > 0
          ? requiredObjects
          : VT_BRIDGE_OBJECTS;

      return targets.every((objectName) => this.hasBridgeObject(objectName));
    }

    call(objectName, methodName, args) {
      return this.gateway.call({ objectName, methodName, args });
    }

    callJson(objectName, methodName, args) {
      return this.gateway.call({
        objectName,
        methodName,
        args,
        parseJson: true,
      });
    }

    callVoid(objectName, methodName, args) {
      this.gateway.call({ objectName, methodName, args, expectVoid: true });
    }

    registerNativeEventHandlers() {
      this.nativeEvents.register();
      return this;
    }

    unregisterNativeEventHandlers() {
      this.nativeEvents.unregister();
      return this;
    }

    createDebugSnapshot() {
      return {
        strict: this.strict,
        autoRegisterNativeEvents: this.autoRegisterNativeEvents,
        ready: this.isReady(),
        bridgeAvailability: this.getBridgeAvailability(),
        registeredNativeCallbacks: this.nativeEvents.getRegisteredCallbacks(),
        timestamp: Date.now(),
      };
    }

    destroy() {
      this.unregisterNativeEventHandlers();
      this.removeAllListeners();
    }
  }

  const DTunnelSDK = VTunnelSDK;

  VTunnelSDK.VERSION = '2.0.0';
  VTunnelSDK.BRIDGE_OBJECTS = BRIDGE_OBJECTS;
  VTunnelSDK.VT_BRIDGE_OBJECTS = VT_BRIDGE_OBJECTS;
  VTunnelSDK.DT_BRIDGE_OBJECTS = DT_BRIDGE_OBJECTS;
  VTunnelSDK.EVENT_DEFINITIONS = EVENT_DEFINITIONS;
  VTunnelSDK.VTunnelBridgeError = VTunnelBridgeError;
  VTunnelSDK.DTunnelBridgeError = DTunnelBridgeError;

  DTunnelSDK.VERSION = VTunnelSDK.VERSION;
  DTunnelSDK.BRIDGE_OBJECTS = BRIDGE_OBJECTS;
  DTunnelSDK.EVENT_DEFINITIONS = EVENT_DEFINITIONS;
  DTunnelSDK.DTunnelBridgeError = DTunnelBridgeError;

  globalScope.VTunnelBridgeError = VTunnelBridgeError;
  globalScope.DTunnelBridgeError = DTunnelBridgeError;
  globalScope.VTunnelSDK = VTunnelSDK;
  globalScope.DTunnelSDK = DTunnelSDK;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      VTunnelSDK,
      VTunnelBridgeError,
      DTunnelSDK,
      DTunnelBridgeError,
      default: VTunnelSDK,
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
