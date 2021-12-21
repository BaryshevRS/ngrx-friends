// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;
declare const jasmine;

// import { addMatchers, getTestScheduler, initTestScheduler, resetTestScheduler } from 'jasmine-marbles';
//
// // configure matchers for jasmine-marbles
// jasmine.getEnv().beforeAll(() => {
//   return addMatchers();
// });
// jasmine.getEnv().beforeEach(() => {
//   initTestScheduler();
// });
// jasmine.getEnv().afterEach(() => {
//   getTestScheduler().flush();
//   resetTestScheduler();
// });

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
