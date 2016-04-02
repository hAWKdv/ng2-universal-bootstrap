// Import all Ng2 scripts which are in charge of web worker management - Ng2 Web Worker Part
importScripts(
  '/node_modules/systemjs/dist/system.src.js'
);

// Configure SystemJs for web workers
System.config({ defaultJSExtensions: true });

// import asdsa
importScripts(
  '/node_modules/angular2/bundles/web_worker/worker.dev.js',  
  '/node_modules/angular2/bundles/angular2-polyfills.js'  
);

// Import the bootstrapping service 
System.import('./boot-wrapper')
  .then(
    () => console.log('The application has started successfully'),
    error => console.error('error loading background', error)
  );
