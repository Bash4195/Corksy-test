import { useState } from "react";
import Image from "next/image"

import PageHeader from "@/components/ui/PageHeader";

import CreditCardImg from "@/../public/img/pages/home/credit_card.svg"
import Button from "@/components/ui/Button";

type PaymentMethods = {
  id: string
  isPrimary: boolean
  card: {
    number: number,
    expirationDate: number
    cvv: number
  }
  billingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: number
    dateOfBirth: number
    address: string
    address2?: string
    city: string
    state: string
    country: string
    zipCode: number
  }
}

export default function Home() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([])

  return (
    <div>
      <PageHeader title="Payment Methods" />

      <div className="px-4 py-8">
        {paymentMethods.length > 0 ? (
          <p>show payment methods</p>
        ) : (
          <div className="flex flex-col items-center gap-4 md:gap-8 px-4 py-16">
            <Image
              src={CreditCardImg}
              alt="The front and back of a credit card."
              className="w-64 lg:w-80"
            />

            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center">
              No payment methods have been added.
            </h2>

            {/* TODO */}
            <Button onClick={() => console.log('click')}>
              Add a payment method
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
