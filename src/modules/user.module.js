import BasicPageClass from '../common/BasicPage.js';
import { getParameterByName } from '../utils/helpers.js'; 

export default class ReposPage extends BasicPageClass {
  userDetails = null;
  userNotFound = null;
  repository = [];

  constructor () {
    super();
    this.getUserDetails();
  }

  showNotFoundMessage() {
    this.userNotFound = document.getElementById('user_not_found');
    this.userNotFound.innerHTML = `User not found`;
  };

  async getUserDetails() {
    const userName = getParameterByName('userName');

    Promise.all([
      this.fetchService.getData(`https://api.github.com/users/${userName}`),
      this.fetchService.getData(`https://api.github.com/users/${userName}/repos`),
    ]).then(([details, repos]) => {

      if (details?.message === 'Not Found' || repos?.message === 'Not Found') {
        this.showNotFoundMessage();
        return;
      }

      this.userDetails = details;
      this.repository = repos;
      console.log('user: ', this.userDetails);  
      console.log('repository: ', this.repository);
    }).catch(() => {
      this.showNotFoundMessage();
    });
  }

  template = `
    <div class="">
      <div id="user_not_found"></div>
      <h1>User details</h1>
    </div>
  `;
}
