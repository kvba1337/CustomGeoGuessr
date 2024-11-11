import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  saveIdTokenToCookies,
} from "../../firebaseConfig";
import {
  SET_USER_AS_GUEST,
  SET_USER,
  LOGOUT_USER,
  SET_AUTHENTICATED,
} from "../constants/userConstants";
import { ref, set, get, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import Cookies from "js-cookie";
import { faker } from "@faker-js/faker";

export const registerUser =
  (username, password, avatar) => async (dispatch) => {
    try {
      const email = `${username}@customgeoguessr.com`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await saveIdTokenToCookies(user);

      const userData = {
        userId: user.uid,
        username,
        avatar,
        isGuest: false,
      };

      await set(ref(database, `users/${user.uid}`), userData);

      dispatch({
        type: SET_USER,
        payload: userData,
      });

      dispatch({
        type: SET_AUTHENTICATED,
        payload: true,
      });
    } catch (error) {
      if (error.code === "auth/weak-password") {
        throw new Error("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("Username already exists");
      } else {
        throw new Error("Error registering user");
      }
    }
  };

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const email = `${username}@customgeoguessr.com`;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await saveIdTokenToCookies(user);

    const userRef = ref(database, `users/${user.uid}`);
    const userSnapshot = await get(userRef);
    const avatar = userSnapshot.val().avatar;

    const userData = {
      userId: user.uid,
      username,
      avatar,
      isGuest: false,
    };

    dispatch({
      type: SET_USER,
      payload: userData,
    });

    dispatch({
      type: SET_AUTHENTICATED,
      payload: true,
    });
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const signInAsGuest = (avatar) => async (dispatch) => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await saveIdTokenToCookies(user);

    const username = faker.internet.userName();

    const userData = {
      userId: user.uid,
      username,
      avatar,
      isGuest: true,
    };

    await set(ref(database, `users/${user.uid}`), userData);

    dispatch({
      type: SET_USER_AS_GUEST,
      payload: userData,
    });

    dispatch({
      type: SET_AUTHENTICATED,
      payload: true,
    });
  } catch (error) {
    console.error("Error signing in as guest:", error);
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    if (user.isGuest) {
      await remove(ref(database, `users/${user.userId}`));
      await auth.currentUser.delete();
    }
    await auth.signOut();
    Cookies.remove("idToken");

    dispatch({
      type: LOGOUT_USER,
    });

    dispatch({
      type: SET_AUTHENTICATED,
      payload: false,
    });
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};
