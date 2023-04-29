import BasePage from '../common/BasePage.js';

import RepoTemplate from '../templates/RepoTemplate.js';
import PageTemplate from '../templates/PageTemplate.js';

import { GET_REPO_LIST_API } from '../constants/api.js';

const template = PageTemplate({
  noDataMessage: 'Your search did not match any repositories',
  searchPlaceholder: 'Enter repository username',
});

export default class ReposPage extends BasePage {
  constructor() {
    super(template, RepoTemplate, GET_REPO_LIST_API)
  }
};