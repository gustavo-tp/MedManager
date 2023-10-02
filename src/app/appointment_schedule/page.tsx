'use client'

import { AppointmentCard } from '@/components/AppointmentCard'
import { AppointmentModal } from '@/components/AppointmentModal'
import { FormData } from '@/components/AppointmentModal/AppointmentModalForm'
import CustomDayPicker from '@/components/CustomDayPicker'
import { DoctorCard } from '@/components/DoctorCard'
import DoctorsList from '@/components/DoctorsList'
import getDoctorsService from '@/services/getDoctorsService'
import getSchedulesService from '@/services/getSchedulesService'
import saveAppointmentService from '@/services/saveAppointmentService'
import debounce from '@/utils/debounce'
import { format } from 'date-fns'
import { ClipboardEdit, Eye, Search, Trash2 } from 'lucide-react'
import { Fragment, useEffect, useMemo, useState } from 'react'

const schedule = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

export default function AppointmentSchedule() {
  const doctors = getDoctorsService()

  function isNumber(number: number | undefined) {
    return typeof number === 'number'
  }

  function onSelectedDoctor(index: number | undefined) {
    const selectedIndex = index === selectedDoctorIndex ? undefined : index
    setSelectedDoctorIndex(selectedIndex)
  }

  function onSelectedAppointmentDoctor(index: number | undefined) {
    const doctorsIndexThaHaveAnAppointment =
      currentAction === 'edit'
        ? currentAppointments
            .filter(
              (appointment) =>
                appointment.doctorIndex !== editAppointmentDoctorIndex,
            )
            .map((appointment) => appointment.doctorIndex)
        : currentAppointments.map((appointment) => appointment.doctorIndex)
    const doctorHasAnAppointment =
      doctorsIndexThaHaveAnAppointment.includes(index)

    const selectedIndex =
      index === selectedAppointmentDoctorIndex || doctorHasAnAppointment
        ? undefined
        : index
    setSelectedAppointmentDoctorIndex(selectedIndex)
  }

  const [schedules, setSchedules] = useState(getSchedulesService())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number>()
  const [selectedAppointmentTime, setSelectedAppointmentTime] =
    useState<string>('')
  const [selectedAppointmentDoctorIndex, setSelectedAppointmentDoctorIndex] =
    useState<number>()
  const [editAppointmentDoctorIndex, setEditSelectedAppointmentDoctorIndex] =
    useState<number>()
  const [patientFilters, setPatientFilters] = useState('')
  const [currentAction, setCurrentAction] = useState<
    'add' | 'edit' | 'delete' | 'view'
  >('add')

  const selectedStringDate = useMemo(
    () => format(selectedDate || new Date(), 'yyyy-MM-dd'),
    [selectedDate],
  )

  const selectedDateSchedules = useMemo(
    () => schedules[selectedStringDate] || {},
    [schedules, selectedStringDate],
  )

  const currentAppointments = useMemo(() => {
    return selectedDateSchedules[selectedAppointmentTime] || []
  }, [selectedAppointmentTime, selectedDateSchedules])

  const filteredSchedule = useMemo(() => {
    let filtered = schedule

    if (isNumber(selectedDoctorIndex)) {
      filtered = Object.keys(selectedDateSchedules).filter((time) => {
        const appointments = selectedDateSchedules[time] || []
        return appointments.some(
          (appointment) => appointment.doctorIndex === selectedDoctorIndex,
        )
      })
    }

    function clearSearchString(searchString: string) {
      return searchString.trim().toLocaleLowerCase().replace(/[.-]/g, '')
    }

    if (patientFilters.length > 0) {
      const filters = clearSearchString(patientFilters).split(' ')

      filtered = Object.keys(selectedDateSchedules).filter((time) => {
        const appointments = selectedDateSchedules[time] || []
        return appointments.some((appointment) =>
          filters.some((filter) => {
            return (
              clearSearchString(appointment.patient.fullName).includes(
                filter,
              ) ||
              clearSearchString(appointment.patient.document).includes(filter)
            )
          }),
        )
      })
    }

    return filtered
  }, [patientFilters, selectedDateSchedules, selectedDoctorIndex])

  useEffect(() => {
    const isDisabled = currentAction === 'view'
    document
      .querySelectorAll<HTMLInputElement>('form input')
      .forEach((input) => {
        input.disabled = isDisabled
      })
    document
      .querySelectorAll<HTMLSelectElement>('form select')
      .forEach((select) => {
        select.disabled = isDisabled
      })
    document
      .querySelectorAll<HTMLSelectElement>('.modal button')
      .forEach((button) => {
        button.disabled = isDisabled
      })
  }, [currentAction])

  function handleSaveAppointment(formData: FormData) {
    const updatedSchedules = saveAppointmentService({
      appointmentTime: selectedAppointmentTime,
      doctorIndex: selectedAppointmentDoctorIndex,
      appointmentDate: selectedStringDate,
      ...formData,
    })

    setSelectedAppointmentDoctorIndex(undefined)
    setSchedules(updatedSchedules)
  }

  const handlePatientSearch = debounce(setPatientFilters)

  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <h2>Agendamento de Consulta</h2>
      </div>

      <div className="col-md-8 d-flex flex-column gap-3">
        <div className="input-group">
          <div className="input-group-text">
            <Search size={16} />
          </div>
          <input
            className="form-control"
            placeholder="Filtre por nome ou documento do paciente..."
            onChange={(event) => handlePatientSearch(event.target.value)}
          />
        </div>
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((time, index) => {
            const appointments = selectedDateSchedules[time] || []
            const appointmentTimeIsAfterNow =
              new Date(`${selectedStringDate} ${time}`) > new Date()
            return (
              <AppointmentCard.Root key={index}>
                <AppointmentCard.Content time={time}>
                  {appointments.length > 0 ? (
                    <Fragment>
                      <div className="d-flex flex-grow-1 flex-wrap gap-4">
                        {appointments.map((appointment, index) => {
                          const doctorIndex = appointment.doctorIndex
                          const doctorData = doctors[doctorIndex as number]

                          return (
                            <div key={index} className="d-flex gap-2">
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex">
                                  <DoctorCard.Data data={doctorData} />
                                </div>
                                <div className="d-flex">
                                  <span className="fs-7 fw-semibold me-1">
                                    Paciente:
                                  </span>
                                  <span className="fs-7 fw-normal">
                                    {appointment.patient.fullName}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex flex-column g-1">
                                {appointmentTimeIsAfterNow ? (
                                  <Fragment>
                                    <button
                                      className="btn p-0 lh-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#appointmentModal"
                                      onClick={() => {
                                        const keyMap = {
                                          fullName:
                                            appointment.patient.fullName,
                                          document:
                                            appointment.patient.document,
                                          dateOfBirth:
                                            appointment.patient.dateOfBirth,
                                          phone: appointment.patient.phone,
                                          zip: appointment.patient.address.zip,
                                          street:
                                            appointment.patient.address.street,
                                          neighborhood:
                                            appointment.patient.address
                                              .neighborhood,
                                          city: appointment.patient.address
                                            .city,
                                          number:
                                            appointment.patient.address.number,
                                          state:
                                            appointment.patient.address.state,
                                          paymentMethod:
                                            appointment.paymentMethod,
                                        }

                                        Object.keys(keyMap).forEach((key) => {
                                          ;(
                                            document.getElementById(
                                              key,
                                            ) as HTMLInputElement
                                          ).value =
                                            keyMap[key as keyof typeof keyMap]
                                        })

                                        setSelectedAppointmentTime(time)
                                        setSelectedAppointmentDoctorIndex(
                                          doctorIndex,
                                        )
                                        setEditSelectedAppointmentDoctorIndex(
                                          doctorIndex,
                                        )
                                        if (currentAction !== 'edit')
                                          setCurrentAction('edit')
                                      }}
                                    >
                                      <ClipboardEdit size={16} />
                                    </button>
                                    <button className="btn p-0 lh-1">
                                      <Trash2 size={16} />
                                    </button>
                                  </Fragment>
                                ) : (
                                  <button
                                    className="btn p-0 lh-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#appointmentModal"
                                    onClick={() => {
                                      const keyMap = {
                                        fullName: appointment.patient.fullName,
                                        document: appointment.patient.document,
                                        dateOfBirth:
                                          appointment.patient.dateOfBirth,
                                        phone: appointment.patient.phone,
                                        zip: appointment.patient.address.zip,
                                        street:
                                          appointment.patient.address.street,
                                        neighborhood:
                                          appointment.patient.address
                                            .neighborhood,
                                        city: appointment.patient.address.city,
                                        number:
                                          appointment.patient.address.number,
                                        state:
                                          appointment.patient.address.state,
                                        paymentMethod:
                                          appointment.paymentMethod,
                                      }

                                      Object.keys(keyMap).forEach((key) => {
                                        ;(
                                          document.getElementById(
                                            key,
                                          ) as HTMLInputElement
                                        ).value =
                                          keyMap[key as keyof typeof keyMap]
                                      })

                                      if (currentAction !== 'view')
                                        setCurrentAction('view')
                                      setSelectedAppointmentTime(time)
                                      setSelectedAppointmentDoctorIndex(
                                        doctorIndex,
                                      )
                                    }}
                                  >
                                    <Eye size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <span className="me-4 d-flex flex-grow-1">
                        Horário disponível
                      </span>
                    </Fragment>
                  )}
                  {doctors.length > appointments.length &&
                    appointmentTimeIsAfterNow && (
                      <AppointmentCard.Actions
                        onAddAppointment={() => {
                          if (currentAction !== 'add') setCurrentAction('add')
                          setSelectedAppointmentTime(time)
                        }}
                        modalId="#appointmentModal"
                      />
                    )}
                </AppointmentCard.Content>
              </AppointmentCard.Root>
            )
          })
        ) : (
          <div className="alert alert-info" role="alert">
            Nenhum horário agendado com{' '}
            {selectedDoctorIndex !== undefined
              ? doctors[selectedDoctorIndex].name
              : 'esse paciente'}
            !
          </div>
        )}
      </div>
      <div className="col-md-4">
        <CustomDayPicker
          selectedDate={selectedDate}
          onSelected={setSelectedDate}
        />
        <DoctorsList
          doctors={doctors}
          selectedDoctorIndex={selectedDoctorIndex}
          onSelected={onSelectedDoctor}
        />
      </div>
      <AppointmentModal.Root>
        <AppointmentModal.Body>
          <div className="mb-3 row">
            <label
              htmlFor="appointmentTime"
              className="col-md-3 col-form-label"
            >
              Horário da consulta:
            </label>
            <div className="col-md-3">
              <input
                type="time"
                readOnly
                className="form-control"
                id="appointmentTime"
                name="appointmentTime"
                value={selectedAppointmentTime}
              />
            </div>
          </div>
          <div className="row mb-3">
            <span className="col-md-12 col-form-label mb-2">
              Selecione o médico:
            </span>
            <div className="col-md-12">
              <DoctorsList
                doctors={doctors}
                selectedDoctorIndex={selectedAppointmentDoctorIndex}
                onSelected={onSelectedAppointmentDoctor}
                rowView
              />
            </div>
          </div>
          <AppointmentModal.Form onFormSave={handleSaveAppointment} />
        </AppointmentModal.Body>
      </AppointmentModal.Root>
    </div>
  )
}
