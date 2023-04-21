export default class Route {
  routeContent = null;
  activeRoute = 'users';
  pages = {
    users: () => import('./users.module.js'),
    user: () => import('./user.module.js'),
    repos: () => import('./repos.module.js'),
  };

  constructor() {
    window.addEventListener('load', () => this.navigateToHash(window.location.hash));
    window.addEventListener('hashchange', () => this.navigateToHash(window.location.hash));
    this.routeContent = document.getElementById('route-content');
  }

  showEmptyPage() {
    import('./empty.module.js').then(module => {
      const emptyPage = new module.default();
      this.routeContent.innerHTML = emptyPage.initTemplate();
    })    
  }

  addActiveClass(activeRoute) {
    const oldRoute = document.getElementById(`link-${this.activeRoute}`);
    const activeElement = document.getElementById(`link-${activeRoute}`);
    oldRoute?.classList.remove('active');
    activeElement?.classList.add('active');
    this.activeRoute = activeRoute;
  }
  
  loadPage(page) {
    this.addActiveClass(page);
    const pageModule = this.pages[page];
    if (pageModule) {
      pageModule().then((module) => {
        const page = new module.default();
        this.routeContent.innerHTML = page.initTemplate();
      }).catch(() => {
        this.showEmptyPage();
      });
    } else {
      this.showEmptyPage();
    }
  }
  
  navigateToHash(hash) {
    if (hash) {
      const fullRoute = hash.substring(1);
      const page = fullRoute.split('?');
      this.loadPage(page[0]);
      return;
    }
    this.loadPage('users');
  }
}
