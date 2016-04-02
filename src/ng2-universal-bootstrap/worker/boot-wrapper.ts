import {WORKER_APP_PLATFORM, WORKER_APP_APPLICATION} from 'angular2/platform/worker_app';
import {Component, platform} from 'angular2/core';
import {MainBootComponent} from '../../boot.config';

platform([WORKER_APP_PLATFORM])
  .application([WORKER_APP_APPLICATION])
  .bootstrap(MainBootComponent);
