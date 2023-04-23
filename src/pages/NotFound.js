import BasicPageClass from '../common/BasicPage.js';

export default class NotFoundPage extends BasicPageClass {
  constructor () {
    super();
  }

  template = `
    <div class="no-found-page">
      <h1>This is not the web page you are looking for</h1>
    </div>
  `;
}
