import { PaymentMethod } from "@/PaymentMethod";

export const getCardType = function(cardNumber: string): PaymentMethod["card"]["type"] {
  // visa
  var re = new RegExp("^4");
  if(cardNumber.match(re) != null)
    return "Visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cardNumber))
    return "Mastercard";

  return null;
}