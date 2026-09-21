/* eslint-disable no-console */
(function (globalScope) {
  'use strict';

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = require('./vtunnel-sdk.js');
    return;
  }

  if (globalScope.VTunnelSDK) {
    globalScope.DTunnelSDK = globalScope.VTunnelSDK;
    globalScope.DTunnelBridgeError = globalScope.VTunnelBridgeError;
  }
})(typeof window !== 'undefined' ? window : globalThis);
