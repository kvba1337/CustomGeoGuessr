import { faker } from "@faker-js/faker"
import Cookies from "js-cookie"

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required"
  }
  if (username.length < 3) {
    return "Username should be at least 3 characters"
  } else if (username.length > 10) {
    return "Username should be at most 10 characters"
  }
  return null
}

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required"
  }
  if (password.length < 6) {
    return "Password should be at least 6 characters"
  } else if (password.length > 20) {
    return "Password should be at most 20 characters"
  }
  return null
}

export const saveIdTokenToCookies = async (user) => {
  const idToken = await user.getIdToken()
  Cookies.set("idToken", idToken, {
    secure: true,
    sameSite: "Strict",
  })
}

export const generateUsername = (maxLength) => {
  let username = faker.internet.userName()
  while (username.length > maxLength) {
    username = faker.internet.userName()
  }
  return username
}
