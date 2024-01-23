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

  // AMEX
  re = new RegExp("^3[47]");
  if(cardNumber.match(re) != null)
    return "AMEX";

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if(cardNumber.match(re) != null)
    return "Discover";

  return null;
}