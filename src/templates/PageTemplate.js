import SearchBoxTemplate from './SearchBoxTemplate.js';

export default ({ searchPlaceholder = 'Search', noDataMessage = 'No data', showSearchBox = true }) => `
  <div class="page-template">

    ${showSearchBox ? SearchBoxTemplate(searchPlaceholder) : ''}

    <div class="action-bar">
      <h2 id="result-count">0 results</h2>

      <div class="pagination-control">
        <button id="btn-prev">Prev</button>
        <button id="btn-next">next</button>
      </div>
    </div>

    <div id="result-list"></div>

    <div id="no-data">
      <h1>${noDataMessage}</h1>
    </div>
  </div>
`;
