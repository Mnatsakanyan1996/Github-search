import BasicPageClass from '../common/BasicPage.js';

export default class UserPage extends BasicPageClass {
  userList = [];
  userListElement;
  usersNotFound;
  searchInput;

  constructor() {
    super();
  }

  onInit() {
    this.searchInput = document.getElementById('search-input');
    this.searchInput.addEventListener('keypress', this.searchUser);
    this.usersNotFound = document.getElementById('user-not-found');
  }

  searchUser = (e) => {
    if (e.key === 'Enter' && this.searchInput.value) {
      this.getList(this.searchInput.value);
    }
  };

  toggleUsersNotFoundMessage(state) {
    state ? this.usersNotFound.classList.add('show') : this.usersNotFound.classList.remove('show');
  }

  async getList(query) {
    this.showLoader();
    this.toggleUsersNotFoundMessage(false);
    const data = await this.fetchService.getData(`https://api.github.com/search/users?q=${query}`);
    console.log('data: ', data);

    this.userListElement = document.getElementById('user_list');
    this.userListElement.replaceChildren();

    if (data?.items?.length) {
      data.items.forEach(element => {
        const userItem = document.createElement('div');
        userItem.classList.add('search-list-item');
        userItem.innerHTML = `
          <a href="#user?userName=${element.login}">
            <div class="user-item">
              <h1>${element.login}</h1>
            </div>
          </a>
        `;
        this.userListElement.appendChild(userItem);
      });
    } else {
      this.toggleUsersNotFoundMessage(true);
    }

    this.hideLoader();
  }

  template = `
    <div class="users-page">
      <div class="search-box">
        <input id="search-input" placeholder="Enter username" />
      </div>

      <div id="user_list"></div>

      <div id="user-not-found">
        <h1>Your search did not match any users</h1>
      </div>
    </div>
  `;
}
