# 📡 Eventos e Callbacks Nativos - VTunnel SDK

O VTunnel SDK unifica todos os disparos assíncronos do host Android em uma API de eventos orientada a eventos (`EventEmitter`), com parsing automático de JSON, tipagem estrita no TypeScript e compatibilidade com nomes legados.

---

## 📋 Tabela Geral de Eventos Semânticos

| Evento Semântico | Callbacks Nativos Android (`Vt` e `Dt`) | Tipo do Payload no SDK |
| :--- | :--- | :--- |
| `vpnState` | `VtVpnStateEvent(state)` / `vtVpnStateListener(state)`<br>`DtVpnStateEvent(state)` / `dtVpnStateListener(state)` | `VTunnelVPNState \| null` |
| `vpnStartedSuccess` | `VtVpnStartedSuccessEvent()` / `vtVpnStartedSuccessListener()`<br>`DtVpnStartedSuccessEvent()` / `dtVpnStartedSuccessListener()` | `undefined` |
| `vpnStoppedSuccess` | `VtVpnStoppedSuccessEvent()` / `vtVpnStoppedSuccessListener()`<br>`DtVpnStoppedSuccessEvent()` / `dtVpnStoppedSuccessListener()` | `undefined` |
| `newLog` | `VtNewLogEvent()` / `vtOnNewLogListener()`<br>`DtNewLogEvent()` / `dtOnNewLogListener()` | `undefined` |
| `newDefaultConfig` | `VtNewDefaultConfigEvent()` / `vtConfigClickListener()`<br>`DtNewDefaultConfigEvent()` / `dtConfigClickListener()` | `undefined` |
| `checkUserStarted` | `VtCheckUserStartedEvent()` / `vtCheckUserStartedListener()`<br>`DtCheckUserStartedEvent()` / `dtCheckUserStartedListener()` | `undefined` |
| `checkUserResult` | `VtCheckUserResultEvent(json)` / `vtCheckUserModelListener(json)`<br>`DtCheckUserResultEvent(json)` / `dtCheckUserModelListener(json)` | `VTunnelCheckUserResult \| null` |
| `checkUserError` | `VtCheckUserErrorEvent(msg)` / `vtCheckUserErrorListener(msg)`<br>`DtCheckUserErrorEvent(msg)` / `dtCheckUserErrorListener(msg)` | `string \| null` |
| `messageError` | `VtMessageErrorEvent(json)` / `vtMessageErrorListener(json)`<br>`DtMessageErrorEvent(json)` / `dtMessageErrorListener(json)` | `VTunnelMessage \| null` |
| `showSuccessToast` | `VtSuccessToastEvent(msg)` / `vtShowSuccessToastListener(msg)`<br>`DtSuccessToastEvent(msg)` / `dtShowSuccessToastListener(msg)` | `string \| null` |
| `showErrorToast` | `VtErrorToastEvent(msg)` / `vtShowErrorToastListener(msg)`<br>`DtErrorToastEvent(msg)` / `dtShowErrorToastListener(msg)` | `string \| null` |
| `notification` | `VtNotificationEvent(json)`<br>`DtNotificationEvent(json)` | `VTunnelNotification \| null` |
| `localIp` | `VtLocalIpEvent(ip)` / `vtLocalIpListener(ip)`<br>`DtLocalIpEvent(ip)` / `dtLocalIpListener(ip)` | `string \| null` |
| `networkName` | `VtNetworkNameEvent(name)` / `vtNetworkNameListener(name)`<br>`DtNetworkNameEvent(name)` / `dtNetworkNameListener(name)` | `string \| null` |
| `pingResult` | `VtPingResultEvent(ping)` / `vtPingResultListener(ping)`<br>`DtPingResultEvent(ping)` / `dtPingResultListener(ping)` | `string \| null` |
| `checkingAppUpdate` | `VtCheckingAppUpdateEvent(bool)` / `vtCheckingAppUpdateListener(bool)`<br>`DtCheckingAppUpdateEvent(bool)` / `dtCheckingAppUpdateListener(bool)` | `boolean \| null` |
| `airplaneState` | `VtAirplaneStateEvent(state)` / `vtAirplaneStateListener(state)`<br>`DtAirplaneStateEvent(state)` / `dtAirplaneStateListener(state)` | `VTunnelAirplaneState \| null` |
| `hotSpotState` | `VtHotSpotStateEvent(status)` / `vtHotSpotStateListener(status)`<br>`DtHotSpotStateEvent(status)` / `dtHotSpotStateListener(status)` | `VTunnelHotSpotStatus \| null` |
| `reloadRequest` | `VtReloadRequestEvent()` / `vtReloadRequestListener()`<br>`DtReloadRequestEvent()` / `dtReloadRequestListener()` | `string \| null` |

---

## 🎯 Modos de Inscrição

O SDK oferece 4 formas flexíveis de ouvir eventos:

### 1. Inscrição por Nome Semântico (Recomendado)
Escuta eventos pelo nome limpo e amigável:
```ts
const unbind = sdk.on('vpnState', (event) => {
  console.log('Novo estado da VPN:', event.payload); // Ex: 'CONNECTED'
  console.log('Callback nativo de origem:', event.callbackName); // Ex: 'VtVpnStateEvent'
  console.log('Timestamp:', event.timestamp);
});

// Remover o listener
unbind();
```

### 2. Inscrição para Todos os Eventos Nativos (`nativeEvent`)
Captura qualquer evento disparado pelo Android, ideal para logging, telemetria e depuração:
```ts
sdk.on('nativeEvent', (event) => {
  console.log(`[EVENTO NATIVO] ${event.callbackName}`, event.payload);
});
```

### 3. Inscrição por Callback Nativo Específico (`native:<nome>`)
Permite ouvir diretamente um callback nativo de interesse:
```ts
sdk.on('native:VtNotificationEvent', (event) => {
  console.log('Notificação recebida:', event.payload);
});
```

### 4. Inscrição para Erros da Bridge (`error`)
Captura falhas de comunicação e métodos ausentes sem derrubar a aplicação:
```ts
sdk.on('error', (event) => {
  console.error(`Erro [${event.error.code}]:`, event.error.message);
  console.error('Detalhes adicionais:', event.error.details);
});
```

---

## 💡 Ciclo de Vida e Boas Práticas

1. **Sempre guarde o retorno de `sdk.on(...)`** para cancelar inscrições quando componentes de interface forem desmontados.
2. No React, utilize preferencialmente o hook `useVTunnelEvent(eventName, callback)` que cancela automaticamente no unmount.
3. Se estiver usando `strict: false`, certifique-se de registrar um listener para `'error'` para monitorar anomalias na bridge.
