'use client'

import getDoctorsService from '@/services/getDoctorsService'
import { ReactNode, useEffect } from 'react'

const doctors = getDoctorsService()

interface AppointmentModalRootProps {
  children: ReactNode
}

export default function AppointmentModalRoot({
  children,
}: AppointmentModalRootProps) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return (
    <div className="modal fade" id="appointmentModal" tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Formulário de Agendamento</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children}
          <div className="modal-footer">
            <button
              id="appointmentModalCloseButton"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="submit"
              form="AppointmentForm"
              className="btn btn-primary"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
