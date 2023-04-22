const searchBox = (searchPlaceholder) => `
  <div class="search-box">
    <input id="search-input" placeholder=${searchPlaceholder} />
  </div>
`;

export default ({ searchPlaceholder, noDataMessage, showSearchBox = true }) => `
  <div class="page-template">

    ${showSearchBox ? searchBox(searchPlaceholder) : ''}

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
