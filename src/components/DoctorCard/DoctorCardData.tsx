import { Fragment } from 'react'
import Image from 'next/image'

interface DoctorCardDataProps {
  data: {
    name: string
    occupation: string
    profilePic: string
  }
}

export default function DoctorCardData({ data }: DoctorCardDataProps) {
  return (
    <Fragment>
      <div className="me-3">
        <Image
          src={'/avatars/' + data.profilePic}
          alt="me"
          width="48"
          height="48"
          style={{ borderRadius: '50%' }}
        />
      </div>

      <div className="d-flex justify-content-start flex-column">
        <h6 className="fw-bold text-hover-primary mb-1 fs-6 text-start">
          {data.name}
        </h6>
        <span className="text-secondary fw-normal d-block fs-7 text-start">
          {data.occupation}
        </span>
      </div>
    </Fragment>
  )
}
