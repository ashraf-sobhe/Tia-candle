export interface PricingSettings {
  _id: string
  taxRate: number
  shippingPrice: number
  createdAt: string
  updatedAt: string
}

export interface PricingSettingsResponse {
  status: 'success'
  data: {
    settings: PricingSettings
  }
}