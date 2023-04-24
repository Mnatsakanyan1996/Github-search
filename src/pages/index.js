
import PageFactory from '../common/PageFactory.js';

import RepoTemplate from '../templates/RepoTemplate.js';
import UserTemplate from '../templates/UserTemplate.js';
import PageTemplate from '../templates/PageTemplate.js';
import NotFoundTemplate from '../templates/NotFoundTemplate.js';

import { GET_REPO_LIST_API, GET_USER_LIST_API } from '../constants/api.js';

export const pageFactory = new PageFactory();

export const UsersPage = pageFactory.create({
  getListApi: GET_USER_LIST_API,
  templateItem: UserTemplate,
  template: PageTemplate({
    noDataMessage: 'Your search did not match any users',
    searchPlaceholder: 'Enter username',
  })
});

export const ReposPage = pageFactory.create({
  getListApi: GET_REPO_LIST_API,
  templateItem: RepoTemplate,
  template: PageTemplate({
    noDataMessage: 'Your search did not match any repositories',
    searchPlaceholder: 'Enter repository name',
  }),
});

export const NotFoundPage = pageFactory.create({
  template: NotFoundTemplate()
});
