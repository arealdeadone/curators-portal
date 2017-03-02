import { browser, element, by } from 'protractor';

export class CuratorsPortalPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cp-root h1')).getText();
  }
}
