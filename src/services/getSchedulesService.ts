import { format } from 'date-fns'

interface address {
  zip: string
  street: string
  neighborhood: string
  city: string
  number: string
  state: string
}

interface patient {
  fullName: string
  document: string
  dateOfBirth: string
  phone: string
  address: address
}

export interface appointment {
  doctorIndex: number | undefined
  patient: patient
  paymentMethod: 'Pix' | 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito'
}

interface schedules {
  [key: string]: {
    [key: string]: appointment[]
  }
}

export default function getSchedulesService(): schedules {
  const yesterday = new Date()
  const today = new Date()
  const tomorrow = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return {
    [format(yesterday, 'yyyy-MM-dd')]: {
      '11:30': [
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 2,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
      '13:30': [
        {
          doctorIndex: 1,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Pix',
        },
      ],
      '14:30': [
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 1,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
        {
          doctorIndex: 2,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
        {
          doctorIndex: 3,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
    },
    [format(today, 'yyyy-MM-dd')]: {
      '09:30': [
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 2,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
      '13:00': [
        {
          doctorIndex: 1,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Pix',
        },
      ],
      '14:00': [
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 1,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
        {
          doctorIndex: 2,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
        {
          doctorIndex: 3,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
    },
    [format(tomorrow, 'yyyy-MM-dd')]: {
      '08:00': [
        {
          doctorIndex: 3,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
      '13:30': [
        {
          doctorIndex: 1,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Pix',
        },
      ],
      '15:00': [
        {
          doctorIndex: 0,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Cartão de Crédito',
        },
        {
          doctorIndex: 2,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
        {
          doctorIndex: 3,
          patient: {
            fullName: 'Geraldo Pedroso',
            document: '526.250.700-05',
            dateOfBirth: '1998-05-26',
            phone: '(42) 99999-9999',
            address: {
              street: 'Rua José Loureiro',
              city: 'Curitiba',
              state: 'PR',
              zip: '80010-000 ',
              neighborhood: 'centro',
              number: '123',
            },
          },
          paymentMethod: 'Dinheiro',
        },
      ],
    },
  }
}
