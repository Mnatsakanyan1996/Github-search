export default (details) => `
  <div class="user-main-info">
    <img src="${details.avatar_url}" />
  </div>
  <div class="user-description">
    <h1>${details.name}</h1>
    <h3>${details.login}</h3>
    <h4>${details.bio}</h4>
    <h4> <span>&#127757;</span> ${details.location}</h4>
    <div class="subscriptions">
      <span>&#128101;</span>
      <h4>Following ${details.following}</h4>
      <h4>Followers ${details.followers}</h4>
    </div>
  </div>
`;
