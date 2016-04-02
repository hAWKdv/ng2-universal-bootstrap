var ng2UniversalBootstrap = ng2UniversalBootstrap || (function () {
  'use strict';
  
  let getWebWorkerConfig = (config) => {
    if (typeof config.webworker === 'undefined') {
      return !!window.Worker;
    }
    
    return config.webworker;
  };
  
  let boot = (config) => {
    config = config || {};
    config.webworker = getWebWorkerConfig(config);
    
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
    
    Promise.all(libs.map((src) => {
      return System.import(src);
    })).then(() => {
      System.import(bootstrap)
        .catch(() => console.log('error'));
    });
  };
  
  return boot;
}());
