import BasePage from '../common/BasePage.js';

import NotFoundTemplate from '../templates/NotFoundTemplate.js';

const template = NotFoundTemplate();

export default class NotFundPage extends BasePage {
  constructor() {
    super(template);
  }
};
