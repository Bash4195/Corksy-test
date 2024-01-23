import { useState } from "react";
import Image from "next/image"

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

import AddPaymentMethodModal from "@/components/pages/home/AddPaymentMethodModal";

import CreditCardImg from "@/../public/img/pages/home/credit_card.svg"

import type { PaymentMethod } from "@/PaymentMethod";

export default function Home() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [primaryMethod, setPrimaryMethod] = useState<PaymentMethod["id"] | null>(null)
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(true) // TODO: Change to false

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
          <p>show payment methods</p>
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

            {/* TODO */}
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
