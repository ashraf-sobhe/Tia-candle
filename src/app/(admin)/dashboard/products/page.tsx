"use client";

import { useState } from "react";
import { useProducts, useDeleteProduct } from "@/lib/hooks/useProducts";
import { Product } from "@/lib/types/product.types";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  const { data, isLoading } = useProducts();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          المنتجات
        </h1>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2"
        >
          <Plus size={18} />
          إضافة منتج
        </Button>
      </div>

      {showForm && (
        <ProductForm product={selectedProduct} onClose={handleClose} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[--color-border]">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "var(--color-surface)" }}>
              <tr>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  الصورة
                </th>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  الاسم
                </th>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  السعر
                </th>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  الكمية
                </th>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  الفئة
                </th>
                <th
                  className="text-right px-4 py-3 font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.products.map((product, index) => (
                <tr
                  key={product._id}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "var(--color-background)"
                        : "var(--color-surface)",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {product.title}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--color-text)" }}
                  >
                    {product.price} ج.م
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--color-text)" }}
                  >
                    {product.quantity}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {product.category?.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: "var(--color-error)" }}
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
  );
}
