import {AppPage} from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Список друзей');
    });

    it('should display logo name', () => {
        page.navigateTo();
        expect(page.getLogoText()).toEqual('Friends');
    });

});
