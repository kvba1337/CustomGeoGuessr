import { ref, get, set, update, remove } from "firebase/database";
import { database } from "@services/firebaseConfig";

export const fetchData = async (path) => {
  const dataRef = ref(database, path);
  const snapshot = await get(dataRef);
  return snapshot.val();
};

export const saveData = async (path, data) => {
  const dataRef = ref(database, path);
  await set(dataRef, data);
};

export const updateData = async (path, data) => {
  const dataRef = ref(database, path);
  await update(dataRef, data);
};

export const deleteData = async (path) => {
  const dataRef = ref(database, path);
  await remove(dataRef);
};
