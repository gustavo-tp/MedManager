import getBrazilianStatesService from '@/services/getBrazilianStatesService'
import { FormEvent } from 'react'
import { IMaskInput } from 'react-imask'

const states = getBrazilianStatesService()
const paymentMethods = [
  'Pix',
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
]

export interface FormData {
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
}

interface AppointmentModalFormProps {
  onFormSave: (formaData: FormData) => void
}

export default function AppointmentModalForm({
  onFormSave,
}: AppointmentModalFormProps) {
  function handleFormSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement

    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
      const formData = new FormData(form)
      const formDataEntries = formData.entries()

      const appointmentData = Array.from(formDataEntries).reduce(
        (data, [key, value]) => ({ [key]: value, ...data }),
        {},
      ) as FormData

      document.getElementById('appointmentModalCloseButton')?.click()
      form.classList.remove('was-validated')
      form.reset()

      onFormSave(appointmentData)
    } else {
      form.classList.add('was-validated')
    }
  }

  function searchZipCode(zipCode: string) {
    const zipCodeWithoutFormatting = zipCode.replace('-', '')

    if (zipCodeWithoutFormatting.length < 8) return

    const url = `https://viacep.com.br/ws/${zipCodeWithoutFormatting}/json`

    fetch(url, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return alert('CEP não existe!')
        }

        const inputs = Array.from(
          document.forms[0].elements,
        ) as HTMLInputElement[]

        const keysMap: Record<string, string> = {
          street: 'logradouro',
          neighborhood: 'bairro',
          city: 'localidade',
          state: 'uf',
        }

        inputs.forEach((input) => {
          if (
            input.hasAttribute('name') &&
            Object.keys(keysMap).some((key) => key === input.name)
          ) {
            const viacepDataKey = keysMap[input.name]
            input.value = data[viacepDataKey]
          }
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <form
      id="AppointmentForm"
      className="row g-3 needs-validation"
      noValidate
      onSubmit={handleFormSubmit}
    >
      <div className="col-md-8">
        <label htmlFor="fullName" className="form-label">
          Nome completo
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          required
          minLength={3}
          onChange={() => null}
        />
        <div className="invalid-feedback">
          Por favor, insira um nome válido.
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="document" className="form-label">
          CPF
        </label>
        <IMaskInput
          mask="000.000.000-00"
          type="text"
          className="form-control"
          id="document"
          name="document"
          required
          onChange={() => null}
        />
        <div className="invalid-feedback">Por favor, insira um CPF válido.</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="dateOfBirth" className="form-label">
          Data de Nascimento
        </label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          required
          onChange={() => null}
        />
        <div className="invalid-feedback">
          Por favor, insira uma data de nascimento válida.
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="phone" className="form-label">
          Telefone
        </label>
        <IMaskInput
          mask="(00) 00000-0000"
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          required
        />
        <div className="invalid-feedback">
          Por favor, insira um telefone válido.
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="zip" className="form-label">
          CEP
        </label>
        <IMaskInput
          mask="00000-000"
          type="text"
          className="form-control"
          id="zip"
          name="zip"
          required
          onAccept={(value) => searchZipCode(value)}
        />
        <div className="invalid-feedback">Por favor, insira um CEP válido.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="street" className="form-label">
          Rua
        </label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          required
        />
        <div className="invalid-feedback">
          Por favor, insira uma rua válida.
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="neighborhood" className="form-label">
          Bairro
        </label>
        <input
          type="text"
          className="form-control"
          id="neighborhood"
          name="neighborhood"
          required
        />
        <div className="invalid-feedback">
          Por favor, insira um bairro válido.
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="city" className="form-label">
          Cidade
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          required
        />
        <div className="invalid-feedback">
          Por favor, insira uma cidade válida.
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="number" className="form-label">
          Número
        </label>
        <input
          type="text"
          className="form-control"
          id="number"
          name="number"
          required
        />
        <div className="invalid-feedback">
          Por favor, insira uma cidade válida.
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="state" className="form-label">
          Estado
        </label>
        <select
          className="form-select"
          id="state"
          name="state"
          defaultValue="select"
          required
        >
          <option disabled value="select">
            Selecione...
          </option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">
          Por favor, selecione um estado válido.
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="paymentMethod" className="form-label">
          Forma de Pagamento
        </label>
        <select
          className="form-select"
          id="paymentMethod"
          name="paymentMethod"
          defaultValue="select"
          required
        >
          <option disabled value="select">
            Selecione...
          </option>
          {paymentMethods.map((paymentMethod, index) => (
            <option key={index} value={paymentMethod}>
              {paymentMethod}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">
          Por favor, selecione uma forma de pagamento válida.
        </div>
      </div>
    </form>
  )
}
