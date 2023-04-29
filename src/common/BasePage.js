import BasicClass from './Base.js';

export default class BasePage extends BasicClass {
  totalCount = 0;
  currentPage = 1;
  maxPageCount = 0;
  maxItemCount = 20;

  constructor(template, templateItem, getListApi) {
    super();

    this.template = template;

    this.getListApi = getListApi;
    this.templateItem = templateItem;
  }

  initPagination() {
    this.btnNext = document.getElementById('btn-next');
    this.btnNext?.addEventListener('click', this.nextPage);

    this.btnPrev = document.getElementById('btn-prev');
    this.btnPrev?.addEventListener('click', this.prevPage);

    this.checkPaginationBtnStatus();
  }

  // This function checks the pagination of the next and previous buttons to disable the state
  checkPaginationBtnStatus() {
    if (!this.btnNext || !this.btnPrev) return;

    if (this.currentPage < this.maxPageCount) {
      this.btnNext.classList.remove('disabled');
    } else {
      this.btnNext.classList.add('disabled');
    }

    if (this.currentPage === 1) {
      this.btnPrev.classList.add('disabled');
    } else {
      this.btnPrev.classList.remove('disabled');
    }
  }

  nextPage = () => {
    if (this.currentPage < this.maxPageCount) {
      this.currentPage++;
      this.getList();
    }

    this.checkPaginationBtnStatus();
  };

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getList();
    }

    this.checkPaginationBtnStatus();
  };

  updateTotalCount(totalCount) {
    this.totalCount = totalCount;
    this.maxPageCount = Math.ceil(totalCount / this.maxItemCount);
    this.checkPaginationBtnStatus();
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
}
