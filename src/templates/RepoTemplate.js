export default (repository) => `
  <a href=${repository.html_url}>
    <div class="repo-item">
      <img src=${repository.owner.avatar_url} />
      <div class="repo-info">
        <h1>${repository.full_name}</h1>
        <h2>${repository.description || ''}</h2>
      </div>
    </div>
  </a>
`;
