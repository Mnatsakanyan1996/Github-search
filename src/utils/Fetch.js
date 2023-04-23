export default class Fetch {
  constructor() {}

  async getData(url) {
    const response = await fetch(url);
    return await response.json();
  }
}
