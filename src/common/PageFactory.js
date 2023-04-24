import BasicPageClass from './BasicPage.js';

export default class PageFactory {
  create({
    template,
    templateItem,
    getListApi,
  }) {
    return new BasicPageClass(template, templateItem, getListApi);
  }
}