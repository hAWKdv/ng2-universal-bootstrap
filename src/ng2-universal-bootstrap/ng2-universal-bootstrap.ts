var ng2UniversalBootstrap = ng2UniversalBootstrap || (function () {
  'use strict';

  const _getWebWorkerConfig = (config) => {
    if (typeof config.webworker === 'undefined') {
      return !!window.Worker;
    }

    return config.webworker;
  };

  const boot = (config) => {
    config = config || {};
    config.webworker = _getWebWorkerConfig(config);

    let bootstrap: string;
    let libs: string[];

    if (config.webworker) {
      bootstrap = './dist/ng2-universal-bootstrap/worker/bootstrap';
      libs = ['/node_modules/angular2/bundles/web_worker/ui.dev.js'];
    } else {
      bootstrap = './dist/ng2-universal-bootstrap/main/bootstrap';
      libs = [
        '/node_modules/angular2/bundles/angular2.dev.js',
        '/node_modules/rxjs/bundles/Rx.js'
      ];
    }

    libs = libs.concat(config.libs || []);

    Promise.all(libs.map(src => System.import(src)))
      .then(() => {
        System.import(bootstrap)
          .catch(err => console.error('Error:', err));
      });
  };

  return boot;
}());
