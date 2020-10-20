
export function setCookie(key:string, val:any) {
  localStorage.setItem(key, val)
}

export function getCookie(key:string) {
  return localStorage.getItem(key)
}