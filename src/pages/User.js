import BasicPageClass from '../common/BasicPage.js';

import PageTemplate from '../templates/PageTemplate.js';
import RepoTemplate from '../templates/RepoTemplate.js';
import UserInfoTemplate from '../templates/UserInfoTemplate.js';

import { USER_API } from '../constants/api.js';
import { getParameterByName } from '../utils/helpers.js';

export default class UserDetailsPage extends BasicPageClass {
  constructor() {
    super();
    this.getUserDetails();
  }

  // This function is called when template rendering ends
  onInit() {
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  showNotFoundMessage() {
    const userNotFound = document.getElementById('user_not_found');
    userNotFound.innerHTML = `User not found`;
  };

  async getUserDetails() {
    this.showLoader();
    this.toggleNoDataMessage(false);

    const userName = getParameterByName('userName');

    Promise.all([
      this.fetchService.getData(`${USER_API}${userName}`),
      this.fetchService.getData(`${USER_API}${userName}/repos`),
    ]).then(([details, repos]) => {
      if (details?.message === 'Not Found' || repos?.message === 'Not Found') {
        this.showNotFoundMessage();
        return;
      }

      const userInfo = document.getElementById('user-info');
      userInfo.innerHTML = UserInfoTemplate(details);

      const resultCount = document.getElementById('result-count');
      resultCount.innerHTML = `${repos.length} results`;

      const resultListElement = document.getElementById('result-list');
      resultListElement.replaceChildren();

      if (repos?.length) {
        repos.forEach(element => {
          const userItem = document.createElement('div');
          userItem.innerHTML = RepoTemplate(element);
          resultListElement.appendChild(userItem);
        });
      } else {
        this.toggleNoDataMessage(true);
      }

      this.hideLoader();


    }).catch(() => {
      this.showNotFoundMessage();
      this.hideLoader();
    });
  }

  template = `
    <div class="user-details-page">
      <div id="user_not_found"></div>

      <button id="back-btn">&#11013; Back to Users</button>
      
      <div class="user-details">
        <div id="user-info"></div>
      </div>

      ${PageTemplate({
        searchPlaceholder: 'Enter repository name',
        noDataMessage: 'Your search did not match any repositories',
        showSearchBox: false,
      })}
    </div>
  `;
}
