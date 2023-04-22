export default class Route {
  routeContent = null;
  activeRoute = 'users';
  pages = {
    users: () => import('../pages/Users.js'),
    user: () => import('../pages/User.js'),
    repos: () => import('../pages/Repos.js'),
  };

  constructor() {
    window.addEventListener('load', () => this.navigateToHash(window.location.hash));
    window.addEventListener('hashchange', () => this.navigateToHash(window.location.hash));
    this.routeContent = document.getElementById('route-content');
  }

  showEmptyPage() {
    import('../pages/Empty.js').then(module => {
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