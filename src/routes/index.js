export default class Route {
  routeContent = null;

  // Default active route
  activeRoute = 'users';
  
  // Global Routes
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
    import('../pages/NotFound.js').then(module => {
      const emptyPage = module.default;
      this.routeContent.innerHTML = emptyPage.initTemplate();
    })    
  }

  addActiveClass(route) {
    const oldRoute = document.getElementById(`link-${this.activeRoute}`);
    const activeElement = document.getElementById(`link-${route}`);
    oldRoute?.classList.remove('active');
    activeElement?.classList.add('active');
    this.activeRoute = route;
  }
  
  loadPage(page) {
    this.addActiveClass(page);
    const pageModule = this.pages[page];
    if (pageModule) {
      pageModule().then((module) => {
        const page = module.default;
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
