import {
  registerUser,
  loginUser,
  loginAnonymously,
  logoutUser,
} from "@redux/api/authApi";
import { ref, set, get, remove } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";
import { faker } from "@faker-js/faker";
import {
  SET_USER_AS_GUEST,
  SET_USER,
  LOGOUT_USER,
  SET_AUTHENTICATED,
} from "../constants/userConstants";

export const registerNewUser =
  (username, password, avatar) => async (dispatch) => {
    try {
      const email = `${username}@customgeoguessr.com`;
      const user = await registerUser(email, password);

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
      throw new Error("Error registering user");
    }
  };

export const loginExistingUser = (username, password) => async (dispatch) => {
  try {
    const email = `${username}@customgeoguessr.com`;
    const user = await loginUser(email, password);

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
    const user = await loginAnonymously();

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

export const logoutCurrentUser = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    if (user.isGuest) {
      await remove(ref(database, `users/${user.userId}`));
      await auth.currentUser.delete();
    }
    await logoutUser();

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
