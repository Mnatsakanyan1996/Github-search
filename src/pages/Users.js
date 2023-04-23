import BasicPageClass from '../common/BasicPage.js';
import PageTemplate from '../templates/PageTemplate.js'; 
import UserTemplate from '../templates/UserTemplate.js';
import { GET_USER_LIST_API } from '../constants/api.js';

export default class UserPage extends BasicPageClass {
  constructor() {
    super(GET_USER_LIST_API, UserTemplate);
  }

  template = PageTemplate({
    searchPlaceholder: 'Enter username',
    noDataMessage: 'Your search did not match any users',
  });
}
