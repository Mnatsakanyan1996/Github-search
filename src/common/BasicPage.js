import Fetch from '../utils/Fetch.js';
import Pagination from './Pagination.js';

export default class BasicPageClass extends Pagination {
  fetchService;
  routeContent;
  loaderBox;

  constructor() {
    super();
    this.fetchService = new Fetch();
    this.routeContent = document.getElementById('route-content');
    this.loaderBox = document.getElementById('loader-box');
  }

  showLoader() {
    this.loaderBox.classList.add('show');
  }

  hideLoader() {
    this.loaderBox.classList.remove('show');
  }

  initTemplate () {
    setTimeout(() => {
      this.initPagination();
      this.onInit?.();
    }, 0);
    return this.template;
  };
}