'use client'

import { useSettings, useUpdateSettings } from '@/lib/hooks/useSettings'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

export default function AdminSettingsPage() {
  const { data, isLoading } = useSettings()
  const { mutate: updateSettings, isPending, isError, error, isSuccess } = useUpdateSettings()

  const [taxRate, setTaxRate] = useState('')
  const [shippingPrice, setShippingPrice] = useState('')

  useEffect(() => {
    if (data?.data.settings) {
      setTaxRate(String(data.data.settings.taxRate))
      setShippingPrice(String(data.data.settings.shippingPrice))
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings({
      taxRate: Number(taxRate),
      shippingPrice: Number(shippingPrice),
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        الإعدادات
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div
          className="rounded-xl p-6 border max-w-lg space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {isError && <ErrorMessage message={getErrorMessage(error)} />}

          {isSuccess && (
            <div
              className="px-4 py-3 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--color-success)', color: '#fff' }}
            >
              تم حفظ الإعدادات بنجاح
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="نسبة الضريبة (%)"
              type="number"
              placeholder="14"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
            <Input
              label="سعر الشحن (ج.م)"
              type="number"
              placeholder="50"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
            />
            <Button type="submit" isLoading={isPending} className="w-full py-3">
              حفظ الإعدادات
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}