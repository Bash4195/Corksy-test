import { useEffect, useState } from "react";
import Image from "next/image"

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

import Card from "@/components/pages/home/Card";

import CreditCardImg from "@/../public/img/pages/home/credit_card.svg"

import { HiPlusCircle } from "react-icons/hi";

import type { PaymentMethod } from "@/PaymentMethod";
import PaymentMethodForm from "@/components/pages/home/PaymentMethodForm";
import Modal from "@/components/ui/Modal";

const samplePaymentMethods: PaymentMethod[] = [
  {
    id: "123",
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
      state: "new york",
      country: "united states",
      zipCode: 10001
    }
  },
  {
    id: "456",
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
      state: "new york",
      country: "united states",
      zipCode: 10001
    }
  },
  {
    id: "789",
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
      state: "new york",
      country: "united states",
      zipCode: 10001
    }
  },
]

export default function Home() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(samplePaymentMethods)
  const [primaryMethod, setPrimaryMethod] = useState<PaymentMethod["id"] | null>(null)

  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)

  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)
  const [selectedEditCard, setSelectedEditCard] = useState<PaymentMethod["id"] | null>(null)

  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false)
  const [selectedDeleteCard, setSelectedDeleteCard] = useState<PaymentMethod["id"] | null>(null)

  function addPaymentMethod(newCard: PaymentMethod, isPrimary: boolean) {
    setPaymentMethods([...paymentMethods, newCard])

    if(isPrimary) {
      setPrimaryMethod(newCard.id)
    }
  }

  function updatePaymentMethod(card: PaymentMethod, isPrimary: boolean) {
    const newPaymentMethods = paymentMethods.filter((currCard) => currCard.id !== card.id)
    newPaymentMethods.push(card)
    setPaymentMethods(newPaymentMethods)

    setSelectedEditCard(null)

    if(isPrimary) {
      updatePrimaryMethod(card.id)
    }
  }

  function deletePaymentMethod(cardId: PaymentMethod["id"]) {
    setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId))
  }

  useEffect(() => {
    if(paymentMethods.length > 0 && !primaryMethod) {
      setPrimaryMethod(paymentMethods[0].id)
    }
  }, [paymentMethods])

  function updatePrimaryMethod(cardId: PaymentMethod["id"]) {
    setPrimaryMethod(cardId)

    // Reorder payment methods so primary is always first
    const primaryCard = paymentMethods.filter((card) => card.id === cardId)[0]

    setPaymentMethods([primaryCard, ...paymentMethods.filter((card) => card.id !== cardId)])
  }

  return (
    <div>
      <PageHeader title="Payment Methods" />

      <div className="px-4 py-8">
        {paymentMethods.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-md md:max-w-7xl mx-auto">
            {paymentMethods.map((card) => (
              <Card
                key={card.id}
                card={card}
                isPrimary={card.id === primaryMethod}
                setPrimary={() => updatePrimaryMethod(card.id)}
                editCard={() => {
                  setSelectedEditCard(card.id)
                  setShowEditPaymentModal(true)
                }}
                deleteCard={() => {
                  setSelectedDeleteCard(card.id)
                  setShowDeletePaymentModal(true)
                }}
              />
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

      <Modal
        title="Add a payment method"
        description="We accept debit and credit cards from VISA or Mastercard."
        open={showAddPaymentModal}
        setOpen={setShowAddPaymentModal}
      >
        <PaymentMethodForm
          submitPaymentMethod={addPaymentMethod}
          setOpen={setShowAddPaymentModal}
        />
      </Modal>

      {selectedEditCard && (
        <Modal
          title="Edit payment method"
          description="We accept debit and credit cards from VISA or Mastercard."
          open={showEditPaymentModal}
          setOpen={setShowEditPaymentModal}
        >
          <PaymentMethodForm
            submitPaymentMethod={updatePaymentMethod}
            setOpen={setShowEditPaymentModal}
            card={paymentMethods.filter((card) => card.id === selectedEditCard)[0]}
            isPrimaryCard={selectedEditCard === primaryMethod}
          />
        </Modal>
      )}

      {selectedDeleteCard && (
        <Modal
          title="Are you sure you want to delete this payment method?"
          description="This action is permanent and cannot be reversed."
          open={showDeletePaymentModal}
          setOpen={setShowDeletePaymentModal}
        >
          <>
            <Card card={paymentMethods.filter((card) => card.id === selectedDeleteCard)[0]} isPrimary={selectedDeleteCard === primaryMethod} />

            <div className="flex flex-col gap-2 sm:flex-row-reverse pt-4 border-t border-gray-200 mt-4">
              <Button
                type="button"
                btnType="delete"
                className="w-full"
                onClick={() => {
                  deletePaymentMethod(selectedDeleteCard!)
                  setShowDeletePaymentModal(false)
                  setSelectedDeleteCard(null)
                }}
              >
                Delete card
              </Button>

              <Button
                type="button"
                className="w-full"
                onClick={() => setShowDeletePaymentModal(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        </Modal>
      )}
    </div>
  )
}
