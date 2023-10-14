import Cookies from 'js-cookie';

export function removeCookie(name) {
  Cookies.remove(name);
}
