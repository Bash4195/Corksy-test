import Modal from "@/components/ui/Modal";
import { SubmitHandler, useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid"

import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";
import Checkbox from "@/components/ui/form/Checkbox";

import { getCardType } from "@/helpers/getCardType";

import type { PaymentMethod } from "@/PaymentMethod";

type Inputs = {
  isPrimary: boolean
  cardNumber: PaymentMethod["card"]["number"]
  expirationDate: PaymentMethod["card"]["expirationDate"]
  cvv: PaymentMethod["card"]["cvv"]
  firstName: PaymentMethod["billingAddress"]["firstName"]
  lastName: PaymentMethod["billingAddress"]["lastName"]
  email: PaymentMethod["billingAddress"]["email"]
  phone: PaymentMethod["billingAddress"]["phone"]
  dateOfBirth: PaymentMethod["billingAddress"]["dateOfBirth"]
  address: PaymentMethod["billingAddress"]["address"]
  address2: PaymentMethod["billingAddress"]["address2"]
  city: PaymentMethod["billingAddress"]["city"]
  state: PaymentMethod["billingAddress"]["state"]
  country: PaymentMethod["billingAddress"]["country"]
  zipCode: PaymentMethod["billingAddress"]["zipCode"]
}

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  addPaymentMethod: (newCard: PaymentMethod, isPrimary: boolean) => void
}
export default function AddPaymentMethodModal({ open, setOpen, addPaymentMethod }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>()

  // TODO
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newCard = {
      id: uuidv4(),
      card: {
        type: getCardType(data.cardNumber.toString()),
        number: data.cardNumber,
        expirationDate: data.expirationDate,
        cvv: data.cvv
      },
      billingAddress: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        address2: data.address2,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      }
    }

    addPaymentMethod(newCard, data.isPrimary)
  }

  return (
    <Modal
      title="Add a payment method"
      description="We accept debit and credit cards from VISA or Mastercard."
      open={open}
      setOpen={setOpen}
    >
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input
              label="Card Number"
              type="text"
              maxLength="19" // 16 digits + 3 spaces
              field={
                register('cardNumber', {
                  required: "Card number is required.",
                  onChange: (e) => {
                    let { value } = e.target;
                    value = value.replace(/\D/g, ''); // Remove non-digits
                    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space every 4 digits
                    setValue('cardNumber', value)
                  },
                })
              }
              errors={errors}
              wrapperClass="sm:col-span-2"
            />

            <Input
              label="Expiration Date (MM/YY)"
              type="text"
              field={{
                ...register('expirationDate', {
                  required: "Expiration date is required.",
                  onChange: (e) => {
                    let { value } = e.target;

                    // Allow only numbers and remove non-digits
                    value = value.replace(/\D/g, '');

                    // Formatting for MM/YY
                    if(value.length <= 2) {
                      value = value.replace(/(\d{2})/, '$1/');
                    } else {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }

                    setValue('expirationDate', value)
                  }
                })
              }}
              errors={errors}
            />

            <Input
              label="CVV"
              type="text"
              field={{
                ...register('cvv', {
                  required: "CVV number is required.",
                  onChange: (e) => {
                    let { value } = e.target
                    value = value.replace(/\D/g, ''); // Remove non-digits
                    setValue('cvv', value.slice(0, 4))
                  }
                })
              }}
              errors={errors}
            />
          </div>

          <div className="mt-4">
            <Checkbox
              label="Set as primary payment method"
              field={{...register('isPrimary')}}
              errors={errors}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Billing address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
              <Input
                label="First Name"
                type="text"
                field={{
                  ...register('firstName', {
                    required: "First name is required."
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Input
                label="Last Name"
                type="text"
                field={{
                  ...register('lastName', {
                    required: "Last name is required."
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Input
                label="Email"
                type="text"
                field={{
                  ...register('email', {
                    required: "Email is required.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email (example@gmail.com)"
                    }
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-6"
              />

              <Input
                label="Phone"
                type="text"
                field={{
                  ...register('phone', {
                    required: "Phone number is required.",
                    pattern: {
                      value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      message: "Please enter a valid phone number (123-456-7890)"
                    }
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Input
                label="Date of birth (MM/DD/YYYY)"
                type="text"
                field={{
                  ...register('dateOfBirth', {
                    required: "Date of birth is required.",
                    onChange: (e) => {
                      let { value } = e.target;

                      // Remove all non-digits
                      value = value.replace(/\D/g, '');

                      // Add slashes after month and day
                      if (value.length <= 2) {
                        // Month part
                        value = value.replace(/^(\d{2})/, '$1/');
                      } else if (value.length <= 4) {
                        // Day part
                        value = value.slice(0, 2) + '/' + value.slice(2).replace(/^(\d{2})/, '$1/');
                      } else {
                        // Year part
                        value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
                      }

                      setValue('dateOfBirth', value)
                    }
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Input
                label="Address"
                type="text"
                field={{
                  ...register('address', {
                    required: "Street address is required."
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-6"
              />

              <Input
                label="Apartment/Suite (Optional)"
                type="text"
                field={{
                  ...register('address2')
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Input
                label="City"
                type="text"
                field={{
                  ...register('city', {
                    required: "City is required."
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-3"
              />

              <Select
                label="State"
                type="text"
                field={{
                  ...register('state', {
                    required: "State is required."
                  })
                }}
                options={[
                  { label: 'Alabama', value: 'alabama' },
                  { label: 'Alaska', value: 'alaska' },
                  { label: 'Arizona', value: 'arizona' },
                  { label: 'Arkansas', value: 'arkansas' },
                  { label: 'California', value: 'california' },
                  { label: 'Colorado', value: 'colorado' },
                  { label: 'Connecticut', value: 'connecticut' },
                  { label: 'Delaware', value: 'delaware' },
                  { label: 'District of Columbia', value: 'district of columbia' },
                  { label: 'Florida', value: 'florida' },
                  { label: 'Georgia', value: 'georgia' },
                  { label: 'Hawaii', value: 'hawaii' },
                  { label: 'Idaho', value: 'idaho' },
                  { label: 'Illinois', value: 'illinois' },
                  { label: 'Indiana', value: 'indiana' },
                  { label: 'Iowa', value: 'iowa' },
                  { label: 'Kansas', value: 'kansas' },
                  { label: 'Kentucky', value: 'kentucky' },
                  { label: 'Louisiana', value: 'louisiana' },
                  { label: 'Maine', value: 'maine' },
                  { label: 'Maryland', value: 'maryland' },
                  { label: 'Massachusetts', value: 'massachusetts' },
                  { label: 'Michigan', value: 'michigan' },
                  { label: 'Minnesota', value: 'minnesota' },
                  { label: 'Mississippi', value: 'mississippi' },
                  { label: 'Missouri', value: 'missouri' },
                  { label: 'Montana', value: 'montana' },
                  { label: 'Nebraska', value: 'nebraska' },
                  { label: 'Nevada', value: 'nevada' },
                  { label: 'New Hampshire', value: 'new hampshire' },
                  { label: 'New Jersey', value: 'new jersey' },
                  { label: 'New Mexico', value: 'new mexico' },
                  { label: 'New York', value: 'new york' },
                  { label: 'North Carolina', value: 'north carolina' },
                  { label: 'North Dakota', value: 'north dakota' },
                  { label: 'Ohio', value: 'ohio' },
                  { label: 'Oklahoma', value: 'oklahoma' },
                  { label: 'Oregon', value: 'oregon' },
                  { label: 'Pennsylvania', value: 'pennsylvania' },
                  { label: 'Rhode Island', value: 'rhode island' },
                  { label: 'South Carolina', value: 'south carolina' },
                  { label: 'South Dakota', value: 'south dakota' },
                  { label: 'Tennessee', value: 'tennessee' },
                  { label: 'Texas', value: 'texas' },
                  { label: 'Utah', value: 'utah' },
                  { label: 'Vermont', value: 'vermont' },
                  { label: 'Virginia', value: 'virginia' },
                  { label: 'Washington', value: 'washington' },
                  { label: 'West Virginia', value: 'west virginia' },
                  { label: 'Wisconsin', value: 'wisconsin' },
                  { label: 'Wyoming', value: 'wyoming' },
                ]}
                errors={errors}
                wrapperClass="sm:col-span-2"
              />

              <Select
                label="Country"
                type="text"
                field={{
                  ...register('country', {
                    required: "Country is required."
                  })
                }}
                options={[
                  { label: 'United States', value: 'united states' }
                ]}
                defaultOption="united states"
                errors={errors}
                wrapperClass="sm:col-span-2"
              />

              <Input
                label="Zip Code"
                type="text"
                field={{
                  ...register('zipCode', {
                    required: "Zip Code is required.",
                    onChange: (e) => {
                      let { value } = e.target
                      value = value.replace(/\D/g, ''); // Remove non-digits
                      setValue('zipCode', value.slice(0, 5))
                    }
                  })
                }}
                errors={errors}
                wrapperClass="sm:col-span-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row-reverse pt-4 border-t border-gray-200 mt-4">
            <Button
              type="submit"
              btnType="primary"
              className="w-full"
            >
              Save card
            </Button>

            <Button
              type="button"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </>
    </Modal>
  )
}