import React, { useEffect } from "react";
import Home from "./pages/Home";
import seedNewsData from "./services/initFirestore"; // ✅ 추가
import seedNewsList from "./services/seedNewsList";

function App() {
  useEffect(() => {
    // ✅ 실행은 딱 한 번!
    //seedNewsList();
    //deleteDuplicateNews();
  }, []);

  return <Home />;
}

export default App;
