import BasicPageClass from '../common/BasicPage.js';
import PageTemplate from '../templates/PageTemplate.js'; 
import UserTemplate from '../templates/UserTemplate.js';

export default class UserPage extends BasicPageClass {
  searchInput;
  searchQuery = '';

  constructor() {
    super();
  }

  onInit() {
    // Get Search input and add listener for keypress
    this.searchInput = document.getElementById('search-input');
    this.searchInput?.addEventListener('keypress', this.search);
  }

  search = (e) => {
    if (e.key === 'Enter' && this.searchInput.value) {
      this.searchQuery = this.searchInput.value;
      this.getList();
    }
  };

  async getList() {
    this.showLoader();
    this.toggleNoDataMessage(false);

    const data = await this.fetchService.getData(`https://api.github.com/search/users?q=${this.searchQuery}&page=${this.currentPage}&per_page=${this.maxItemCount}`);

    this.updateTotalCount(data.total_count);

    const resultCount = document.getElementById('result-count');
    resultCount.innerHTML = `${data.items.length} (${data.total_count}) results`;

    const resultListElement = document.getElementById('result-list');
    resultListElement.replaceChildren();

    if (data?.items?.length) {
      data.items.forEach(element => {
        const userItem = document.createElement('div');
        userItem.innerHTML = UserTemplate(element);
        resultListElement.appendChild(userItem);
      });
    } else {
      this.toggleNoDataMessage(true);
    }

    this.hideLoader();
  }

  template = PageTemplate({
    searchPlaceholder: 'Enter username',
    noDataMessage: 'Your search did not match any users',
  });
}
