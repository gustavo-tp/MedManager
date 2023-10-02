import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Bell, UserCircle } from 'lucide-react'
import Menu from '@/components/Menu'

export const metadata: Metadata = {
  title: 'Gerenciador de Consultas Médicas',
  description: 'Gerencie suas consultas médicas',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <header
          className="navbar sticky-top bg-dark flex-md-nowrap py-1 shadow"
          data-bs-theme="dark"
        >
          <Link
            className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
            href="/"
          >
            MedManager
          </Link>

          <ul className="navbar-nav flex-row">
            <li className="nav-item text-nowrap">
              <button className="nav-link px-3 text-white" type="button">
                <UserCircle size={20} />
              </button>
            </li>
            <li className="nav-item text-nowrap">
              <button className="nav-link px-3 text-white" type="button">
                <Bell size={20} />
              </button>
            </li>
          </ul>
        </header>

        <div className="container-fluid">
          <div className="row">
            <Menu />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-3">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
