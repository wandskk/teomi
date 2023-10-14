import Cookies from 'js-cookie';

export function setCookie(name, value, age) {
  Cookies.set(name, value, { expires: age });
}
