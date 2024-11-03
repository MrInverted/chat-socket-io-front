import React from "react"

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="min-h-full flex flex-col justify-center">
      <div className="max-w-screen-sm w-full mx-auto py-10 px-5">
        {children}
      </div>
    </div>
  )
}

export default Layout;