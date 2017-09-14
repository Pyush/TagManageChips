import { TagManageChipsPage } from './app.po';

describe('tag-manage-chips App', () => {
  let page: TagManageChipsPage;

  beforeEach(() => {
    page = new TagManageChipsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
