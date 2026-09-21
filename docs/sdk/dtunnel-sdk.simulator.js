(function (globalScope) {
  'use strict';

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = require('./vtunnel-sdk.simulator.js');
    return;
  }

  if (globalScope.VTunnelSDKSimulator) {
    globalScope.DTunnelSDKSimulator = globalScope.VTunnelSDKSimulator;
  }
})(typeof window !== 'undefined' ? window : globalThis);
