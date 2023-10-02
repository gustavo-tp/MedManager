'use client'

import getSchedulesService from '@/services/getSchedulesService'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const schedules = getSchedulesService()
  const labels = Object.keys(schedules)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Número de consultas diárias',
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Consultas',
        data: labels.map((date) =>
          Object.values(schedules[date]).reduce(
            (sum, appointments) => sum + appointments.length,
            0,
          ),
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="row">
          <div className="col-md-12 mb-3">
            <h1 className="h2">Dashboard</h1>
          </div>
          <div className="col-md-12">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
