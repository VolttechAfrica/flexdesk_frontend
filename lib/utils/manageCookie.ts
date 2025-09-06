export const getCookie = (name: string) => {
  if (typeof window === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith(`${name}=`))
    ?.split("=")[1]
  return cookie || null
}

export const setCookie = (name: string, value: string, maxAge: number, path: string = "/") => {
  const isHttps = window.location.protocol === "https:"
  const secureAttr = isHttps ? "secure; " : ""
  const sameSite = isHttps ? "strict" : "lax"
  if (typeof window === "undefined") return
  document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; ${secureAttr}samesite=${sameSite}`
}

export const removeCookie = (name: string, path: string = "/") => {
  const isHttps = window.location.protocol === "https:"
  const secureAttr = isHttps ? "secure; " : ""
  const sameSite = isHttps ? "strict" : "lax"
  if (typeof window === "undefined") return
  document.cookie = `${name}=; path=${path}; max-age=0; ${secureAttr}samesite=${sameSite}`
}