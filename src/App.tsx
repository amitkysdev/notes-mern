import { Route, Routes } from "react-router-dom";

import SignUpUI from "./pages/signUp/signUp";
import Page from "./pages/test";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";

export default function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpUI />} path="/signup" />
      <Route element={<IndexPage />} path="/" />
      <Route element={<Page />} path="/test" />
    </Routes>
  );
}
