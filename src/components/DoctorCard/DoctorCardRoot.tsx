import { ButtonHTMLAttributes, ReactNode } from 'react'

interface DoctorCardRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSelected: () => void
  children: ReactNode
}

export default function DoctorCardRoot({
  onSelected,
  children,
  ...rest
}: DoctorCardRootProps) {
  return (
    <button
      {...rest}
      className={`doctor-button border rounded d-flex align-items-center py-2 btn ${rest.className}`}
      onClick={onSelected}
    >
      {children}
    </button>
  )
}
