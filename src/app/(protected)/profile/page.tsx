"use client";

import { useMe } from "@/lib/hooks/useUsers";
import { useMyOrders } from "@/lib/hooks/useOrders";
import { usersApi } from "@/lib/api/users.api";
import { useAuthStore } from "@/lib/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { User, Package } from "lucide-react";
import Link from "next/link";

const profileSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتان",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { data, isLoading, refetch } = useMe();
  const { data: ordersData, isLoading: ordersLoading } = useMyOrders();
  const { setAuth, user } = useAuthStore();
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    values: {
      name: data?.data?.user?.name || "",
      email: data?.data?.user?.email || "",
      phone: data?.data?.user?.phone || "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const onUpdateProfile = async (formData: ProfileFormData) => {
    setIsUpdatingProfile(true);
    setProfileError("");
    setProfileSuccess(false);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.email !== user?.email) data.append("email", formData.email);
      if (formData.phone) data.append("phone", formData.phone);
      if (image) data.append("profileImage", image);
      const res = await usersApi.updateMe(data);
      setAuth(res.data.data.user, user?.accessToken || "");
      await refetch();
      setProfileSuccess(true);
    } catch (err) {
      setProfileError(getErrorMessage(err));
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onUpdatePassword = async (formData: PasswordFormData) => {
    setIsUpdatingPassword(true);
    setPasswordError("");
    setPasswordSuccess(false);
    try {
      await usersApi.updateMyPassword(formData);
      setPasswordSuccess(true);
      passwordForm.reset();
    } catch (err) {
      setPasswordError(getErrorMessage(err));
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const orders = ordersData?.data?.order || []

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
        الملف الشخصي
      </h1>

      <div className="rounded-xl p-6 border space-y-6"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {data?.data?.user?.profileImage ? (
              <img src={data?.data?.user?.profileImage} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <User size={28} style={{ color: 'var(--color-primary-foreground)' }} />
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
              {data?.data?.user?.name}
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {data?.data?.user?.email}
            </p>
          </div>
        </div>

        {profileError && <ErrorMessage message={profileError} />}
        {profileSuccess && (
          <div className="px-4 py-3 rounded-lg text-sm"
            style={{ backgroundColor: "var(--color-success)", color: "#fff" }}
          >
            تم تحديث البيانات بنجاح
          </div>
        )}

        <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
          <Input label="الاسم" error={profileForm.formState.errors.name?.message} {...profileForm.register("name")} />
          <Input label="البريد الإلكتروني" type="email" error={profileForm.formState.errors.email?.message} {...profileForm.register("email")} />
          <Input label="رقم الهاتف (اختياري)" type="tel" placeholder="01xxxxxxxxx" error={profileForm.formState.errors.phone?.message} {...profileForm.register("phone")} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              صورة الملف الشخصي (اختياري)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)", color: "var(--color-text)" }}
            />
          </div>
          <Button type="submit" isLoading={isUpdatingProfile} className="w-full py-3">
            حفظ التغييرات
          </Button>
        </form>
      </div>

      <div className="rounded-xl p-6 border space-y-6"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <h2 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
          تغيير كلمة المرور
        </h2>

        {passwordError && <ErrorMessage message={passwordError} />}
        {passwordSuccess && (
          <div className="px-4 py-3 rounded-lg text-sm"
            style={{ backgroundColor: "var(--color-success)", color: "#fff" }}
          >
            تم تغيير كلمة المرور بنجاح
          </div>
        )}

        <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4">
          <Input label="كلمة المرور الحالية" type="password" error={passwordForm.formState.errors.currentPassword?.message} {...passwordForm.register("currentPassword")} />
          <Input label="كلمة المرور الجديدة" type="password" error={passwordForm.formState.errors.password?.message} {...passwordForm.register("password")} />
          <Input label="تأكيد كلمة المرور الجديدة" type="password" error={passwordForm.formState.errors.confirmPassword?.message} {...passwordForm.register("confirmPassword")} />
          <Button type="submit" isLoading={isUpdatingPassword} className="w-full py-3">
            تغيير كلمة المرور
          </Button>
        </form>
      </div>

      <div className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="px-6 py-4 flex items-center gap-2"
          style={{ backgroundColor: "var(--color-surface)", borderBottom: '1px solid var(--color-border)' }}
        >
          <Package size={18} style={{ color: "var(--color-primary)" }} />
          <h2 className="font-bold" style={{ color: "var(--color-text)" }}>طلباتي</h2>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-8"><Spinner size="lg" /></div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Package size={40} style={{ color: "var(--color-text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>لا توجد طلبات بعد</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {orders.map((order: any) => (
              <Link key={order._id} href={`/orders/${order._id}`}
                className="flex items-center justify-between px-6 py-4 hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "var(--color-background)" }}
              >
                <div className="space-y-1">
                  <p className="text-sm font-mono font-bold" style={{ color: "var(--color-text)" }}>
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: order.isDelivered ? 'var(--color-success)' : order.isPaid ? 'var(--color-warning)' : 'var(--color-border)',
                      color: order.isDelivered || order.isPaid ? '#fff' : 'var(--color-text)',
                    }}
                  >
                    {order.isDelivered ? 'تم التوصيل' : order.isPaid ? 'قيد التوصيل' : 'قيد المعالجة'}
                  </span>
                  <p className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
                    {order.totalOrderPrice} ج.م
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}