import { ArrowRight, Users, Trophy, Calendar, Book } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/select-parts";
  };

  return (
    <section className="relative overflow-hidden w-full bg-white">
      <div className="relative h-[80vh] md:h-[90vh] w-full">
        {/* Simple Content */}
        <div className="flex flex-col items-center justify-center h-full text-center px-4 w-full max-w-7xl mx-auto">
          {/* Luxury Icon Section */}
          <div className={`mb-8 transition-all duration-1000 ease-out ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            </div>
          </div>
          
          {/* Luxury Title */}
          <h1 className={`text-5xl sm:text-6xl md:text-8xl tracking-tight font-bold mb-6 transition-all duration-1000 ease-out delay-200 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="text-gold-shimmer block mb-2">أداة المعلم</span>
            <span className="text-luxury block">لسرد القرآن الكريم</span>
          </h1>
          
          {/* Luxury Subtitle */}
          <div className={`mb-8 transition-all duration-1000 ease-out delay-400 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-foreground text-xl md:text-2xl max-w-4xl mb-4 font-medium leading-relaxed">
              أداة تساعد المعلمين في اختبار حفظ الطلاب للقرآن الكريم
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl font-medium">
              اختر الأجزاء المطلوبة وأدخل اسم الطالب لتوليد مواضع السرد تلقائياً
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            </div>
          </div>

          <div className={`flex justify-center transition-all duration-700 ease-out delay-500 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <a
              href="/select-parts"
              onClick={handleRegisterClick}
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 text-black px-8 py-3 hover:bg-yellow-600 transition font-medium text-lg"
            >
              <span>ابدأ الآن</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;