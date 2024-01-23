import Image from "next/image";

import VisaLogo from "../../../../public/img/pages/home/visa.png";
import MastercardLogo from "../../../../public/img/pages/home/mastercard.png";

import { PaymentMethod } from "@/PaymentMethod";

type Props = {
  card: PaymentMethod
}

export default function Card({ card }: Props) {
  const textColour = card.card.type === "Visa" ? 'text-white' : '' // Defaults to gray
  let bgColour = 'bg-gray-200'
  if(card.card.type === "Visa") bgColour = 'bg-[#1A1F71] ring-0'
  if(card.card.type === "Mastercard") bgColour = 'bg-[#F1EFEB]'

  return (
    <div className={`w-full h-60 flex flex-col justify-between rounded-2xl ring-1 ring-inset ring-gray-300 p-8 ${textColour} ${bgColour}`}>
      <div>
        <h3 className="text-xl font-bold">{card.billingAddress.firstName} {card.billingAddress.lastName}</h3>
      </div>

      <div>
        <p className="font-semibold">**** {card.card.number.toString().slice(12, 16)}</p>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <p className="font-semibold">Expiration Date</p>
          <p>
            <span>{card.card.expirationDate.toString().slice(0, 2)}</span>/
            <span>20{card.card.expirationDate.toString().slice(2, 4)}</span>
          </p>
        </div>

        <div className="max-w-20">
          {card.card.type === "Visa" && (
            <Image src={VisaLogo} alt="Visa logo" className="mb-2 mr-2" />
          )}

          {card.card.type === "Mastercard" && (
            <Image src={MastercardLogo} alt="Mastercard logo" />
          )}
        </div>
      </div>
    </div>
  )
}