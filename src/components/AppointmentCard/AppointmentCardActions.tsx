import { PlusCircle } from 'lucide-react'

interface AppointmentCardActionsProps {
  modalId: string
  onAddAppointment: () => void
}

export default function AppointmentCardActions({
  modalId,
  onAddAppointment,
}: AppointmentCardActionsProps) {
  return (
    <div className="d-flex align-self-end">
      <button
        className="btn p-0"
        data-bs-toggle="modal"
        data-bs-target={modalId}
        onClick={onAddAppointment}
      >
        <PlusCircle size={16} />
      </button>
    </div>
  )
}
