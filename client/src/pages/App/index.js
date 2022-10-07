import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";

import { ProtectedRoute } from "../../utils/route";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import ProtectedPage from "../ProtectedPage";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    async function run() {
      await refreshAuth();
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="header">
        <p>MERN Skeleton</p> <NavBar />
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
