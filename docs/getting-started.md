# 🚀 Guia de Primeiros Passos - VTunnel SDK

Este guia orienta a integração do **VTunnel SDK** na sua aplicação Web para execução dentro do WebView nativo do aplicativo VTunnel Android.

---

## 1. Instalação

Instale o pacote via npm, pnpm, yarn ou bun:

```bash
npm install vtunnel-sdk
```

---

## 2. Criando um Projeto Rápido (CLI)

O jeito mais rápido de começar é utilizando o utilitário de linha de comando (`CLI`) incluído no pacote:

```bash
npx vtunnel-sdk init meu-app
```

Você pode especificar o template e pular as perguntas interativas com a flag `-y`:

```bash
# Template React 18 + Vite + TypeScript (Recomendado)
npx vtunnel-sdk init meu-app --template react-typescript -y

# Template TypeScript Puro + Vite
npx vtunnel-sdk init meu-app --template typescript -y

# Template CDN em arquivo HTML único
npx vtunnel-sdk init meu-app --template cdn -y
```

---

## 3. Estrutura e Formatos de Integração

### A. TypeScript / Vite

```ts
import VTunnelSDK from 'vtunnel-sdk';

const sdk = new VTunnelSDK({
  strict: false,                 // Não lança exceção se um método de bridge não existir
  autoRegisterNativeEvents: true, // Habilita o binding automático dos callbacks
});

// Listener de estado da VPN
sdk.on('vpnState', (event) => {
  console.log('Status da VPN:', event.payload);
});

// Iniciar conexão
sdk.main.startVpn();
```

### B. React 18+ com Hooks

Utilize o `VTunnelSDKProvider` para encapsular a aplicação e os hooks para reagir ao estado da bridge:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  VTunnelSDKProvider,
  useVTunnelSDK,
  useVTunnelEvent,
  useVTunnelError,
} from 'vtunnel-sdk/react';

function VpnDashboard() {
  const sdk = useVTunnelSDK();
  const [vpnState, setVpnState] = React.useState(sdk.main.getVpnState());

  useVTunnelEvent('vpnState', (event) => {
    setVpnState(event.payload);
  });

  useVTunnelError((event) => {
    alert(`Erro na bridge: ${event.error.message}`);
  });

  return (
    <div>
      <h2>Status da VPN: {vpnState ?? 'Desconhecido'}</h2>
      <button onClick={() => sdk.main.startVpn()}>Conectar</button>
      <button onClick={() => sdk.main.stopVpn()}>Desconectar</button>
      <button onClick={() => sdk.dns.showDialog()}>Configurar DNS</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <VTunnelSDKProvider options={{ strict: false, autoRegisterNativeEvents: true }}>
    <VpnDashboard />
  </VTunnelSDKProvider>,
);
```

### C. Uso Direto via CDN (Vanilla JS)

Se sua página for servida diretamente sem bundler:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>VTunnel Web</title>
</head>
<body>
  <button id="btnConnect">Conectar VPN</button>

  <script src="https://cdn.jsdelivr.net/npm/vtunnel-sdk@latest/sdk/vtunnel-sdk.js"></script>
  <script>
    const sdk = new window.VTunnelSDK({
      strict: false,
      autoRegisterNativeEvents: true,
    });

    sdk.on('vpnState', function (event) {
      console.log('Estado VPN:', event.payload);
    });

    document.getElementById('btnConnect').addEventListener('click', function () {
      sdk.main.startVpn();
    });
  </script>
</body>
</html>
```

---

## 4. Gerenciamento de Custom DNS (`sdk.dns`)

Para ler ou salvar servidores DNS customizados configurados pelo usuário:

```ts
// Consultar status e IPs atuais
const dnsConfig = sdk.dns.get();
console.log('Ativo:', dnsConfig.enabled);
console.log('Servidor Primário:', dnsConfig.primary);
console.log('Servidor Secundário:', dnsConfig.secondary);

// Ativar DNS customizado do Google
sdk.dns.set({
  enabled: true,
  primary: '8.8.8.8',
  secondary: '8.8.4.4',
});

// Ou abrir o modal nativo para que o próprio usuário escolha
sdk.dns.showDialog();
```

---

## 5. Compilação para Android (Arquivo Único)

No Android, o WebView consome um arquivo HTML contendo todos os scripts, estilos e fontes inline.

Todos os projetos gerados pelo CLI já vêm com o comando `build:android`:

```bash
npm run build:android
```

Esse comando compila o projeto e empacota tudo em:
```
dist/build.html
```

Copie este arquivo para o diretório de assets do aplicativo Android ou aponte a URL do WebView para seu servidor web.

---

## 6. Tratamento de Erros e Modo `strict`

- **`strict: false` (Padrão recomendado para produção em WebView)**:
  Se algum método nativo não estiver implementado ou faltar permissão no Android, o SDK retorna `null` com segurança e dispara o evento `'error'`, sem interromper a interface com exceções não tratadas.
- **`strict: true` (Recomendado para testes automatizados)**:
  Lança uma instância de `VTunnelBridgeError` imediatamente ao encontrar uma bridge ausente ou erro nativo.

```ts
sdk.on('error', (event) => {
  console.warn(`[${event.error.code}] ${event.error.message}`, event.error.details);
});
```
