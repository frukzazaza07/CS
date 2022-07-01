import {
  checkRememberMe
} from './authCookie';
export default function authHeader() {
  let user = checkRememberMe();
  if (user && user.accessToken) {
    return {
      'Authorization': 'Bearer ' + user.accessToken,
      'x-access-token': 'bezkoder-secret-key',
    };
  } else {
    return {};
  }
}