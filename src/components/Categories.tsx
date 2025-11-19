import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { fetchCategories } from "@/lib/dataService";
import { Category } from "@/lib/dataService";

// Skeleton component for loading state
const CategorySkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl border border-border animate-pulse">
    <div className="h-72 w-full bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2"></div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
      </div>
    </div>
    <div className="absolute bottom-4 left-4">
      <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
    </div>
  </div>
);

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div 
          id="categories-header"
          data-animate-on-scroll
          className="text-center mb-10 sm:mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          {/* Fixed titles - not part of skeleton */}
          <p className="text-sm text-muted-foreground mb-2">استكشف مجموعتنا</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-light">
            نكهات مغنية التقليدية
          </h2>
          <p className="text-xl mt-2" style={{ direction: 'rtl' }}>
            نكهات مغنية الأصيلة
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div 
        id="categories-header"
        data-animate-on-scroll
        className="text-center mb-10 sm:mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <p className="text-sm text-muted-foreground mb-2">استكشف مجموعتنا</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-light">
          نكهات مغنية التقليدية
        </h2>
        <p className="text-xl mt-2" style={{ direction: 'rtl' }}>
          نكهات مغنية الأصيلة
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {categories.map((category, index) => (
          <a
            key={category.id}
            id={`category-${index}`}
            data-animate-on-scroll
            href={`/shop?category=${category.id}`}
            className="group relative overflow-hidden rounded-2xl border border-border opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img
              src={category.image || "/placeholder-category.jpg"}
              alt={category.name}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.description}</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-foreground backdrop-blur hover:bg-white transition font-medium">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories;