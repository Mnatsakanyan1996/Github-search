export default class Pagination {
  totalCount = 0;
  currentPage = 1;
  maxPageCount = 0;
  maxItemCount = 20;

  constructor() { }

  initPagination() {
    this.noData = document.getElementById('no-data');

    this.btnNext = document.getElementById('btn-next');
    this.btnNext?.addEventListener('click', this.nextPage);

    this.btnPrev = document.getElementById('btn-prev');
    this.btnPrev?.addEventListener('click', this.prevPage);

    this.checkPaginationBtnStatus();
  }

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

  toggleNoDataMessage(state) {
    if (state) {
      this.noData?.classList.add('show');
    } else {
      this.noData?.classList.remove('show');
    }
  }

  updateTotalCount(totalCount) {
    this.totalCount = totalCount;
    this.maxPageCount = Math.ceil(totalCount / this.maxItemCount);
    this.checkPaginationBtnStatus();
  }
}