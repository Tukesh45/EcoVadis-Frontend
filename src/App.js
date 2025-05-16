// App.js
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Questions from "./Questions";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  // Listen for auth state changes to persist login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({ id: firebaseUser.uid, prefix: "default" });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return <div>{!user ? <Login onLogin={setUser} /> : <Questions user={user} />}</div>;
}

export default App;
