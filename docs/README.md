# 📚 VTunnel SDK - Documentação Oficial

Bem-vindo ao centro de documentação técnica do **VTunnel SDK**. Aqui você encontrará guias passo a passo, referências de cada método e objeto exposto pela bridge nativa do Android, além de exemplos práticos de integração em diferentes ambientes.

---

## 📑 Índice da Documentação

1. **[Guia Rápido de Início (Getting Started)](./getting-started.md)**
   - Instalação e requisitos mínimos
   - Utilização do gerador CLI (`npx vtunnel-sdk init`)
   - Configuração de build para arquivo único do Android (`dist/build.html`)
   - Exemplos com TypeScript, React e CDN

2. **[Referência Completa da API](./api-reference.md)**
   - Classe `VTunnelSDK` e opções de inicialização
   - Módulo `sdk.main`: Conexão VPN, status do serviço e rewarded ads
   - Módulo `sdk.config`: Categorias, servidores, importação offline
   - **Novo Módulo `sdk.dns`**: Custom DNS (IPv4/IPv6), presets e diálogo nativo
   - Módulo `sdk.android`: Insets de tela, notificações, clipboard e hardware
   - Módulo `sdk.app`: Configurações globais e inicialização de activities
   - Módulo `sdk.text`: Sistema de internacionalização (i18n) nativo
   - Módulo `Simulator`: Emulação para desenvolvimento fora do Android

3. **[Guia de Eventos e Callbacks Nativos](./events.md)**
   - Lista completa de todos os 18 eventos semânticos suportados
   - Mapeamento de callbacks nativos (`Vt...` e `Dt...`)
   - Formatos e contratos de payload (com parsing JSON automático)
   - Gerenciamento de subscrições (`on`, `once`, `off`)

4. **[Uso Direto da Bridge sem SDK](./bridge-sem-sdk.md)**
   - Especificação dos objetos `@JavascriptInterface` no `window`
   - Padrão de chamadas manuais e tratamento de erros
   - Mapeamento completo dos pares de bridge `window.Vt...` e `window.Dt...`

---

## 🚀 Como testar a documentação interativa

O diretório `docs/` inclui um portal interativo completo com Playground para simular o comportamento da bridge diretamente no navegador:

Abra o arquivo `docs/index.html` em qualquer navegador web para explorar visualmente a API e testar chamadas em tempo real.
