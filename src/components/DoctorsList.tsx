import { useMemo, useState } from 'react'
import { DoctorCard } from './DoctorCard'
import { Search } from 'lucide-react'
import debounce from '@/utils/debounce'

interface Doctor {
  name: string
  occupation: string
  profilePic: string
}

interface DoctorsListProps {
  doctors: Doctor[]
  selectedDoctorIndex: number | undefined
  onSelected: (index: number | undefined) => void
  rowView?: boolean
}

export default function DoctorsList({
  doctors,
  selectedDoctorIndex,
  onSelected,
  rowView = false,
}: DoctorsListProps) {
  const [search, setSearch] = useState('')

  const filteredDoctors = useMemo(() => {
    if (search) {
      return doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return doctors
  }, [search, doctors])

  const handleDoctorSearch = debounce(setSearch)

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-text">
          <Search size={16} />
        </div>
        <input
          className="form-control"
          list="doctorsOptions"
          placeholder="Digite o nome do médico..."
          onChange={(event) => handleDoctorSearch(event.target.value)}
        />
      </div>
      <datalist id="doctorsOptions">
        {doctors.map((doctor, index) => (
          <option key={index} value={doctor.name} />
        ))}
      </datalist>
      <div
        className={
          rowView
            ? 'd-flex flex-row flex-wrap justify-content-center gap-2'
            : 'd-flex flex-column gap-2'
        }
      >
        {filteredDoctors.map((doctor, index) => (
          <DoctorCard.Root
            key={index}
            onSelected={() => onSelected(index)}
            className={selectedDoctorIndex === index ? 'border-primary' : ''}
          >
            <DoctorCard.Data data={doctor} />
          </DoctorCard.Root>
        ))}
      </div>
    </div>
  )
}
