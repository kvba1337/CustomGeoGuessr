import { ref, update } from "firebase/database";
import { database } from "@services/firebaseConfig";

export const updateUserStatus = async (roomId, userId, status) => {
  const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
  await update(userRef, { status });
};
