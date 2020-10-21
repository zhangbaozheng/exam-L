
export function setCookie(key:string, val:any) {
  sessionStorage.setItem(key, val)
}

export function getCookie(key:string) {
  return sessionStorage.getItem(key)
}