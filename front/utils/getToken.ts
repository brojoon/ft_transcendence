let token: string = '';

const getToken = () => {
  if (!token) {
    token = document.cookie.slice(document.cookie.indexOf('ts_token') + 9);
    token = token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' '));
  }
  return token;
};

export default getToken;