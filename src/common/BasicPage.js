import Fetch from '../utils/Fetch.js';
import Pagination from './Pagination.js';

export default class BasicPageClass extends Pagination {

  constructor(getListApi, templateItem) {
    super();
    this.fetchService = new Fetch();

    this.getListApi = getListApi;
    this.templateItem = templateItem;

    this.routeContent = document.getElementById('route-content');
    this.loaderBox = document.getElementById('loader-box');
  }

  // Handle search box functional
  addEventListenerForSearchBox() {
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.searchInput.value) {
        this.search();
      }
    });
    this.searchBtn?.addEventListener('click', () => {
      this.searchInput.value && this.search();
    });
  }

  search() {
    this.searchQuery = this.searchInput.value;
    this.getList();
  };

  // this method show loader
  showLoader() {
    this.loaderBox.classList.add('show');
  }

  // this method hide loader
  hideLoader() {
    this.loaderBox.classList.remove('show');
  }

  toggleNoDataMessage(state) {
    if (state) {
      this.noData?.classList.add('show');
    } else {
      this.noData?.classList.remove('show');
    }
  }

  updateResultCountInView(dataLength, totalCount) {
    const resultCount = document.getElementById('result-count');
    const prevItemCount = (this.currentPage - 1) * this.maxItemCount;
    resultCount.innerHTML = `${prevItemCount + 1} - ${prevItemCount + dataLength} of ${totalCount} items`;
  }

  updateSearchResultInView(data) {
    const resultListElement = document.getElementById('result-list');
    resultListElement.replaceChildren();
    data.forEach(element => {
      const userItem = document.createElement('div');
      userItem.innerHTML = this.templateItem(element);
      resultListElement.appendChild(userItem);
    });
  }
  
  async getList() {
    this.showLoader();
    this.toggleNoDataMessage(false);

    const data = await this.fetchService.getData(`${this.getListApi}?q=${this.searchQuery}&page=${this.currentPage}&per_page=${this.maxItemCount}`);

    // this function is update the result count in the view
    this.updateResultCountInView(data.items.length, data.total_count);

    // this function calculates the max page count and updates the pagination buttons state
    this.updateTotalCount(data.total_count);
    
    if (data?.items?.length) {
      // Show search results
      this.updateSearchResultInView(data.items);
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