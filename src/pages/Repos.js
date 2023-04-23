import BasicPageClass from '../common/BasicPage.js';
import PageTemplate from '../templates/PageTemplate.js';
import RepoTemplate from '../templates/RepoTemplate.js';
import { GET_REPO_LIST_API } from '../constants/api.js';

export default class ReposPage extends BasicPageClass {
  constructor() {
    super(GET_REPO_LIST_API, RepoTemplate);
  }

  template = PageTemplate({
    searchPlaceholder: 'Enter repository name',
    noDataMessage: 'Your search did not match any repositories',
  });
}
