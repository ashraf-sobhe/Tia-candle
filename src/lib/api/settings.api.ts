import api from './axios'
import { PricingSettingsResponse } from '../types/settings.types'

export const settingsApi = {
  getSettings: () =>
    api.get<PricingSettingsResponse>('/settings'),

  updateSettings: (data: { taxRate?: number; shippingPrice?: number }) =>
    api.put<PricingSettingsResponse>('/settings', data),
}