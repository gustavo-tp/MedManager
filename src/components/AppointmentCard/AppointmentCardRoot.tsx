import { ReactNode } from 'react'

interface AppointmentCardRootProps {
  children: ReactNode
}

export default function AppointmentCardRoot({
  children,
}: AppointmentCardRootProps) {
  return (
    <div className="card shadow text-center">
      <div className="card-body">{children}</div>
    </div>
  )
}
