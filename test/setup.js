import { Application } from '@hotwired/stimulus';
import IscrollController from 'index';

const application = Application.start();
application.register('iscroll', IscrollController);

require('jest-fetch-mock').enableMocks();

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

global.mockElement = (element, keyValueMap) => {
  for (let key in keyValueMap) {
    Object.defineProperty(element, key, {
      get: () => keyValueMap[key]
    });
  }
}
