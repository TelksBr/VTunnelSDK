/* eslint-disable no-console */
(function initVTunnelSDKSimulator(globalScope) {
  'use strict';

  const hasOwn = Object.prototype.hasOwnProperty;

  const VT_BRIDGE_OBJECT_NAMES = Object.freeze([
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
    'VtPingResult',
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

  const DT_BRIDGE_OBJECT_NAMES = Object.freeze(
    VT_BRIDGE_OBJECT_NAMES.map((name) => (name.startsWith('Vt') ? 'Dt' + name.slice(2) : name)),
  );

  const BRIDGE_OBJECT_NAMES = Object.freeze(
    Array.from(new Set([...VT_BRIDGE_OBJECT_NAMES, ...DT_BRIDGE_OBJECT_NAMES])),
  );

  const NATIVE_CALLBACK_NAMES = Object.freeze([
    'VtVpnStateEvent',
    'VtVpnStartedSuccessEvent',
    'VtVpnStoppedSuccessEvent',
    'VtNewLogEvent',
    'VtNewDefaultConfigEvent',
    'VtCheckUserStartedEvent',
    'VtCheckUserResultEvent',
    'VtCheckUserErrorEvent',
    'VtMessageErrorEvent',
    'VtSuccessToastEvent',
    'VtErrorToastEvent',
    'VtNotificationEvent',
    'VtLocalIpEvent',
    'VtNetworkNameEvent',
    'VtPingResultEvent',
    'VtCheckingAppUpdateEvent',
    'VtAirplaneStateEvent',
    'VtHotSpotStateEvent',
    'VtReloadRequestEvent',
    'vtVpnStateListener',
    'vtVpnStartedSuccessListener',
    'vtVpnStoppedSuccessListener',
    'vtOnNewLogListener',
    'vtConfigClickListener',
    'vtCheckUserStartedListener',
    'vtCheckUserModelListener',
    'vtCheckUserErrorListener',
    'vtMessageErrorListener',
    'vtShowSuccessToastListener',
    'vtShowErrorToastListener',
    'vtLocalIpListener',
    'vtNetworkNameListener',
    'vtPingResultListener',
    'vtCheckingAppUpdateListener',
    'vtAirplaneStateListener',
    'vtHotSpotStateListener',
    'vtReloadRequestListener',
    'DtVpnStateEvent',
    'DtVpnStartedSuccessEvent',
    'DtVpnStoppedSuccessEvent',
    'DtNewLogEvent',
    'DtNewDefaultConfigEvent',
    'DtCheckUserStartedEvent',
    'DtCheckUserResultEvent',
    'DtCheckUserErrorEvent',
    'DtMessageErrorEvent',
    'DtSuccessToastEvent',
    'DtErrorToastEvent',
    'DtNotificationEvent',
    'DtLocalIpEvent',
    'DtNetworkNameEvent',
    'DtPingResultEvent',
    'DtCheckingAppUpdateEvent',
    'DtAirplaneStateEvent',
    'DtHotSpotStateEvent',
    'DtReloadRequestEvent',
    'dtVpnStateListener',
    'dtVpnStartedSuccessListener',
    'dtVpnStoppedSuccessListener',
    'dtOnNewLogListener',
    'dtConfigClickListener',
    'dtCheckUserStartedListener',
    'dtCheckUserModelListener',
    'dtCheckUserErrorListener',
    'dtMessageErrorListener',
    'dtShowSuccessToastListener',
    'dtShowErrorToastListener',
    'dtLocalIpListener',
    'dtNetworkNameListener',
    'dtPingResultListener',
    'dtCheckingAppUpdateListener',
    'dtAirplaneStateListener',
    'dtHotSpotStateListener',
    'dtReloadRequestListener',
  ]);

  const SEMANTIC_EVENT_TO_CALLBACK = Object.freeze({
    vpnState: 'VtVpnStateEvent',
    vpnStartedSuccess: 'VtVpnStartedSuccessEvent',
    vpnStoppedSuccess: 'VtVpnStoppedSuccessEvent',
    newLog: 'VtNewLogEvent',
    newDefaultConfig: 'VtNewDefaultConfigEvent',
    checkUserStarted: 'VtCheckUserStartedEvent',
    checkUserResult: 'VtCheckUserResultEvent',
    checkUserError: 'VtCheckUserErrorEvent',
    messageError: 'VtMessageErrorEvent',
    showSuccessToast: 'VtSuccessToastEvent',
    showErrorToast: 'VtErrorToastEvent',
    notification: 'VtNotificationEvent',
    localIp: 'VtLocalIpEvent',
    networkName: 'VtNetworkNameEvent',
    pingResult: 'VtPingResultEvent',
    checkingAppUpdate: 'VtCheckingAppUpdateEvent',
    airplaneState: 'VtAirplaneStateEvent',
    hotSpotState: 'VtHotSpotStateEvent',
    reloadRequest: 'VtReloadRequestEvent',
  });

  const JSON_EVENT_NAMES = Object.freeze([
    'checkUserResult',
    'messageError',
    'notification',
  ]);

  function isPlainObject(value) {
    return (
      value !== null &&
      typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Object]'
    );
  }

  function cloneValue(value) {
    if (Array.isArray(value)) {
      return value.map((item) => cloneValue(item));
    }

    if (isPlainObject(value)) {
      const output = {};
      Object.keys(value).forEach((key) => {
        output[key] = cloneValue(value[key]);
      });
      return output;
    }

    return value;
  }

  function mergeDeep(baseValue, patchValue) {
    const base = cloneValue(baseValue);
    if (!isPlainObject(patchValue)) {
      return base;
    }

    Object.keys(patchValue).forEach((key) => {
      const patchEntry = patchValue[key];
      const baseEntry = base[key];

      if (isPlainObject(baseEntry) && isPlainObject(patchEntry)) {
        base[key] = mergeDeep(baseEntry, patchEntry);
        return;
      }

      base[key] = cloneValue(patchEntry);
    });

    return base;
  }

  function toJsonStringOrNull(value) {
    if (value === null || value === undefined) return null;

    try {
      const json = JSON.stringify(value);
      return json === undefined ? null : json;
    } catch (_error) {
      return JSON.stringify({ value: String(value) });
    }
  }

  function toInteger(value, fallback) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return Math.round(value);
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return Math.round(parsed);
    }

    return fallback;
  }

  function findSelectedConfig(configs, selectedConfigId) {
    if (!Array.isArray(configs)) return null;

    for (let categoryIndex = 0; categoryIndex < configs.length; categoryIndex += 1) {
      const category = configs[categoryIndex];
      const items = Array.isArray(category && category.items) ? category.items : [];

      for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        const item = items[itemIndex];
        if (item && item.id === selectedConfigId) {
          return {
            category,
            item,
          };
        }
      }
    }

    return null;
  }

  function createDefaultState() {
    const defaultItem = {
      id: 101,
      name: 'VTunnel BR',
      description: 'Servidor simulado local',
      mode: 'SSH_DIRECT',
      sorter: 1,
      icon: null,
    };

    return {
      username: 'vtunnel-user',
      password: 'vtunnel-pass',
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      localConfigVersion: 1,
      cdnCount: 2,
      configs: [
        {
          id: 10,
          name: 'Brasil',
          sorter: 1,
          color: '#532e7d',
          items: [defaultItem],
        },
      ],
      defaultConfig: {
        id: defaultItem.id,
        category_id: 10,
        name: defaultItem.name,
        description: defaultItem.description || '',
        mode: defaultItem.mode,
        sorter: defaultItem.sorter,
        icon: defaultItem.icon || '',
      },
      selectedConfigId: defaultItem.id,
      importPublicKey: 'vtunnel_pub_key_mock_123',
      hasPendingImport: false,
      pendingImportDetails: null,
      logs: [],
      vpnState: 'DISCONNECTED',
      airplaneState: 'INACTIVE',
      assistantState: 'ENABLED',
      localIp: '192.168.0.2',
      networkName: 'vtunnel-Wifi',
      pingResult: '42ms',
      adsEnabled: true,
      remainingConnectionTime: 3600,
      remainingConnectionTimerText: '01:00:00',
      lastVpnError: null,
      clipboardText: '',
      isDarkMode: true,
      appColors: {
        backgroundColor: '#121212',
        cardColor: '#1e1e1e',
        cardStatusColor: '#2d2d2d',
        cardConfigColor: '#2d2d2d',
        dialogBackgroundColor: '#1e1e1e',
        dialogLoggerColor: '#121212',
        borderColor: '#333333',
        inputColor: '#2d2d2d',
        textColor: '#ffffff',
        buttonColor: '#532e7d',
        iconColor: '#a855f7',
      },
      diagnosticReport: 'VTunnel Diagnostic Report (Simulator)',
      isSafeMode: false,
      checkUserResult: {
        username: 'vtunnel-user',
        count_connections: '1',
        limit_connections: '2',
        expiration_date: '2099-12-31',
        expiration_days: '9999',
      },
      checkUserError: 'Falha simulada de usuario',
      messageError: {
        title: 'Erro simulado',
        content: 'Mensagem de erro simulada',
      },
      notification: {
        title: 'VTunnel Simulador',
        message: 'Notificacao simulada',
        image: '',
      },
      translations: {
        LBL_VPN_CONNECTED: 'VPN conectada (simulado)',
        LBL_VPN_DISCONNECTED: 'VPN desconectada (simulado)',
      },
      translationPrefix: '[sim] ',
      appConfig: {
        support_url: 'https://example.com/support',
      },
      deviceId: 'vtunnel-device-id',
      networkData: {
        type_name: 'WIFI',
        extra_info: 'vtunnel-network',
        type: 'MOBILE',
        reason: null,
        detailed_state: 'CONNECTED',
      },
      statusBarHeight: 24,
      navigationBarHeight: 0,
      hotSpotStatus: 'STOPPED',
      hotSpotPort: null,
      networkDownloadBytes: 0,
      networkUploadBytes: 0,
      appVersion: 'vtunnel-1.0.0',
      lastExternalUrl: null,
      lastAction: null,
      lastWebViewUrl: null,
      notifications: [],
      closed: false,
      customDns: {
        enabled: false,
        primary: '1.1.1.1',
        secondary: '1.0.0.1',
        servers: ['1.1.1.1', '1.0.0.1'],
      },
      dnsPresets: [
        { id: 'cloudflare', name: 'Cloudflare', primary: '1.1.1.1', secondary: '1.0.0.1' },
        { id: 'google', name: 'Google DNS', primary: '8.8.8.8', secondary: '8.8.4.4' },
        { id: 'quad9', name: 'Quad9', primary: '9.9.9.9', secondary: '149.112.112.112' },
        { id: 'adguard', name: 'AdGuard DNS', primary: '94.140.14.14', secondary: '94.140.15.15' },
        { id: 'opendns', name: 'OpenDNS', primary: '208.67.222.222', secondary: '208.67.220.220' },
      ],
      lastCustomDnsDialogShown: false,
    };
  }

  function createVTunnelSDKSimulator(options) {
    const config = options || {};
    const windowRef = config.window || globalScope;
    const autoEvents = config.autoEvents !== false;
    const allowInWebView = Boolean(config.allowInWebView);

    let state = mergeDeep(createDefaultState(), config.state || {});
    const calls = [];
    const implementations = new Map();
    const originalProperties = new Map();
    const bridgeObjects = {};

    let installed = false;
    let blockedByWebView = false;
    let controller = null;

    function trackCall(objectName, methodName, args, result) {
      calls.push({
        objectName,
        methodName,
        args: cloneValue(args),
        result: cloneValue(result),
        timestamp: Date.now(),
      });
    }

    function appendLog(level, message) {
      const now = new Date();
      const timeStr = [
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0'),
      ].join(':');

      const entry = {
        level: level || 'INFO',
        message: message || '',
        time: timeStr,
        timestamp: String(Date.now()),
      };

      state.logs.push(entry);
      if (autoEvents) {
        emit('newLog');
      }
      return entry;
    }

    function runCall(objectName, methodName, args, fallbackImplementation) {
      const overrideKey = `${objectName}.${methodName}`;
      const altKey = objectName.startsWith('Vt')
        ? `Dt${objectName.slice(2)}.${methodName}`
        : objectName.startsWith('Dt')
          ? `Vt${objectName.slice(2)}.${methodName}`
          : null;

      let result;

      if (implementations.has(overrideKey)) {
        const descriptor = implementations.get(overrideKey);
        if (descriptor.kind === 'function') {
          result = descriptor.value.apply(controller, args);
        } else {
          result = cloneValue(descriptor.value);
        }
      } else if (altKey && implementations.has(altKey)) {
        const descriptor = implementations.get(altKey);
        if (descriptor.kind === 'function') {
          result = descriptor.value.apply(controller, args);
        } else {
          result = cloneValue(descriptor.value);
        }
      } else {
        result = fallbackImplementation();
      }

      trackCall(objectName, methodName, args, result);
      return result;
    }

    function createExecuteBridgeObject(objectName, implementation) {
      return {
        execute: function execute() {
          const args = Array.from(arguments);
          return runCall(objectName, 'execute', args, () =>
            implementation.apply(controller, args),
          );
        },
      };
    }

    function createGetSetBridgeObject(objectName, getter, setter) {
      return {
        get: function get() {
          return runCall(objectName, 'get', [], () => getter.call(controller));
        },
        set: function set(value) {
          return runCall(objectName, 'set', [value], () =>
            setter.call(controller, value),
          );
        },
      };
    }

    function emitCallback(callbackName) {
      const args = Array.prototype.slice.call(arguments, 1);
      const callback = windowRef[callbackName];
      if (typeof callback !== 'function') return false;
      callback.apply(windowRef, args);
      return true;
    }

    function emitEvent(eventName, payload) {
      const callbackName = SEMANTIC_EVENT_TO_CALLBACK[eventName];
      if (!callbackName) return false;

      const altCallbackName = callbackName.startsWith('Vt')
        ? 'Dt' + callbackName.slice(2)
        : callbackName.startsWith('Dt')
          ? 'Vt' + callbackName.slice(2)
          : null;

      const val = JSON_EVENT_NAMES.indexOf(eventName) >= 0
        ? toJsonStringOrNull(payload)
        : payload;

      let success = false;
      if (val === undefined) {
        success = emitCallback(callbackName) || success;
        if (altCallbackName) success = emitCallback(altCallbackName) || success;
      } else {
        success = emitCallback(callbackName, val) || success;
        if (altCallbackName) success = emitCallback(altCallbackName, val) || success;
      }
      return success;
    }

    function emit(name) {
      const args = Array.prototype.slice.call(arguments, 1);
      if (hasOwn.call(SEMANTIC_EVENT_TO_CALLBACK, name)) {
        return emitEvent(name, args[0]);
      }
      return emitCallback.apply(null, [name].concat(args));
    }

    function resolveSelectedConfig(selectedConfigId) {
      const selected = findSelectedConfig(state.configs, selectedConfigId);
      if (!selected) return;

      const selectedCategoryId = toInteger(
        selected.category && selected.category.id,
        state.defaultConfig.category_id,
      );

      state.defaultConfig = {
        id: selected.item.id,
        category_id: selectedCategoryId,
        name: selected.item.name,
        description: selected.item.description || '',
        mode: selected.item.mode,
        sorter: selected.item.sorter,
        icon: selected.item.icon || '',
      };
      state.selectedConfigId = selected.item.id;
    }

    function registerBridgePair(vtName, object) {
      bridgeObjects[vtName] = object;
      const dtName = vtName.startsWith('Vt') ? 'Dt' + vtName.slice(2) : vtName;
      bridgeObjects[dtName] = object;
    }

    registerBridgePair('VtSetConfig', createExecuteBridgeObject('VtSetConfig', (id) => {
      const nextId = toInteger(id, state.selectedConfigId);
      resolveSelectedConfig(nextId);
      appendLog('INFO', `Config selecionada: ${nextId}`);
      if (autoEvents) {
        emit('newDefaultConfig');
      }
    }));

    registerBridgePair('VtGetConfigs', createExecuteBridgeObject('VtGetConfigs', () =>
      toJsonStringOrNull(state.configs),
    ));

    registerBridgePair('VtGetCategories', createExecuteBridgeObject('VtGetCategories', () => {
      const categories = Array.isArray(state.configs)
        ? state.configs.map((cat) => ({
            id: cat.id,
            name: cat.name,
            color: cat.color,
            sorter: cat.sorter,
            count: Array.isArray(cat.items) ? cat.items.length : 0,
          }))
        : [];
      return toJsonStringOrNull(categories);
    }));

    registerBridgePair('VtGetSelectedCategory', createExecuteBridgeObject('VtGetSelectedCategory', () => {
      const selected = findSelectedConfig(state.configs, state.selectedConfigId);
      if (!selected || !selected.category) return null;
      return toJsonStringOrNull({
        id: selected.category.id,
        name: selected.category.name,
        color: selected.category.color,
        sorter: selected.category.sorter,
      });
    }));

    registerBridgePair('VtGetSelectedCategoryId', createExecuteBridgeObject('VtGetSelectedCategoryId', () => {
      const selected = findSelectedConfig(state.configs, state.selectedConfigId);
      return selected && selected.category ? selected.category.id : null;
    }));

    registerBridgePair('VtGetConfigsByCategory', createExecuteBridgeObject('VtGetConfigsByCategory', (categoryId) => {
      const catId = toInteger(categoryId, null);
      if (!Array.isArray(state.configs)) return toJsonStringOrNull([]);
      const found = state.configs.find((c) => c.id === catId);
      return toJsonStringOrNull(found && Array.isArray(found.items) ? found.items : []);
    }));

    registerBridgePair('VtGetSelectedConfig', createExecuteBridgeObject('VtGetSelectedConfig', () =>
      toJsonStringOrNull(state.defaultConfig),
    ));

    registerBridgePair('VtGetSelectedConfigId', createExecuteBridgeObject('VtGetSelectedConfigId', () =>
      state.selectedConfigId,
    ));

    registerBridgePair('VtGetConfigCount', createExecuteBridgeObject('VtGetConfigCount', () => {
      if (!Array.isArray(state.configs)) return 0;
      return state.configs.reduce((total, cat) => {
        return total + (Array.isArray(cat.items) ? cat.items.length : 0);
      }, 0);
    }));

    registerBridgePair('VtGetDefaultConfig', createExecuteBridgeObject('VtGetDefaultConfig', () =>
      toJsonStringOrNull(state.defaultConfig),
    ));

    registerBridgePair('VtExecuteDialogConfig', createExecuteBridgeObject('VtExecuteDialogConfig', () => {
      appendLog('INFO', 'Dialogo de configuracao aberto');
    }));

    registerBridgePair('VtGetImportPublicKey', createExecuteBridgeObject('VtGetImportPublicKey', () =>
      state.importPublicKey,
    ));

    registerBridgePair('VtCopyImportPublicKey', createExecuteBridgeObject('VtCopyImportPublicKey', () => {
      state.clipboardText = String(state.importPublicKey || '');
    }));

    registerBridgePair('VtImportConfig', createExecuteBridgeObject('VtImportConfig', (payload) => {
      state.hasPendingImport = true;
      state.pendingImportDetails = { payload: String(payload || '') };
    }));

    registerBridgePair('VtHasPendingConfigImport', createExecuteBridgeObject('VtHasPendingConfigImport', () =>
      state.hasPendingImport,
    ));

    registerBridgePair('VtGetPendingConfigImportDetails', createExecuteBridgeObject('VtGetPendingConfigImportDetails', () =>
      toJsonStringOrNull(state.pendingImportDetails),
    ));

    registerBridgePair('VtUsername', createGetSetBridgeObject(
      'VtUsername',
      () => state.username,
      (value) => { state.username = String(value || ''); },
    ));

    registerBridgePair('VtPassword', createGetSetBridgeObject(
      'VtPassword',
      () => state.password,
      (value) => { state.password = String(value || ''); },
    ));

    registerBridgePair('VtGetLocalConfigVersion', createExecuteBridgeObject('VtGetLocalConfigVersion', () =>
      state.localConfigVersion,
    ));

    registerBridgePair('VtCDNCount', createExecuteBridgeObject('VtCDNCount', () => state.cdnCount));
    registerBridgePair('VtEndpointCount', createExecuteBridgeObject('VtEndpointCount', () => state.cdnCount));

    registerBridgePair('VtUuid', createGetSetBridgeObject(
      'VtUuid',
      () => state.uuid,
      (value) => { state.uuid = String(value || ''); },
    ));

    registerBridgePair('VtGetUser', createExecuteBridgeObject('VtGetUser', () =>
      toJsonStringOrNull({
        username: state.username,
        password: state.password,
        uuid: state.uuid,
      }),
    ));

    registerBridgePair('VtGetLogs', createExecuteBridgeObject('VtGetLogs', () =>
      toJsonStringOrNull(state.logs),
    ));

    registerBridgePair('VtClearLogs', createExecuteBridgeObject('VtClearLogs', () => {
      state.logs = [];
    }));

    registerBridgePair('VtExecuteVpnStart', createExecuteBridgeObject('VtExecuteVpnStart', () => {
      state.vpnState = 'CONNECTED';
      appendLog('INFO', 'VPN iniciada (simulado)');
      if (autoEvents) {
        emit('vpnStartedSuccess');
        emit('vpnState', state.vpnState);
      }
    }));

    registerBridgePair('VtExecuteVpnStop', createExecuteBridgeObject('VtExecuteVpnStop', () => {
      state.vpnState = 'DISCONNECTED';
      appendLog('INFO', 'VPN parada (simulado)');
      if (autoEvents) {
        emit('vpnStoppedSuccess');
        emit('vpnState', state.vpnState);
      }
    }));

    registerBridgePair('VtGetVpnState', createExecuteBridgeObject('VtGetVpnState', () => state.vpnState));
    registerBridgePair('VtIsVpnRunning', createExecuteBridgeObject('VtIsVpnRunning', () =>
      state.vpnState === 'CONNECTED',
    ));

    registerBridgePair('VtStartAppUpdate', createExecuteBridgeObject('VtStartAppUpdate', () => {
      appendLog('INFO', 'Verificando atualizacao...');
      if (autoEvents) emit('checkingAppUpdate', true);
    }));

    registerBridgePair('VtStartCheckUser', createExecuteBridgeObject('VtStartCheckUser', () => {
      appendLog('INFO', 'Checando usuario...');
      if (autoEvents) {
        emit('checkUserStarted');
        setTimeout(() => {
          if (state.checkUserResult) {
            emit('checkUserResult', state.checkUserResult);
          } else {
            emit('checkUserError', state.checkUserError);
          }
        }, 50);
      }
    }));

    registerBridgePair('VtShowLoggerDialog', createExecuteBridgeObject('VtShowLoggerDialog', () => {
      appendLog('INFO', 'Dialogo de logs aberto');
    }));

    registerBridgePair('VtGetLocalIP', createExecuteBridgeObject('VtGetLocalIP', () => state.localIp));

    registerBridgePair('VtAirplaneActivate', createExecuteBridgeObject('VtAirplaneActivate', () => {
      state.airplaneState = 'ACTIVE';
      if (autoEvents) emit('airplaneState', 'ACTIVE');
    }));

    registerBridgePair('VtAirplaneDeactivate', createExecuteBridgeObject('VtAirplaneDeactivate', () => {
      state.airplaneState = 'INACTIVE';
      if (autoEvents) emit('airplaneState', 'INACTIVE');
    }));

    registerBridgePair('VtAirplaneState', createExecuteBridgeObject('VtAirplaneState', () => state.airplaneState));
    registerBridgePair('VtAppIsCurrentAssistant', createExecuteBridgeObject('VtAppIsCurrentAssistant', () => state.assistantState));
    registerBridgePair('VtShowMenuDialog', createExecuteBridgeObject('VtShowMenuDialog', () => {}));
    registerBridgePair('VtShowDialogAdsRewarded', createExecuteBridgeObject('VtShowDialogAdsRewarded', () => {}));
    registerBridgePair('VtIsAdsEnabled', createExecuteBridgeObject('VtIsAdsEnabled', () => state.adsEnabled));
    registerBridgePair('VtGetRemainingConnectionTime', createExecuteBridgeObject('VtGetRemainingConnectionTime', () => state.remainingConnectionTime));
    registerBridgePair('VtGetRemainingConnectionTimerText', createExecuteBridgeObject('VtGetRemainingConnectionTimerText', () => state.remainingConnectionTimerText));
    registerBridgePair('VtGetLastVpnError', createExecuteBridgeObject('VtGetLastVpnError', () => state.lastVpnError));
    registerBridgePair('VtGetNetworkName', createExecuteBridgeObject('VtGetNetworkName', () => state.networkName));
    registerBridgePair('VtGetPingResult', createExecuteBridgeObject('VtGetPingResult', () => state.pingResult));
    registerBridgePair('VtPingResult', createExecuteBridgeObject('VtPingResult', () => state.pingResult));

    registerBridgePair('VtTranslateText', createExecuteBridgeObject('VtTranslateText', (label) => {
      const key = String(label || '');
      if (state.translations && hasOwn.call(state.translations, key)) {
        return state.translations[key];
      }
      return `${state.translationPrefix || ''}${key}`;
    }));

    registerBridgePair('VtCleanApp', createExecuteBridgeObject('VtCleanApp', () => {
      state.logs = [];
    }));

    registerBridgePair('VtGoToVoiceInputSettings', createExecuteBridgeObject('VtGoToVoiceInputSettings', () => {}));

    registerBridgePair('VtGetAppConfig', createExecuteBridgeObject('VtGetAppConfig', (name) => {
      const key = String(name || '');
      if (state.appConfig && hasOwn.call(state.appConfig, key)) {
        return toJsonStringOrNull({ value: state.appConfig[key] });
      }
      return null;
    }));

    registerBridgePair('VtIgnoreBatteryOptimizations', createExecuteBridgeObject('VtIgnoreBatteryOptimizations', () => {}));
    registerBridgePair('VtStartApnActivity', createExecuteBridgeObject('VtStartApnActivity', () => {}));
    registerBridgePair('VtStartNetworkActivity', createExecuteBridgeObject('VtStartNetworkActivity', () => {}));

    registerBridgePair('VtStartWebViewActivity', createExecuteBridgeObject('VtStartWebViewActivity', (url) => {
      state.lastWebViewUrl = url ? String(url) : null;
    }));

    registerBridgePair('VtStartRadioInfoActivity', createExecuteBridgeObject('VtStartRadioInfoActivity', () => {}));
    registerBridgePair('VtGetDeviceID', createExecuteBridgeObject('VtGetDeviceID', () => state.deviceId));

    registerBridgePair('VtSendNotification', createExecuteBridgeObject('VtSendNotification', (title, message, imageUrl) => {
      const item = {
        title: String(title || ''),
        message: String(message || ''),
        image: imageUrl ? String(imageUrl) : '',
      };
      state.notifications.push(item);
      state.notification = item;
      if (autoEvents) emit('notification', item);
    }));

    registerBridgePair('VtGetNetworkData', createExecuteBridgeObject('VtGetNetworkData', () =>
      toJsonStringOrNull(state.networkData),
    ));

    registerBridgePair('VtGetStatusBarHeight', createExecuteBridgeObject('VtGetStatusBarHeight', () => state.statusBarHeight));
    registerBridgePair('VtGetNavigationBarHeight', createExecuteBridgeObject('VtGetNavigationBarHeight', () => state.navigationBarHeight));

    registerBridgePair('VtOpenExternalUrl', createExecuteBridgeObject('VtOpenExternalUrl', (url) => {
      state.lastExternalUrl = String(url || '');
    }));

    registerBridgePair('VtStartHotSpotService', createExecuteBridgeObject('VtStartHotSpotService', (port) => {
      state.hotSpotStatus = 'RUNNING';
      state.hotSpotPort = toInteger(port, 8080);
      if (autoEvents) emit('hotSpotState', 'RUNNING');
    }));

    registerBridgePair('VtStopHotSpotService', createExecuteBridgeObject('VtStopHotSpotService', () => {
      state.hotSpotStatus = 'STOPPED';
      if (autoEvents) emit('hotSpotState', 'STOPPED');
    }));

    registerBridgePair('VtGetStatusHotSpotService', createExecuteBridgeObject('VtGetStatusHotSpotService', () => state.hotSpotStatus));
    registerBridgePair('VtGetNetworkDownloadBytes', createExecuteBridgeObject('VtGetNetworkDownloadBytes', () => state.networkDownloadBytes));
    registerBridgePair('VtGetNetworkUploadBytes', createExecuteBridgeObject('VtGetNetworkUploadBytes', () => state.networkUploadBytes));
    registerBridgePair('VtAppVersion', createExecuteBridgeObject('VtAppVersion', () => state.appVersion));

    registerBridgePair('VtActionHandler', createExecuteBridgeObject('VtActionHandler', (action) => {
      state.lastAction = String(action || '');
    }));

    registerBridgePair('VtCloseApp', createExecuteBridgeObject('VtCloseApp', () => {
      state.closed = true;
    }));

    registerBridgePair('VtCopyToClipboard', createExecuteBridgeObject('VtCopyToClipboard', (text) => {
      state.clipboardText = String(text || '');
    }));

    registerBridgePair('VtGetClipboardText', createExecuteBridgeObject('VtGetClipboardText', () => state.clipboardText));
    registerBridgePair('VtShowToast', createExecuteBridgeObject('VtShowToast', (msg) => {
      if (autoEvents) emit('showSuccessToast', String(msg || ''));
    }));

    registerBridgePair('VtVibrate', createExecuteBridgeObject('VtVibrate', () => {}));
    registerBridgePair('VtIsDarkMode', createExecuteBridgeObject('VtIsDarkMode', () => state.isDarkMode));

    registerBridgePair('VtGetAppColors', createExecuteBridgeObject('VtGetAppColors', () =>
      toJsonStringOrNull(state.appColors),
    ));

    registerBridgePair('VtGetDiagnosticReport', createExecuteBridgeObject('VtGetDiagnosticReport', () => state.diagnosticReport));
    registerBridgePair('VtCopyDiagnosticReport', createExecuteBridgeObject('VtCopyDiagnosticReport', () => {
      state.clipboardText = String(state.diagnosticReport || '');
    }));

    registerBridgePair('VtIsSafeMode', createExecuteBridgeObject('VtIsSafeMode', () => state.isSafeMode));

    // Custom DNS Module Simulator
    const customDnsObject = {
      get: function get() {
        return runCall('VtCustomDns', 'get', [], () => toJsonStringOrNull(state.customDns));
      },
      execute: function execute() {
        return runCall('VtCustomDns', 'execute', [], () => toJsonStringOrNull(state.customDns));
      },
      isEnabled: function isEnabled() {
        return runCall('VtCustomDns', 'isEnabled', [], () => Boolean(state.customDns.enabled));
      },
      setEnabled: function setEnabled(enabled) {
        return runCall('VtCustomDns', 'setEnabled', [enabled], () => {
          state.customDns.enabled = Boolean(enabled);
        });
      },
      set: function set(enabledOrJson, primary, secondary) {
        const args = Array.from(arguments);
        return runCall('VtCustomDns', 'set', args, () => {
          if (typeof enabledOrJson === 'object' && enabledOrJson !== null) {
            if ('enabled' in enabledOrJson) state.customDns.enabled = Boolean(enabledOrJson.enabled);
            if ('primary' in enabledOrJson) state.customDns.primary = String(enabledOrJson.primary || '');
            if ('secondary' in enabledOrJson) state.customDns.secondary = String(enabledOrJson.secondary || '');
          } else if (typeof enabledOrJson === 'string' && enabledOrJson.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(enabledOrJson);
              if ('enabled' in parsed) state.customDns.enabled = Boolean(parsed.enabled);
              if ('primary' in parsed) state.customDns.primary = String(parsed.primary || '');
              if ('secondary' in parsed) state.customDns.secondary = String(parsed.secondary || '');
            } catch (_e) {}
          } else {
            state.customDns.enabled = Boolean(enabledOrJson);
            state.customDns.primary = String(primary || '');
            state.customDns.secondary = String(secondary || '');
          }
          const servers = [];
          if (state.customDns.primary) servers.push(state.customDns.primary);
          if (state.customDns.secondary) servers.push(state.customDns.secondary);
          state.customDns.servers = servers;
        });
      },
      save: function save(enabled, primary, secondary) {
        const args = Array.from(arguments);
        return runCall('VtCustomDns', 'save', args, () => {
          state.customDns.enabled = Boolean(enabled);
          state.customDns.primary = String(primary || '');
          state.customDns.secondary = String(secondary || '');
          const servers = [];
          if (state.customDns.primary) servers.push(state.customDns.primary);
          if (state.customDns.secondary) servers.push(state.customDns.secondary);
          state.customDns.servers = servers;
        });
      },
      getPresets: function getPresets() {
        return runCall('VtCustomDns', 'getPresets', [], () => toJsonStringOrNull(state.dnsPresets));
      },
    };

    const showCustomDnsDialogObject = {
      execute: function execute() {
        return runCall('VtShowCustomDnsDialog', 'execute', [], () => {
          state.lastCustomDnsDialogShown = true;
        });
      },
    };

    registerBridgePair('VtCustomDns', customDnsObject);
    registerBridgePair('VtShowCustomDnsDialog', showCustomDnsDialogObject);

    function install() {
      if (installed) return controller;

      if (!allowInWebView && hasExternalBridge()) {
        blockedByWebView = true;
        return controller;
      }

      Object.keys(bridgeObjects).forEach((name) => {
        if (!originalProperties.has(name)) {
          originalProperties.set(name, windowRef[name]);
        }
        windowRef[name] = bridgeObjects[name];
      });

      installed = true;
      blockedByWebView = false;
      return controller;
    }

    function uninstall() {
      if (!installed) return controller;

      originalProperties.forEach((originalValue, name) => {
        if (originalValue === undefined) {
          try {
            delete windowRef[name];
          } catch (_error) {
            windowRef[name] = undefined;
          }
        } else {
          windowRef[name] = originalValue;
        }
      });

      originalProperties.clear();
      installed = false;
      return controller;
    }

    function setImplementation(objectName, methodName, implementation) {
      const key = `${objectName}.${methodName}`;
      if (typeof implementation === 'function') {
        implementations.set(key, { kind: 'function', value: implementation });
        return controller;
      }
      implementations.set(key, { kind: 'value', value: cloneValue(implementation) });
      return controller;
    }

    function removeImplementation(objectName, methodName) {
      const key = `${objectName}.${methodName}`;
      implementations.delete(key);
      return controller;
    }

    function clearImplementations() {
      implementations.clear();
      return controller;
    }

    function getBridgeObject(objectName) {
      return bridgeObjects[objectName];
    }

    function hasExternalBridge() {
      return BRIDGE_OBJECT_NAMES.some((objectName) => {
        const candidate = windowRef[objectName];
        if (candidate === undefined || candidate === null) return false;
        return candidate !== bridgeObjects[objectName];
      });
    }

    controller = {
      window: windowRef,
      bridgeObjectNames: BRIDGE_OBJECT_NAMES,
      callbackNames: NATIVE_CALLBACK_NAMES,
      semanticEventToCallback: SEMANTIC_EVENT_TO_CALLBACK,
      autoEvents,
      allowInWebView,
      install,
      uninstall,
      isInstalled() {
        return installed;
      },
      isBlockedByWebView() {
        return blockedByWebView;
      },
      getState() {
        return cloneValue(state);
      },
      setState(patchState) {
        state = mergeDeep(state, patchState || {});
        return controller;
      },
      resetState(nextState) {
        state = mergeDeep(createDefaultState(), nextState || {});
        return controller;
      },
      getCalls() {
        return cloneValue(calls);
      },
      clearCalls() {
        calls.length = 0;
        return controller;
      },
      setImplementation,
      removeImplementation,
      clearImplementations,
      emit,
      getBridgeObject,
    };

    return controller;
  }

  function installVTunnelSDKSimulator(options) {
    const controller = createVTunnelSDKSimulator(options);
    controller.install();
    return controller;
  }

  const createDTunnelSDKSimulator = createVTunnelSDKSimulator;
  const installDTunnelSDKSimulator = installVTunnelSDKSimulator;

  const publicApi = {
    BRIDGE_OBJECT_NAMES,
    VT_BRIDGE_OBJECT_NAMES,
    DT_BRIDGE_OBJECT_NAMES,
    NATIVE_CALLBACK_NAMES,
    SEMANTIC_EVENT_TO_CALLBACK,
    createVTunnelSDKSimulator,
    installVTunnelSDKSimulator,
    createDTunnelSDKSimulator,
    installDTunnelSDKSimulator,
  };

  globalScope.VTunnelSDKSimulator = publicApi;
  globalScope.DTunnelSDKSimulator = publicApi;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      ...publicApi,
      default: publicApi,
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
