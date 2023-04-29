import Fetch from '../utils/Fetch.js';

export default class BaseClass {

  constructor() {
    this.fetchService = new Fetch();

    this.routeContent = document.getElementById('route-content');
    this.loaderBox = document.getElementById('loader-box');
    this.noData = document.getElementById('no-data');
  }

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

  initTemplate() {
    setTimeout(() => {
      this.initPagination?.();
      this.addEventListenerForSearchBox?.();
      this.onInit?.();
    }, 0);
    return this.template;
  };
}