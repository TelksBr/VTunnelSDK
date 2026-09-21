# VTunnel SDK

SDK JavaScript/TypeScript para consumir a bridge Android (`window.Vt...` / `window.Dt...`) no WebView do VTunnel.

> **Compatibilidade**: Mantém suporte bidirecional completo tanto para a nova nomenclatura `VTunnel` / `window.Vt...` quanto para o legado `DTunnel` / `window.Dt...`.

---

## Recursos Principais

- 🚀 **Nova API VTunnel**: módulos `main`, `config`, `dns`, `text`, `app`, `android`.
- 🌐 **Módulo Custom DNS (`sdk.dns`)**: gerenciamento completo de DNS customizado do cliente (IPv4/IPv6), leitura, salvamento, presets (Cloudflare, Google, Quad9, AdGuard, OpenDNS) e chamada do modal nativo (`showDialog`).
- 🔄 **Compatibilidade Dupla**: funciona com hosts que injetam `Vt...` ou `Dt...`, alternando automaticamente.
- 🧪 **Simulador Completo**: desenvolvimento e testes em navegadores sem necessidade do app Android real (`vtunnel-sdk/simulator`).
- ⚛️ **React Bindings**: Provider e hooks (`useVTunnelSDK`, `useVTunnelEvent`, `useVTunnelError`, etc.).
- 📦 **CLI Embutido**: gerador de projetos rápidos (`npx vtunnel-sdk init`).

---

## Instalação

```bash
npm install vtunnel-sdk
```

*(Ou `npm install dtunnel-sdk` para compatibilidade com projetos legados).*

---

## Inicializar Projeto Pronto (CLI)

Crie um projeto novo com template e `build:android` já configurado:

```bash
npx vtunnel-sdk init meu-app --template react-typescript
```

Templates disponíveis:
- `react-typescript` (React 18 + Vite + TypeScript)
- `typescript` (Vite + TypeScript)
- `cdn` (Arquivo HTML único)

---

## Uso Rápido

```ts
import VTunnelSDK from 'vtunnel-sdk';

const sdk = new VTunnelSDK({
  strict: false,
  autoRegisterNativeEvents: true,
});

// Status da VPN
sdk.on('vpnState', (event) => {
  console.log('Estado da VPN:', event.payload);
});

// Conectar / Desconectar
sdk.main.startVpn();
sdk.main.stopVpn();
```

---

## Gerenciamento de Custom DNS (`sdk.dns`)

```ts
// 1. Verificar se DNS customizado está ativo
const isEnabled = sdk.dns.isEnabled();

// 2. Obter configuração atual
const currentDns = sdk.dns.get();
console.log(currentDns);
// { enabled: false, primary: '1.1.1.1', secondary: '1.0.0.1', servers: ['1.1.1.1', '1.0.0.1'] }

// 3. Obter presets disponíveis (Cloudflare, Google, Quad9, AdGuard, OpenDNS)
const presets = sdk.dns.getPresets();

// 4. Salvar novo DNS customizado (via objeto ou argumentos)
sdk.dns.set({
  enabled: true,
  primary: '8.8.8.8',
  secondary: '8.8.4.4',
});

// Ou via argumentos posicionais:
sdk.dns.set(true, '1.1.1.1', '1.0.0.1');

// 5. Abrir diálogo nativo do Android para configuração de DNS
sdk.dns.showDialog();
```

---

## Simulador para Desenvolvimento Local

```ts
import VTunnelSDK from 'vtunnel-sdk';
import { installVTunnelSDKSimulator } from 'vtunnel-sdk/simulator';

// Instala mock completo no window (apenas fora do WebView nativo)
const simulator = installVTunnelSDKSimulator({ autoEvents: true });
const sdk = new VTunnelSDK();

sdk.on('vpnState', (event) => {
  console.log('Evento VPN:', event.payload);
});

sdk.main.startVpn();
```

---

## Testes e Validação

```bash
npm test
npm run test:typecheck
```
