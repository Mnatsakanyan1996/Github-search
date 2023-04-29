import SearchBoxTemplate from './SearchBoxTemplate.js';
import PaginationControlTemplate from './PaginationControlTemplate.js';

export default ({
  searchPlaceholder = 'Search',
  noDataMessage = 'No data',
  showSearchBox = true,
  paginationControl = true,
}) => `
  <div class="page-template">

    ${showSearchBox ? SearchBoxTemplate(searchPlaceholder) : ''}

    <div class="action-bar">
      <h4 id="result-count">0 items</h4>

      ${paginationControl ? PaginationControlTemplate() : ''}
    </div>

    <div id="result-list"></div>

    <div id="no-data">
      <h1>${noDataMessage}</h1>
    </div>
  </div>
`;
