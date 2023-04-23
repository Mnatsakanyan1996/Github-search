export default (repository) => `
<div class="repo-item">
  <img src="${repository.owner.avatar_url}" />
  <div class="repo-info">
    <a href="${repository.html_url}">
      <h2>${repository.full_name}</h2>
    </a>
    <h4 class="description">${repository.description || ''}</h4>
    <p class="start-count">&#11088; ${repository.stargazers_count}</p>
  </div>
</div>
`;
