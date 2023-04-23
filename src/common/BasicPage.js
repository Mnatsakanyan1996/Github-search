import Fetch from '../utils/Fetch.js';
import Pagination from './Pagination.js';

export default class BasicPageClass extends Pagination {
  constructor(getListApi, templateItem) {
    super();
    this.getListApi = getListApi;
    this.templateItem = templateItem;
    this.fetchService = new Fetch();
    this.routeContent = document.getElementById('route-content');
    this.loaderBox = document.getElementById('loader-box');
  }

  addEventListenerForSearchBox() {
    this.searchInput = document.getElementById('search-input');
    this.searchInput?.addEventListener('keypress', this.search);
  }

  search = (e) => {
    if (e.key === 'Enter' && this.searchInput.value) {
      this.searchQuery = this.searchInput.value;
      this.getList();
    }
  };

  showLoader() {
    this.loaderBox.classList.add('show');
  }

  hideLoader() {
    this.loaderBox.classList.remove('show');
  }

  async getList() {
    this.showLoader();
    this.toggleNoDataMessage(false);

    const data = await this.fetchService.getData(`${this.getListApi}?q=${this.searchQuery}&page=${this.currentPage}&per_page=${this.maxItemCount}`);

    this.updateTotalCount(data.total_count);

    const resultCount = document.getElementById('result-count');
    resultCount.innerHTML = `${data.items.length} (${data.total_count}) results`;

    const resultListElement = document.getElementById('result-list');
    resultListElement.replaceChildren();

    if (data?.items?.length) {
      data.items.forEach(element => {
        const userItem = document.createElement('div');
        userItem.innerHTML = this.templateItem(element);
        resultListElement.appendChild(userItem);
      });
    } else {
      this.toggleNoDataMessage(true);
    }

    this.hideLoader();
  }

  initTemplate () {
    setTimeout(() => {
      this.initPagination();
      this.addEventListenerForSearchBox();
      this.onInit?.();
    }, 0);
    return this.template;
  };
}