importScripts('/node_modules/systemjs/dist/system.src.js');

// Configure SystemJs for web workers
System.config({ defaultJSExtensions: true });

importScripts(
  '/node_modules/angular2/bundles/web_worker/worker.dev.js',
  '/node_modules/angular2/bundles/angular2-polyfills.js'
);

// Import the bootstrapping service
System.import('./boot-wrapper')
  .catch(err => console.error('Error:', err));
