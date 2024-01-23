export interface PaymentMethod {
  id: string
  card: {
    type: 'Visa' | 'Mastercard' | 'AMEX' | 'Discover' | 'Diners' | 'Diners - Carte Blanche' | 'JCB' | 'Visa Electron' | null
    number: number
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