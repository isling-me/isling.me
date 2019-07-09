export const makeUserUri = (id, username) => {
  return username ? `/@${username}` : `/users/${id}`;
};
