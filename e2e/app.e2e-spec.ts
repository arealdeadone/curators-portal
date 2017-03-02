import { CuratorsPortalPage } from './app.po';

describe('curators-portal App', function() {
  let page: CuratorsPortalPage;

  beforeEach(() => {
    page = new CuratorsPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cp works!');
  });
});
