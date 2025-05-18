import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"

import Layout from "./layout/Layout"
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import { Spin } from "antd"
import { useAppAuth } from "./App.hook"



function App() {
  const { status } = useAppAuth();

  console.log(import.meta.env.VITE_SERVER_URL);

  if (status === "init" || status === "loading") return (
    <Layout>
      <div className="mx-auto w-max">
        <Spin size="large" />
      </div>
    </Layout>
  )

  return (
    <>
      <Layout>
        {status === "ok" && (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Navigate to='/' />} />
          </Routes>
        )}

        {status === "error" && (
          <Routes>
            <Route path="/register" element={<AuthPage type="register" title="Register" />} />
            <Route path="/login" element={<AuthPage type="login" title="Login" />} />

            <Route path="*" element={<Navigate to='/login' />} />
          </Routes>
        )}

        <Toaster position="bottom-right" />
      </Layout>
    </>
  )
}

export default App
