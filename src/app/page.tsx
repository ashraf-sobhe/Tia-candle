"use client";

import Link from "next/link";
import {
  useLatestProducts,
  useTopRatedProducts,
  useTopProducts,
} from "@/lib/hooks/useProducts";
import ProductCard from "@/components/product/ProductCard";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const { data: latest, isLoading: latestLoading } = useLatestProducts();
  const { data: topRated, isLoading: topRatedLoading } = useTopRatedProducts();
  const { data: top, isLoading: topLoading } = useTopProducts();

  return (
    <main>
      
      <section className="bg-[--color-primary] text-[--color-primary-foreground] overflow-hidden relative">

  
  

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center lg:items-stretch relative z-10">

    
    <div className="flex-1 flex flex-col justify-center items-start py-24 px-6 gap-4">
      <p className="text-xs tracking-widest uppercase opacity-50 font-light">
        أفضل مبيعاتنا
      </p>
      <div className="w-10 h-px bg-current opacity-70"></div>
      <h1 className="text-5xl sm:text-6xl font-black leading-tight">
        أضئ لحظاتك<br />بعطر الشموع.
      </h1>
      <p className="text-base opacity-50 font-light max-w-xs leading-relaxed">
        شموع طبيعية مصنوعة بعناية، تُحوّل كل مكان إلى أجواء دافئة وساحرة.
      </p>
      <Link href="/products">
        <Button variant="primary" className="px-8 py-3 mt-2">
          تسوق الآن
        </Button>
      </Link>
    </div>

    
    <div className="flex-1 relative overflow-hidden"
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
      <img
        src="/hero2.png"
        alt="Hero Image"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[--color-text]">أحدث المنتجات</h2>
          <Link
            href="/products"
            className="text-sm text-[--color-primary] hover:opacity-70 transition-opacity"
          >
            عرض الكل
          </Link>
        </div>
        {latestLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {latest?.data.products.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      
      <section className="bg-[--color-surface]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[--color-text]">الأعلى تقييماً</h2>
            <Link
              href="/products?sort=-ratingsAverage"
              className="text-sm text-[--color-primary] hover:opacity-70 transition-opacity"
            >
              عرض الكل
            </Link>
          </div>
          {topRatedLoading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {topRated?.data.products.slice(0, 10).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[--color-text]">الأكثر مبيعاً</h2>
          <Link
            href="/products?sort=-sold"
            className="text-sm text-[--color-primary] hover:opacity-70 transition-opacity"
          >
            عرض الكل
          </Link>
        </div>
        {topLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {top?.data.products.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}