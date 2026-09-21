# 🔌 Chamadas Diretas da Bridge (Sem SDK)

Este documento descreve como interagir diretamente com os objetos `@JavascriptInterface` injetados pelo host Android no objeto global `window`, caso você esteja desenvolvendo em um ambiente restrito onde não é possível importar o pacote `vtunnel-sdk`.

---

## ⚠️ Considerações Importantes

1. **Sincronismo**: Todas as chamadas diretas da bridge são síncronas.
2. **Payloads em String**: Alguns métodos retornam objetos estruturados serializados como string JSON. É responsabilidade do desenvolvedor realizar o `JSON.parse`.
3. **Nomenclatura Dupla**: O aplicativo Android moderno injeta os objetos com prefixo `Vt...` e mantém aliases com prefixo `Dt...`. Sempre verifique a existência de ambos para compatibilidade máxima.

---

## 🛠️ Helpers Recomendados

Para evitar quebras em navegadores que não possuam os objetos injetados, use os helpers seguros abaixo:

```js
// Chamada segura para métodos 'execute', 'get' ou 'set'
function vtCall(objectName, methodName, ...args) {
  // Tenta o prefixo Vt ou Dt
  const altName = objectName.startsWith('Vt')
    ? 'Dt' + objectName.slice(2)
    : objectName.startsWith('Dt')
      ? 'Vt' + objectName.slice(2)
      : null;

  const target = window[objectName] || (altName ? window[altName] : null);
  if (!target || typeof target[methodName] !== 'function') {
    return null;
  }

  try {
    return target[methodName](...args);
  } catch (error) {
    console.error(`Erro ao invocar ${objectName}.${methodName}:`, error);
    return null;
  }
}

// Chamada segura com parsing automático de JSON
function vtCallJson(objectName, methodName, ...args) {
  const raw = vtCall(objectName, methodName, ...args);
  if (raw == null || typeof raw !== 'string') return raw ?? null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
```

---

## 📋 Exemplos Práticos de Chamada Direta

### 1. VPN e Conexão
```js
// Iniciar e Parar
vtCall('VtExecuteVpnStart', 'execute');
vtCall('VtExecuteVpnStop', 'execute');

// Consultar Estado
const vpnState = vtCall('VtGetVpnState', 'execute');
console.log('Status VPN:', vpnState); // 'CONNECTED', 'DISCONNECTED', etc.

// Latência e Rede
const ping = vtCall('VtGetPingResult', 'execute');
const networkName = vtCall('VtGetNetworkName', 'execute');
```

### 2. Custom DNS (IPv4 / IPv6)
```js
// Consultar DNS ativo
const rawDns = vtCallJson('VtCustomDns', 'get');
console.log('DNS Config:', rawDns);
// { enabled: true, primary: "1.1.1.1", secondary: "1.0.0.1", servers: [...] }

// Verificar se está habilitado
const isDnsEnabled = vtCall('VtCustomDns', 'isEnabled');

// Alterar DNS via argumentos posicionais
vtCall('VtCustomDns', 'set', true, '8.8.8.8', '8.8.4.4');

// Ou salvar via JSON string
vtCall('VtCustomDns', 'set', JSON.stringify({
  enabled: true,
  primary: '1.1.1.1',
  secondary: '1.0.0.1'
}));

// Abrir diálogo nativo de configuração de DNS
vtCall('VtShowCustomDnsDialog', 'execute');
```

### 3. Categorias e Servidores
```js
// Listar todas as categorias e servidores
const configs = vtCallJson('VtGetConfigs', 'execute');

// Selecionar servidor pelo ID
vtCall('VtSetConfig', 'execute', 15);

// Abrir diálogo nativo de seleção de servidor
vtCall('VtExecuteDialogConfig', 'execute');
```

### 4. Sistema e Hardware
```js
// Insets de barra de status para CSS
const statusBarHeight = vtCall('VtGetStatusBarHeight', 'execute') || 0;
document.documentElement.style.setProperty('--status-bar-height', statusBarHeight + 'px');

// Disparar notificação nativa
vtCall('VtSendNotification', 'execute', 'Título', 'Mensagem do App', '');

// Copiar texto para o clipboard nativo
vtCall('VtCopyToClipboard', 'execute', 'Texto para copiar');

// Toast nativo
vtCall('VtShowToast', 'execute', 'Operação realizada com sucesso!');
```

---

## 📡 Recebendo Eventos Nativos

Sem o SDK, registre funções globais diretamente no `window`:

```js
// Evento de mudança de estado da VPN
window.VtVpnStateEvent = function (state) {
  console.log('Novo estado da VPN recebido:', state);
};
// Alias legado
window.DtVpnStateEvent = window.VtVpnStateEvent;

// Evento de notificação nativa
window.VtNotificationEvent = function (jsonString) {
  try {
    const data = JSON.parse(jsonString);
    console.log('Notificação recebida:', data);
  } catch (_e) {
    console.log('Notificação bruta:', jsonString);
  }
};
window.DtNotificationEvent = window.VtNotificationEvent;
```
