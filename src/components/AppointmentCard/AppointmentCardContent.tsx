import { ReactNode } from 'react'

interface AppointmentCardContentProps {
  time: string
  children: ReactNode
}

export default function AppointmentCardContent({
  time,
  children,
}: AppointmentCardContentProps) {
  return (
    <div className="d-flex align-items-center">
      <time className="me-4" dateTime={time}>
        {time}
      </time>
      {children}
    </div>
  )
}
