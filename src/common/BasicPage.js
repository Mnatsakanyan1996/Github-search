import Fetch from '../utils/Fetch.js';

export default class BasicPageClass {
  fetchService;
  routeContent;
  loaderBox;

  constructor() {
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
      this.onInit?.();
    }, 0);
    return this.template;
  };
}