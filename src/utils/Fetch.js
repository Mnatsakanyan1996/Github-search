export default class Fetch {
  constructor() {}

  async getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
