import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "@services/firebaseConfig";
import Cookies from "js-cookie";

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  Cookies.set("idToken", idToken);
  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  Cookies.set("idToken", idToken);
  return user;
};

export const loginAnonymously = async () => {
  const userCredential = await signInAnonymously(auth);
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  Cookies.set("idToken", idToken);
  return user;
};

export const logoutUser = async () => {
  await auth.signOut();
  Cookies.remove("idToken");
};
