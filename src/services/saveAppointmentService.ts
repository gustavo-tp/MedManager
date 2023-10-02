import getSchedulesService, { appointment } from './getSchedulesService'

const schedules = getSchedulesService()

interface AppointmentData {
  appointmentTime: string
  appointmentDate: string
  paymentMethod: 'Pix' | 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito'
  state: string
  number: string
  city: string
  neighborhood: string
  street: string
  zip: string
  phone: string
  dateOfBirth: string
  document: string
  fullName: string
  doctorIndex: number | undefined
}

export default function saveAppointmentService({
  appointmentDate,
  appointmentTime,
  doctorIndex,
  paymentMethod,
  fullName,
  document,
  dateOfBirth,
  phone,
  zip,
  street,
  number,
  city,
  neighborhood,
  state,
}: AppointmentData) {
  if (!schedules[appointmentDate]) {
    schedules[appointmentDate] = {}
  }

  const appointmentOnThisTime =
    schedules[appointmentDate][appointmentTime] || []

  const appointment: appointment = {
    doctorIndex,
    paymentMethod,
    patient: {
      fullName,
      document,
      dateOfBirth,
      phone,
      address: {
        zip,
        street,
        number,
        city,
        neighborhood,
        state,
      },
    },
  }

  schedules[appointmentDate][appointmentTime] = [
    ...appointmentOnThisTime,
    appointment,
  ]

  return schedules
}
