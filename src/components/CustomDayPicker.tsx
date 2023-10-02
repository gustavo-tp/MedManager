import { ptBR } from 'date-fns/locale'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface CustomDayPickerProps {
  selectedDate: Date | undefined
  onSelected: SelectSingleEventHandler
}

export default function CustomDayPicker({
  selectedDate,
  onSelected,
}: CustomDayPickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      mode="single"
      selected={selectedDate}
      onSelect={onSelected}
    />
  )
}
