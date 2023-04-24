export default (notFoundMessage = 'This is not the web page you are looking for') => `
  <div class="no-found-page">
    <h1>${notFoundMessage}</h1>
  </div>
`;
