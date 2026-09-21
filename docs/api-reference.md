# 📖 Referência Completa da API - VTunnel SDK

Esta é a documentação técnica detalhada e exaustiva de todos os métodos, classes, eventos, interfaces e objetos nativos de bridge que compõem o **VTunnel SDK**.

---

## 📑 Índice de Módulos

1. [VTunnelSDK (Classe Core)](#1-vtunnelsdk-classe-core)
2. [sdk.main (VPN, Conexão e Anúncios)](#2-sdkmain-vpn-conexão-e-anúncios)
3. [sdk.config (Categorias, Servidores e Importação Offline)](#3-sdkconfig-categorias-servidores-e-importação)
4. [sdk.dns (Custom DNS - IPv4 e IPv6)](#4-sdkdns-custom-dns---ipv4-e-ipv6)
5. [sdk.android (Sistema Android e Hardware)](#5-sdkandroid-sistema-android-e-hardware)
6. [sdk.app (Telas e Configurações Globais)](#6-sdkapp-telas-e-configurações-globais)
7. [sdk.text (Internacionalização Dinâmica)](#7-sdktext-internacionalização-dinâmica)
8. [Simulador Web (vtunnel-sdk/simulator)](#8-simulador-web-vtunnel-sdksimulator)
9. [React Bindings (vtunnel-sdk/react)](#9-react-bindings-vtunnel-sdkreact)
10. [Modelos e Tipos TypeScript](#10-modelos-e-tipos-typescript)

---

## 1. VTunnelSDK (Classe Core)

### Construtor
```ts
new VTunnelSDK(options?: VTunnelSDKOptions): VTunnelSDK
```
Inicializa o gateway, detecta os objetos `window.Vt...` (com fallback para `window.Dt...`) e registra os listeners de eventos nativos no escopo global.

**Opções (`VTunnelSDKOptions`):**
| Campo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `strict` | `boolean` | `false` | Se `true`, lança `VTunnelBridgeError` quando um objeto nativo não existir. Se `false`, retorna `null` e emite evento `'error'`. |
| `autoRegisterNativeEvents` | `boolean` | `true` | Se `true`, registra automaticamente os callbacks globais necessários para escutar eventos do Android. |
| `window` | `VTunnelBridgeHost` | `window` | Objeto de host das bridges nativas (útil para testes ou SSR). |
| `logger` | `Pick<Console, 'error'>` | `console` | Instância personalizada de logger. |

### Métodos de Eventos e Ciclo de Vida

#### `sdk.on(eventName, listener): () => void`
Inscreve um ouvinte para eventos semânticos, eventos nativos ou erros.
- **Retorno**: Função que desfaz a inscrição (unsubcribe).
- **Exemplo:**
  ```ts
  const unsubscribe = sdk.on('vpnState', (event) => {
    console.log('Novo estado da VPN:', event.payload);
  });
  // Para remover o listener:
  unsubscribe();
  ```

#### `sdk.once(eventName, listener): () => void`
Inscreve um ouvinte que será executado uma única vez e depois removido automaticamente.

#### `sdk.off(eventName, listener): void`
Remove um listener específico previamente adicionado.

#### `sdk.removeAllListeners(eventName?: string): void`
Remove todos os listeners do evento informado ou todos os listeners do SDK se nenhum nome for passado.

#### `sdk.getBridgeAvailability(): Record<VTunnelBridgeObjectName, boolean>`
Retorna um mapa booleano indicando a disponibilidade em tempo real de cada um dos objetos nativos da bridge no ambiente atual.

#### `sdk.isReady(requiredObjects?: Array<VTunnelBridgeObjectName | string>): boolean`
Retorna `true` se os objetos informados (ou os objetos essenciais por padrão) estiverem disponíveis na bridge nativa.

#### `sdk.createDebugSnapshot(): VTunnelDebugSnapshot`
Gera uma captura instantânea com disponibilidade da bridge, listeners ativos e estado geral para depuração.

#### `sdk.destroy(): void`
Desregistra todos os listeners e limpa os callbacks globais associados a esta instância do SDK.

---

## 2. sdk.main (VPN, Conexão e Anúncios)

| Método | Retorno | Bridge Nativa | Descrição |
| :--- | :--- | :--- | :--- |
| `startVpn()` | `void` | `VtExecuteVpnStart.execute()` | Inicia a conexão da VPN com o servidor e credenciais selecionados. |
| `stopVpn()` | `void` | `VtExecuteVpnStop.execute()` | Interrompe a conexão ativa da VPN imediatamente. |
| `getVpnState()` | `VTunnelVPNState \| null` | `VtGetVpnState.execute()` | Consulta o estado atual da VPN (`CONNECTED`, `DISCONNECTED`, `CONNECTING`, `STOPPING`, `NO_NETWORK`, `AUTH`, `AUTH_FAILED`). |
| `isVpnRunning()` | `boolean` | `VtIsVpnRunning.execute()` | Retorna se o serviço de VPN do Android está ativo em segundo plano. |
| `startAppUpdate()` | `void` | `VtStartAppUpdate.execute()` | Aciona a rotina nativa de verificação e download de atualização do app. |
| `startCheckUser()` | `void` | `VtStartCheckUser.execute()` | Dispara a verificação das credenciais e limite de conexões do usuário. |
| `showLoggerDialog()` | `void` | `VtShowLoggerDialog.execute()` | Abre o diálogo nativo com o log de depuração da VPN. |
| `getLocalIp()` | `string \| null` | `VtGetLocalIP.execute()` | Retorna o IP local atribuído à interface do dispositivo. |
| `activateAirplaneMode()` | `void` | `VtAirplaneActivate.execute()` | Solicita ativação do modo avião (onde suportado). |
| `deactivateAirplaneMode()` | `void` | `VtAirplaneDeactivate.execute()` | Solicita desativação do modo avião. |
| `getAirplaneState()` | `VTunnelAirplaneState \| null` | `VtAirplaneState.execute()` | Retorna o estado atual do modo avião (`ACTIVATED`, `DEACTIVATED`). |
| `getAssistantState()` | `VTunnelAssistantState \| null` | `VtAppIsCurrentAssistant.get()` | Retorna o status do app como assistente padrão do Android. |
| `isCurrentAssistantEnabled()` | `boolean` | `VtAppIsCurrentAssistant.execute()` | Retorna `true` se o app for o assistente ativo do sistema. |
| `showMenuDialog()` | `void` | `VtShowMenuDialog.execute()` | Abre o menu lateral nativo do aplicativo. |
| `showAdsRewardedDialog()` | `void` | `VtShowDialogAdsRewarded.execute()` | Abre o anúncio premiado do Google AdMob para estender o tempo de conexão. |
| `isAdsEnabled()` | `boolean` | `VtIsAdsEnabled.execute()` | Informa se a monetização via anúncios está habilitada no app. |
| `getRemainingConnectionTime()` | `number \| null` | `VtGetRemainingConnectionTime.execute()` | Retorna o tempo restante de conexão em segundos. |
| `getRemainingConnectionTimerText()` | `string \| null` | `VtGetRemainingConnectionTimerText.execute()` | Retorna o texto formatado do cronômetro (ex: `"02:45:10"`). |
| `getLastVpnError()` | `string \| null` | `VtGetLastVpnError.execute()` | Retorna a última mensagem de erro gerada pelo túnel. |
| `getNetworkName()` | `string \| null` | `VtGetNetworkName.execute()` | Retorna o nome da rede ativa (Wi-Fi SSID ou operadora móvel). |
| `getPingResult()` | `string \| null` | `VtGetPingResult.execute()` | Retorna a latência calculada até o servidor ativo (ex: `"45 ms"`). |
| `getLogs()` | `VTunnelLogEntry[] \| null` | `VtGetLogs.execute()` | Retorna o histórico de logs nativos parseados. |
| `clearLogs()` | `void` | `VtClearLogs.execute()` | Limpa a lista de logs no app nativo. |

---

## 3. sdk.config (Categorias, Servidores e Importação)

| Método | Retorno | Bridge Nativa | Descrição |
| :--- | :--- | :--- | :--- |
| `setConfig(id: number)` | `void` | `VtSetConfig.execute(id)` | Seleciona e ativa a configuração/servidor com o ID especificado. |
| `getConfigs()` | `VTunnelCategory[] \| null` | `VtGetConfigs.execute()` | Retorna a árvore completa de categorias com seus respectivos servidores. |
| `getCategories()` | `VTunnelCategorySummary[] \| null` | `VtGetCategories.execute()` | Retorna a listagem resumida de categorias disponíveis. |
| `getSelectedCategory()` | `VTunnelCategoryDetail \| null` | `VtGetSelectedCategory.execute()` | Retorna a categoria atualmente selecionada com seus servidores. |
| `getSelectedCategoryId()` | `number \| null` | `VtGetSelectedCategoryId.execute()` | Retorna o ID numérico da categoria selecionada. |
| `getConfigsByCategory(categoryId: number)` | `VTunnelConfigListItem[] \| null` | `VtGetConfigsByCategory.execute(id)` | Retorna a lista de servidores de uma categoria específica. |
| `getSelectedConfig()` | `VTunnelDefaultConfig \| null` | `VtGetSelectedConfig.execute()` | Retorna os detalhes do servidor ativo no momento. |
| `getSelectedConfigId()` | `number \| null` | `VtGetSelectedConfigId.execute()` | Retorna o ID do servidor atualmente selecionado. |
| `getConfigCount()` | `number \| null` | `VtGetConfigCount.execute()` | Retorna o total de configurações cadastradas. |
| `getDefaultConfig()` | `VTunnelDefaultConfig \| null` | `VtGetDefaultConfig.execute()` | Retorna a configuração marcada como padrão do app. |
| `openConfigDialog()` | `void` | `VtExecuteDialogConfig.execute()` | Abre o diálogo nativo do app para escolha de servidor/categoria. |
| `getImportPublicKey()` | `string \| null` | `VtGetImportPublicKey.execute()` | Retorna a chave pública RSA para criptografia de payloads de importação. |
| `copyImportPublicKey()` | `void` | `VtCopyImportPublicKey.execute()` | Copia a chave pública do app para a área de transferência. |
| `importConfig(payload: string)` | `void` | `VtImportConfig.execute(payload)` | Importa e aplica uma configuração criptografada offline. |
| `hasPendingConfigImport()` | `boolean` | `VtHasPendingConfigImport.execute()` | Verifica se há uma importação de configuração pendente de confirmação. |
| `getPendingConfigImportDetails()` | `VTunnelPendingImport \| null` | `VtGetPendingConfigImportDetails.execute()` | Retorna detalhes da importação pendente. |
| `getUsername()` / `setUsername(val)` | `string \| null` / `void` | `VtUsername.get()` / `.set(val)` | Consulta ou salva o nome de usuário salvo no app. |
| `getPassword()` / `setPassword(val)` | `string \| null` / `void` | `VtPassword.get()` / `.set(val)` | Consulta ou salva a senha do usuário salva no app. |
| `getUuid()` / `setUuid(val)` | `string \| null` / `void` | `VtUuid.get()` / `.set(val)` | Consulta ou salva o UUID de identificação do cliente. |
| `getUser()` | `VTunnelUserCredentials \| null` | `VtGetUser.execute()` | Retorna username, password e uuid agregados. |
| `getLocalConfigVersion()` | `number \| null` | `VtGetLocalConfigVersion.execute()` | Retorna a versão da base de configurações local. |
| `getCdnCount()` | `number \| null` | `VtCDNCount.execute()` | Retorna a quantidade de nós CDN configurados. |
| `getEndpointCount()` | `number \| null` | `VtEndpointCount.execute()` | Retorna a quantidade de endpoints disponíveis. |

---

## 4. sdk.dns (Custom DNS - IPv4 e IPv6)

O módulo `sdk.dns` expõe o controle de DNS customizado do cliente, integrando diretamente com o [VtBridgeCustomDns.kt](file:///c:/Users/Telks/Desktop/dt/app/src/main/kotlin/com/vtunnel/presentation/jsbridge/VtBridgeCustomDns.kt) do Android.

### Métodos

#### `sdk.dns.get(): VTunnelCustomDnsConfig`
- **Bridge nativa**: `window.VtCustomDns.get()` (ou `execute()`)
- **Retorno**: Objeto contendo o status e os servidores DNS.
- **Exemplo de Retorno:**
  ```json
  {
    "enabled": true,
    "primary": "1.1.1.1",
    "secondary": "1.0.0.1",
    "servers": ["1.1.1.1", "1.0.0.1"]
  }
  ```

#### `sdk.dns.isEnabled(): boolean`
- **Bridge nativa**: `window.VtCustomDns.isEnabled()`
- **Retorno**: `boolean` (`true` se o DNS customizado estiver habilitado).

#### `sdk.dns.setEnabled(enabled: boolean): void`
- **Bridge nativa**: `window.VtCustomDns.setEnabled(enabled)`
- **Descrição**: Habilita ou desabilita o uso de DNS customizado sem apagar os servidores configurados.

#### `sdk.dns.set(configOrEnabled, primary?, secondary?): void`
- **Bridge nativa**: `window.VtCustomDns.set(...)`
- **Descrição**: Salva a configuração de DNS customizado. Suporta objeto de configuração ou argumentos posicionais.
- **Exemplos de Uso:**
  ```ts
  // Via Objeto
  sdk.dns.set({
    enabled: true,
    primary: '8.8.8.8',
    secondary: '8.8.4.4',
  });

  // Via Argumentos Posicionais
  sdk.dns.set(true, '1.1.1.1', '1.0.0.1');
  ```

#### `sdk.dns.save(enabled: boolean, primary: string, secondary: string): void`
- **Bridge nativa**: `window.VtCustomDns.save(enabled, primary, secondary)`
- **Descrição**: Salva os parâmetros no storage do aplicativo e sincroniza o túnel VPN.

#### `sdk.dns.getPresets(): VTunnelDnsPreset[]`
- **Bridge nativa**: `window.VtCustomDns.getPresets()`
- **Retorno**: Lista de provedores populares de DNS com IPs primário e secundário.
- **Exemplo de Retorno:**
  ```json
  [
    { "id": "cloudflare", "name": "Cloudflare", "primary": "1.1.1.1", "secondary": "1.0.0.1" },
    { "id": "google", "name": "Google DNS", "primary": "8.8.8.8", "secondary": "8.8.4.4" },
    { "id": "quad9", "name": "Quad9", "primary": "9.9.9.9", "secondary": "149.112.112.112" },
    { "id": "adguard", "name": "AdGuard DNS", "primary": "94.140.14.14", "secondary": "94.140.15.15" },
    { "id": "opendns", "name": "OpenDNS", "primary": "208.67.222.222", "secondary": "208.67.220.220" }
  ]
  ```

#### `sdk.dns.showDialog(): void`
- **Bridge nativa**: `window.VtShowCustomDnsDialog.execute()`
- **Descrição**: Abre o diálogo nativo do Android para o usuário gerenciar ou selecionar um preset de DNS na interface do sistema.

---

## 5. sdk.android (Sistema Android e Hardware)

| Método | Retorno | Bridge Nativa | Descrição |
| :--- | :--- | :--- | :--- |
| `getDeviceId()` | `string \| null` | `VtGetDeviceID.execute()` | Retorna o identificador único ou Android ID do dispositivo. |
| `sendNotification(title, msg, imgUrl?)` | `void` | `VtSendNotification.execute(...)` | Dispara uma notificação nativa na barra de status do Android. |
| `getNetworkData()` | `VTunnelNetworkData \| null` | `VtGetNetworkData.execute()` | Retorna detalhes do tipo de conexão (`WIFI`, `MOBILE`, estado detalhado). |
| `getStatusBarHeight()` | `number \| null` | `VtGetStatusBarHeight.execute()` | Retorna a altura da barra de status em pixels para cálculo de insets seguros. |
| `getNavigationBarHeight()` | `number \| null` | `VtGetNavigationBarHeight.execute()` | Retorna a altura da barra de navegação virtual em pixels. |
| `openExternalUrl(url: string)` | `void` | `VtOpenExternalUrl.execute(url)` | Abre uma URL no navegador padrão do dispositivo fora do WebView. |
| `startHotSpotService(port?: number)` | `void` | `VtStartHotSpotService.execute(port)` | Inicia o serviço proxy de compartilhamento de conexão (HotSpot). |
| `stopHotSpotService()` | `void` | `VtStopHotSpotService.execute()` | Para o serviço de HotSpot. |
| `getHotSpotStatus()` | `VTunnelHotSpotStatus \| null` | `VtGetStatusHotSpotService.execute()` | Consulta o status do HotSpot (`RUNNING`, `STOPPED`). |
| `isHotSpotRunning()` | `boolean` | `sdk.android.getHotSpotStatus() === 'RUNNING'` | Atalho para verificar se o proxy de hotspot está ativo. |
| `getNetworkDownloadBytes()` | `number \| null` | `VtGetNetworkDownloadBytes.execute()` | Total de bytes baixados na sessão atual. |
| `getNetworkUploadBytes()` | `number \| null` | `VtGetNetworkUploadBytes.execute()` | Total de bytes enviados na sessão atual. |
| `getAppVersion()` | `string \| null` | `VtAppVersion.execute()` | Versão do aplicativo instalada no Android. |
| `handleAction(action: string)` | `void` | `VtActionHandler.execute(action)` | Envia uma ação customizada para tratamento nativo pelo host. |
| `closeApp()` | `void` | `VtCloseApp.execute()` | Fecha a aplicação nativa. |
| `copyToClipboard(text: string)` | `void` | `VtCopyToClipboard.execute(text)` | Copia uma string para a área de transferência do Android. |
| `getClipboardText()` | `string \| null` | `VtGetClipboardText.execute()` | Lê o conteúdo textual da área de transferência. |
| `showToast(message: string)` | `void` | `VtShowToast.execute(message)` | Exibe um Toast nativo rápido na tela do dispositivo. |
| `vibrate(durationMillis?: number)` | `void` | `VtVibrate.execute(durationMillis)` | Executa vibração tátil no aparelho (duração padrão 50ms). |
| `isDarkMode()` | `boolean` | `VtIsDarkMode.execute()` | Informa se o tema escuro está ativado no aplicativo ou sistema. |
| `getAppColors()` | `VTunnelAppColors \| null` | `VtGetAppColors.execute()` | Retorna a paleta de cores hexadecimais configurada no tema nativo. |
| `getDiagnosticReport()` | `string \| null` | `VtGetDiagnosticReport.execute()` | Gera um relatório textual de diagnóstico de rede e conexões. |
| `copyDiagnosticReport()` | `void` | `VtCopyDiagnosticReport.execute()` | Gera e copia o relatório de diagnóstico diretamente para o clipboard. |
| `isSafeMode()` | `boolean` | `VtIsSafeMode.execute()` | Informa se o app está em Modo de Segurança. |

---

## 6. sdk.app (Telas e Configurações Globais)

| Método | Retorno | Bridge Nativa | Descrição |
| :--- | :--- | :--- | :--- |
| `cleanApp()` | `void` | `VtCleanApp.execute()` | Limpa caches e estados temporários do aplicativo. |
| `goToVoiceInputSettings()` | `void` | `VtGoToVoiceInputSettings.execute()` | Abre as configurações de entrada de voz do sistema Android. |
| `getAppConfig<T>(name: string)` | `VTunnelAppConfigValue<T> \| null` | `VtGetAppConfig.execute(name)` | Lê uma chave arbitrária do arquivo de configuração do aplicativo. |
| `ignoreBatteryOptimizations()` | `void` | `VtIgnoreBatteryOptimizations.execute()` | Abre a tela nativa para solicitar isenção de economia de bateria. |
| `startApnActivity()` | `void` | `VtStartApnActivity.execute()` | Abre a tela nativa de configurações de APN do Android. |
| `startNetworkActivity()` | `void` | `VtStartNetworkActivity.execute()` | Abre as configurações de redes móveis do sistema. |
| `startWebViewActivity(url?: string)` | `void` | `VtStartWebViewActivity.execute(url)` | Abre uma nova tela nativa de WebView com a URL fornecida. |
| `startRadioInfoActivity()` | `void` | `VtStartRadioInfoActivity.execute()` | Abre a tela de informações de rádio do Android (*#*#4636#*#*). |

---

## 7. sdk.text (Internacionalização Dinâmica)

### `sdk.text.translate(label: string | null): string | null`
- **Bridge nativa:** `window.VtTranslateText.execute(label)`
- **Descrição**: Traduz uma chave de recurso de texto (ex: `"vpn_connected"`) para a string localizada de acordo com o idioma configurado no Android.

---

## 8. Simulador Web (vtunnel-sdk/simulator)

O simulador emula 100% dos objetos de bridge em navegadores comuns (fora do Android), permitindo desenvolver e testar sem o APK instalado.

```ts
import { installVTunnelSDKSimulator } from 'vtunnel-sdk/simulator';

const simulator = installVTunnelSDKSimulator({
  autoEvents: true, // Dispara eventos semânticos automaticamente
  state: {
    vpnState: 'DISCONNECTED',
    customDns: {
      enabled: false,
      primary: '1.1.1.1',
      secondary: '1.0.0.1',
      servers: ['1.1.1.1', '1.0.0.1'],
    },
  },
});

// Inspecionar chamadas realizadas pela interface
const calls = simulator.getCalls();
console.log('Chamadas gravadas:', calls);

// Alterar estado mockado dinamicamente
simulator.setState({ vpnState: 'CONNECTED' });

// Desinstalar o simulador
simulator.uninstall();
```

---

## 9. React Bindings (vtunnel-sdk/react)

### Componentes
- `<VTunnelSDKProvider sdk?={sdk} options?={options}>`: Provedor de contexto global para a árvore React.

### Hooks
- `useVTunnelSDK()`: Retorna a instância ativa do `VTunnelSDK`.
- `useVTunnelEvent(eventName, listener)`: Inscreve um ouvinte para qualquer evento semântico (`vpnState`, `newLog`, etc.) com desinscrição automática no desmonte do componente.
- `useVTunnelNativeEvent(listener)`: Inscreve um ouvinte para qualquer callback nativo disparado.
- `useVTunnelError(listener)`: Inscreve um ouvinte para erros ocorridos na bridge.

---

## 10. Modelos e Tipos TypeScript

### `VTunnelCustomDnsConfig`
```ts
export interface VTunnelCustomDnsConfig {
  enabled: boolean;
  primary: string;
  secondary: string;
  servers?: string[];
}
```

### `VTunnelDnsPreset`
```ts
export interface VTunnelDnsPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
}
```

### `VTunnelVPNState`
```ts
export type VTunnelVPNState =
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'CONNECTING'
  | 'STOPPING'
  | 'NO_NETWORK'
  | 'AUTH'
  | 'AUTH_FAILED';
```

### `VTunnelBridgeError`
```ts
export declare class VTunnelBridgeError extends Error {
  readonly name: 'VTunnelBridgeError';
  readonly code: string;
  readonly details: Record<string, unknown>;
}
```
