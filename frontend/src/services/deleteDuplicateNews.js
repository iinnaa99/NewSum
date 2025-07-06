import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // firebase 설정 경로에 맞게 조정하세요

const deleteDuplicateNews = async () => {
  const seen = new Set();
  const snapshot = await getDocs(collection(db, "news"));

  for (const document of snapshot.docs) {
    const title = document.data().title;
    if (seen.has(title)) {
      await deleteDoc(doc(db, "news", document.id));
      console.log("❌ 중복 삭제:", title);
    } else {
      seen.add(title);
    }
  }

  console.log("✅ 중복 뉴스 삭제 완료");
};

export default deleteDuplicateNews;
