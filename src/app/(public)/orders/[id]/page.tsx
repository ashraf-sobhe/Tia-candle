"use client";

import { useParams } from "next/navigation";
import { useMyOrderById } from "@/lib/hooks/useOrders";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import { CheckCircle, Package } from "lucide-react";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { data, isLoading } = useMyOrderById(id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const order = data?.data.order;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-success)" }}
        >
          <CheckCircle size={40} color="#fff" />
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          تم تأكيد طلبك بنجاح!
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          رقم الطلب: <span className="font-mono font-bold">{order._id}</span>
        </p>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="px-6 py-4 border-b flex items-center gap-2"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <Package size={18} style={{ color: "var(--color-primary)" }} />
          <h2 className="font-bold" style={{ color: "var(--color-text)" }}>
            تفاصيل الطلب
          </h2>
        </div>

        <div
          className="divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          {order.cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 p-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                {item.product.imageCover ? (
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title || "منتج"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      لا صورة
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className="font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.product.title}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.quantity} × {item.price} ج.م
                </p>
              </div>
              <p className="font-bold" style={{ color: "var(--color-text)" }}>
                {item.quantity * item.price} ج.م
              </p>
            </div>
          ))}
        </div>

        <div
          className="px-6 py-4 space-y-2 border-t"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-text-muted)" }}>
              طريقة الدفع
            </span>
            <span style={{ color: "var(--color-text)" }}>
              {order.paymentMethodType === "cash"
                ? "الدفع عند الاستلام"
                : "بطاقة ائتمان"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-text-muted)" }}>حالة الدفع</span>
            <span
              style={{
                color: order.isPaid
                  ? "var(--color-success)"
                  : "var(--color-warning)",
              }}
            >
              {order.isPaid ? "مدفوع" : "غير مدفوع"}
            </span>
          </div>

          <div
            className="flex justify-between text-sm pt-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span style={{ color: "var(--color-text-muted)" }}>
              المجموع قبل الضريبة
            </span>
            <span style={{ color: "var(--color-text)" }}>
              {(order.totalOrderPrice / 1.14).toFixed(2)} ج.م
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-text-muted)" }}>
              ضريبة القيمة المضافة (14%)
            </span>
            <span style={{ color: "var(--color-text)" }}>
              {(order.totalOrderPrice - order.totalOrderPrice / 1.14).toFixed(
                2,
              )}{" "}
              ج.م
            </span>
          </div>

          <div
            className="flex justify-between font-bold pt-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span style={{ color: "var(--color-text)" }}>الإجمالي</span>
            <span style={{ color: "var(--color-primary)" }}>
              {order.totalOrderPrice} ج.م
            </span>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-6 border space-y-2"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h2 className="font-bold mb-3" style={{ color: "var(--color-text)" }}>
          عنوان الشحن
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {order.shippingAddress.details}
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {order.shippingAddress.city}
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {order.shippingAddress.phone}
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/orders" className="flex-1">
          <Button variant="outline" className="w-full py-3">
            طلباتي
          </Button>
        </Link>
        <Link href="/products" className="flex-1">
          <Button className="w-full py-3">متابعة التسوق</Button>
        </Link>
      </div>
    </div>
  );
}
