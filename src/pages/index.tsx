import { useState } from "react";
import Image from "next/image"

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

import AddPaymentMethodModal from "@/components/pages/home/AddPaymentMethodModal";
import Card from "@/components/pages/home/Card";

import CreditCardImg from "@/../public/img/pages/home/credit_card.svg"

import { HiPlusCircle } from "react-icons/hi";

import type { PaymentMethod } from "@/PaymentMethod";

// TODO: Remove this
const tempPaymentMethods = [
  {
    id: 123,
    card: {
      type: 'Visa',
      number: 4111111111111111,
      expirationDate: 1228,
      cvv: 123
    },
    billingAddress: {
      firstName: "Brendan",
      lastName: "Strong",
      email: "test@test.test",
      phone: 1234567890,
      dateOfBirth: 12011999,
      address: "123 Random Rd.",
      address2: "321",
      city: "Toronto",
      state: "New York",
      country: "United States",
      zipCode: 10001
    }
  },
  {
    id: 456,
    card: {
      type: 'Mastercard',
      number: 5555555555554444,
      expirationDate: 1228,
      cvv: 123
    },
    billingAddress: {
      firstName: "Brendan",
      lastName: "Strong",
      email: "test@test.test",
      phone: 1234567890,
      dateOfBirth: 12011999,
      address: "123 Random Rd.",
      address2: "321",
      city: "Toronto",
      state: "New York",
      country: "United States",
      zipCode: 10001
    }
  },
  {
    id: 789,
    card: {
      type: null,
      number: 3566002020360505,
      expirationDate: 1228,
      cvv: 123
    },
    billingAddress: {
      firstName: "Brendan",
      lastName: "Strong",
      email: "test@test.test",
      phone: 1234567890,
      dateOfBirth: 12011999,
      address: "123 Random Rd.",
      address2: "321",
      city: "Toronto",
      state: "New York",
      country: "United States",
      zipCode: 10001
    }
  },
]

export default function Home() {
  // const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(tempPaymentMethods)
  const [primaryMethod, setPrimaryMethod] = useState<PaymentMethod["id"] | null>(null)
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)

  function addPaymentMethod(newCard: PaymentMethod, isPrimary: boolean) {
    setPaymentMethods([...paymentMethods, newCard])

    if(isPrimary) {
      setPrimaryMethod(newCard.id)
    }
  }

  // TODO: If primary is not selected, set one by default

  return (
    <div>
      <PageHeader title="Payment Methods" />

      <div className="px-4 py-8">
        {paymentMethods.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-md md:max-w-7xl mx-auto">
            {paymentMethods.map((card) => (
              <Card key={card.id} card={card} />
            ))}

            <button
              type="button"
              className="flex flex-col justify-center items-center gap-2 w-full h-60 outline-dashed outline-gray-400 text-gray-500 rounded-2xl"
              onClick={() => setShowAddPaymentModal(true)}
            >
              <HiPlusCircle size={32} />
              <h3 className="text-xl font-bold">Add payment method</h3>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 md:gap-8 py-16">
            <Image
              src={CreditCardImg}
              alt="The front and back of a credit card."
              className="w-64 lg:w-80"
            />

            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center">
              No payment methods available
            </h2>

            <Button
              btnType="primary"
              onClick={() => setShowAddPaymentModal(true)}
            >
              Add a payment method
            </Button>
          </div>
        )}
      </div>

      <AddPaymentMethodModal
        open={showAddPaymentModal}
        setOpen={setShowAddPaymentModal}
        addPaymentMethod={addPaymentMethod}
      />
    </div>
  )
}
