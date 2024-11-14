import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "@services/firebaseConfig";
import { saveIdTokenToCookies } from "@utils/authUtils";
import Cookies from "js-cookie";

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  saveIdTokenToCookies(user);
  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  saveIdTokenToCookies(user);
  return user;
};

export const loginAnonymously = async () => {
  const userCredential = await signInAnonymously(auth);
  const user = userCredential.user;
  saveIdTokenToCookies(user);
  return user;
};

export const logoutUser = async () => {
  await auth.signOut();
  Cookies.remove("idToken");
};
