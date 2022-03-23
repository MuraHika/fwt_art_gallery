export const getCookie = (value: string) => {
  const cookie = document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === `${value}` ? decodeURIComponent(parts[1]) : "none";
  }, '');
  return cookie;
};