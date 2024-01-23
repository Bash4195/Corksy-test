import Image from "next/image";

import VisaLogo from "../../../../public/img/pages/home/visa.png";
import MastercardLogo from "../../../../public/img/pages/home/mastercard.png";

import { PaymentMethod } from "@/PaymentMethod";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

type Props = {
  card: PaymentMethod
  isPrimary: boolean
  setPrimary?: () => void
  editCard?: () => void
  deleteCard?: () => void
}

export default function Card({ card, isPrimary, setPrimary, editCard, deleteCard }: Props) {
  const textColour = card.card.type === "Visa" ? 'text-white' : '' // Defaults to gray
  let bgColour = 'bg-gray-200'
  if(card.card.type === "Visa") bgColour = 'bg-[#1A1F71] ring-0'
  if(card.card.type === "Mastercard") bgColour = 'bg-[#F1EFEB]'

  return (
    <div className={`w-full h-60 flex flex-col justify-between gap-4 rounded-2xl ring-1 ring-inset ring-gray-300 p-8 ${textColour} ${bgColour}`}>
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{card.billingAddress.firstName} {card.billingAddress.lastName}</h3>

        {(editCard !== undefined || deleteCard !== undefined) && (
          <div className="flex items-center gap-4">
            {editCard !== undefined && (
              <button
                type="button"
                className={`rounded-full p-1 focus:outline-none focus:ring-2 ${card.card.type === "Visa" ? 'focus:ring-white' : 'focus:ring-gray-900'}`}
                onClick={editCard}
                aria-label="Edit payment method"
              >
                <HiPencilAlt size={24} />
              </button>
            )}

            {deleteCard !== undefined && (
              <button
                type="button"
                className={`rounded-full p-1 focus:outline-none focus:ring-2 ${card.card.type === "Visa" ? 'focus:ring-white' : 'focus:ring-gray-900'}`}
                onClick={deleteCard}
                aria-label="Delete payment method"
              >
                <HiTrash size={24} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold">**** {card.card.number.toString().slice(12, 16)}</p>

        <div className="flex flex-col">
          <p className="font-semibold">Expiration Date</p>
          <p>
            <span>{card.card.expirationDate.toString().slice(0, 2)}</span>/
            <span>20{card.card.expirationDate.toString().slice(2, 4)}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end h-8">
        <div>
          {isPrimary ? (
            <p className="text-sm font-bold">
              Primary method
            </p>
          ) : (
            <>
              {setPrimary && (
                <button
                  type="button"
                  className="text-sm hover:underline"
                  onClick={setPrimary}
                >
                  Set as primary
                </button>
              )}
            </>
          )}
        </div>

        <div className="h-full flex items-end">
          {card.card.type === "Visa" && (
            <Image src={VisaLogo} alt="Visa logo" className="h-full w-auto" />
          )}

          {card.card.type === "Mastercard" && (
            <Image src={MastercardLogo} alt="Mastercard logo" />
          )}
        </div>
      </div>
    </div>
  )
}