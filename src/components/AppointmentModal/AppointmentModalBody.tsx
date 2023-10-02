import { ReactNode } from 'react'

interface AppointmentModalBodyProps {
  children: ReactNode
}

export default function AppointmentModalBody({
  children,
}: AppointmentModalBodyProps) {
  return <div className="modal-body">{children}</div>
}
