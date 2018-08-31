import { AuctionPage } from './app.po';

describe('auction App', () => {
  let page: AuctionPage;

  beforeEach(() => {
    page = new AuctionPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
