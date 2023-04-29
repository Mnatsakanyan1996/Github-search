import BasePage from '../common/BasePage.js';

import UserTemplate from '../templates/UserTemplate.js';
import PageTemplate from '../templates/PageTemplate.js';

import { GET_USER_LIST_API } from '../constants/api.js';

const template = PageTemplate({
  noDataMessage: 'Your search did not match any users',
  searchPlaceholder: 'Enter username',
});

export default class UsersPage extends BasePage {
  constructor() {
    super(template, UserTemplate, GET_USER_LIST_API);
  }
}
