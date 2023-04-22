export default (user) => `
  <a href="#user?userName=${user.login}">
    <div class="user-item">
      <img src=${user.avatar_url} />
      <h1>${user.login}</h1>
    </div>
  </a>
`;
