'use client'

import { CalendarPlus, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu() {
  const pathname = usePathname()

  return (
    <div className="sidebar col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${
                pathname === '/' ? 'active' : 'link-body-emphasis'
              }`}
              aria-current="page"
              href="/"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${
                pathname === '/appointment_schedule'
                  ? 'active'
                  : 'link-body-emphasis'
              }`}
              href="/appointment_schedule"
            >
              <CalendarPlus size={16} />
              Agendamentos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
