# Ads em layouts HTML

A interface pode ser HTML, mas o vídeo, a recompensa, a contagem e a interrupção da VPN são gerenciados pelo Android. O layout nunca adiciona segundos por conta própria. SDK 2.11.0 e APK atualizado são necessários; a versão npm anterior não contém esta API.

## Configuração do painel

Em **Layout / Aparência → Ads**, mantenha os anúncios ativos e configure a chave da plataforma. Desative apenas as partes que seu HTML vai desenhar:

- `APP_ADS_TIMER_NATIVE_ENABLED`: contador nativo.
- `APP_ADS_WARNING_NATIVE_PROMPT`: aviso de tempo acabando.
- `APP_ADS_EXPIRED_NATIVE_PROMPT`: aviso de tempo esgotado.
- `APP_ADS_REWARDED_NATIVE_PROMPT`: confirmação do método legado/native button.
- `APP_ADS_REWARDED_NATIVE_LOADING`: indicador nativo durante a espera pelo vídeo.
- `APP_ADS_BANNER_ENABLED`: banner nativo opcional.

As cinco opções de apresentação novas assumem `true` quando ausentes. Desativá-las não desativa a monetização, o aviso por evento nem a política de expiração. Para avisos de sucesso/erro em HTML, desative também os toasts nativos correspondentes e trate `showSuccessToast`/`showErrorToast`.

## Uso

```js
const sdk = new VTunnelSDK();
if (!sdk.ads.isSupported()) {
  // Este APK precisa ser atualizado. Os getters antigos continuam funcionando.
} else {
  const render = state => {
    document.querySelector('#tempo').textContent = state.timerText;
    document.querySelector('#ver-anuncio').disabled = !state.enabled || state.rewarded.busy;
  };
  render(sdk.ads.getState());
  const offTimer = sdk.on('adsTimerUpdated', () => render(sdk.ads.getState()));
  const offAd = sdk.on('adsRewardedState', ({ payload }) => {
    render(sdk.ads.getState());
    // LOADING/READY/OPENING/SHOWING/REWARDED/CLOSED/FAILED/CANCELLED/REJECTED
    // REWARDED é a confirmação nativa; nunca conceda tempo a partir de CLOSED.
  });
  const offWarning = sdk.on('adsTimeWarning', ({ payload }) => mostrarAvisoHtml(payload));
  const offExpired = sdk.on('adsTimeExpired', ({ payload }) => mostrarTempoEsgotadoHtml(payload));
  document.querySelector('#ver-anuncio').onclick = () => sdk.ads.showRewarded();
  document.querySelector('#cancelar-espera').onclick = () => sdk.ads.cancelRewarded();
  // Ao desmontar: offTimer(); offAd(); offWarning(); offExpired(); sdk.destroy();
}
```

`getState()` também informa o tempo inicial, tempo por recompensa, limiar de aviso efetivo, `timerRunning`, `vpnConnected`, `graceUsed`, o provider efetivo (`APPODEAL`) e as flags `nativeUi`. O vídeo recompensado continua em tela nativa da plataforma de anúncios.

## Estados do vídeo

`IDLE` não tem vídeo pronto; `LOADING` aguarda cache; `READY` informa disponibilidade; `OPENING` está entregando a tela ao provider; `SHOWING` confirma que o vídeo abriu; `REWARDED` confirma a recompensa; `CLOSED` informa fechamento, com `rewardEarned` indicando se houve recompensa. `FAILED` inclui `error`, e `CANCELLED` termina a espera. `REJECTED` avisa uma segunda solicitação concorrente sem substituir a primeira. `requestId` identifica a solicitação; `busy` sinaliza se ela continua em andamento.

Recompensa e fechamento são eventos diferentes. Cancelamento durante abertura/exibição é ignorado. Uma solicitação ativa não pode ser substituída por outro clique. A cortesia de 120 segundos, quando disponível, pode aumentar o contador ao chegar a zero; `adsTimeExpired` só ocorre quando a política nativa efetivamente encerra a sessão.

## Simulador

O exemplo `examples/ads-html.html` (também em `demos/ads-html/index.html` no repositório) usa o simulador apenas fora de um WebView nativo. A API do simulador fornece `simulateRewardedResult('ready' | 'shown' | 'rewarded' | 'closed' | 'failed')` e `tickAds(seconds)` para testar sem anúncios reais. O simulador só adiciona tempo no resultado `rewarded`, uma vez por solicitação. `tickAds()` só avança com Ads ativos e VPN `CONNECTED`, reproduz o aviso, uma cortesia e a expiração.

Em React, `useVTunnelEvent('adsRewardedState', handler)` e os demais eventos já recebem os mesmos tipos. Leia o snapshot na montagem e no retorno à tela; não mantenha um cronômetro independente como fonte de verdade.
