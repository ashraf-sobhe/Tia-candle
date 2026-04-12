'use client'

import { useUsers, useDeleteUser, useDeactivateUser, useReactivateUser } from '@/lib/hooks/useUsers'
import { UserX, UserCheck, Trash2 } from 'lucide-react'
import Spinner from '@/components/ui/Spinner'

export default function AdminUsersPage() {
  const { data, isLoading } = useUsers()
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()
  const { mutate: deactivateUser, isPending: isDeactivating } = useDeactivateUser()
  const { mutate: reactivateUser, isPending: isReactivating } = useReactivateUser()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        المستخدمين
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[--color-border]">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--color-surface)' }}>
              <tr>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الاسم</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>البريد</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الدور</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الحالة</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.users.map((user, index) => (
                <tr
                  key={user._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>
                    {user.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: user.role === 'admin' ? 'var(--color-primary)' : user.role === 'manager' ? 'var(--color-warning)' : 'var(--color-border)',
                        color: user.role === 'admin' ? 'var(--color-primary-foreground)' : 'var(--color-text)',
                      }}
                    >
                      {user.role === 'admin' ? 'مدير' : user.role === 'manager' ? 'مشرف' : 'مستخدم'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: user.active ? 'var(--color-success)' : 'var(--color-error)',
                        color: '#fff'
                      }}
                    >
                      {user.active ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.active ? (
                        <button
                          onClick={() => deactivateUser(user._id)}
                          disabled={isDeactivating}
                          className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--color-warning)' }}
                          title="تعطيل الحساب"
                        >
                          <UserX size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => reactivateUser(user._id)}
                          disabled={isReactivating}
                          className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--color-success)' }}
                          title="تفعيل الحساب"
                        >
                          <UserCheck size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(user._id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--color-error)' }}
                        title="حذف المستخدم"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}