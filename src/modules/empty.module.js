import BasicPageClass from '../common/BasicPage.js';

export default class EmptyPage extends BasicPageClass {
  constructor () {
    super();
  }

  template = `
    <div class="">
      <h1>Empty</h1>
    </div>
  `;
}
