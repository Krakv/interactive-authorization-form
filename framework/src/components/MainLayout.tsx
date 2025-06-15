import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="body">
    <header>
      <img
        src="images/Krakv.jpg"
        className="header-logo"
        height="70px"
        title="Лого"
        alt="Logo"
      />
    </header>
    <main>
      <article className="v-main">{children}</article>
    </main>
    <footer>
      <a href="https://github.com/Krakv" style={{ fontWeight: 'bold' }}>
        Автор
      </a>
    </footer>
  </div>
)
