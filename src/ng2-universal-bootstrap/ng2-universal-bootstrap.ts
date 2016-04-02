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
        
    if (config.webworker) {
      System.import('/node_modules/angular2/bundles/web_worker/ui.dev.js')
        .then(() => {
          System.import('./dist/ng2-universal-bootstrap/worker/bootstrap')
            .catch(() => { console.log('error'); });            
        });

      console.log('Workers On');
    } else {        
      System.import('/node_modules/angular2/bundles/angular2.dev.js')
        .then(() => {
          System.import('/node_modules/rxjs/bundles/Rx.js')
            .then(() => {
              System.import('./dist/ng2-universal-bootstrap/main/bootstrap')
                .catch(() => { console.log('error') });                                
            });
        });
      
      console.log('Workers Off');
    }
  };
  
  return boot;
}());
