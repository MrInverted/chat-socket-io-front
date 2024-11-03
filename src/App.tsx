import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"

import Layout from "./layout/Layout"
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import { Spin } from "antd"
import { useAppAuth } from "./App.hook"



function App() {
  const { isLoading } = useAppAuth();

  console.log(import.meta.env.VITE_SERVER_URL)

  if (isLoading) return (<Layout>
    <div className="w-max mx-auto">
      <Spin size="large" />
    </div>
  </Layout>)

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<AuthPage type="register" title="Register" />} />
          <Route path="/login" element={<AuthPage type="login" title="Login" />} />
        </Routes>

        <Toaster position="bottom-right" />
      </Layout>
    </>
  )
}

export default App
