import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { Wrapper } from "./components/Wrapper";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";

import { supabase } from "./supabase";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, signIn } = useContext(AuthContext);

  const isLoggedIn = user !== null;

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        signIn(data.user);
      }
    }
    getUser();
  }, [signIn]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {isLoggedIn && (
        <>
          <Route
            path="/home"
            element={
              <Wrapper>
                <Home />
              </Wrapper>
            }
          />

          <Route
            path="/profile"
            element={
              <Wrapper>
                <Profile />
              </Wrapper>
            }
          />

          <Route
            path="/chat"
            element={
              <Wrapper>
                <Chat />
              </Wrapper>
            }
          />
          <Route
            path="/faq"
            element={
              <Wrapper>
                <Faq />
              </Wrapper>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;
