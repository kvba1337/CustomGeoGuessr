import Cookies from "js-cookie"

const authMiddleware = (store) => (next) => (action) => {
  const idToken = Cookies.get("idToken")
  if (idToken) {
    action.headers = {
      ...action.headers,
      Authorization: `Bearer ${idToken}`,
    }
  }
  return next(action)
}

export default authMiddleware
