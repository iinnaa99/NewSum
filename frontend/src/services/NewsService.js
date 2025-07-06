import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getNewsList = async () => {
  const querySnapshot = await getDocs(collection(db, "news"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
