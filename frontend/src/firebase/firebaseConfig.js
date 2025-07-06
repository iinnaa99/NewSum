// 🔥 Firebase 초기 설정
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 설정 그대로 복사
const firebaseConfig = {
  apiKey: "AIzaSyAfzYAOPBakT76Cd-a-oYA0eVV5Jf5jMYw",
  authDomain: "newsum-762cc.firebaseapp.com",
  projectId: "newsum-762cc",
  storageBucket: "newsum-762cc.firebasestorage.app",
  messagingSenderId: "350048205454",
  appId: "1:350048205454:web:727d8ed7263bfdbfd6a7df",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore 연결

export { db };
