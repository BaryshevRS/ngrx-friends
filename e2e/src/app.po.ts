import {browser, by, element} from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('app-root h6')).getText();
    }

    getLogoText() {
        return element(by.css('app-root .navbar-brand')).getText();
    }
}
