import { useState, useEffect } from "react";
import { BookOpen, Users, Target, Award, Clock, Zap } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "اختيار الأجزاء",
      description: "إمكانية اختيار أجزاء محددة من القرآن الكريم للاختبار"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "إدارة الطلاب",
      description: "إدخال أسماء الطلاب وتتبع تقدمهم في الحفظ"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "توليد تلقائي",
      description: "توليد مواضع السرد تلقائياً من الأجزاء المختارة"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "اختبار دقيق",
      description: "4 مواضع عشوائية لضمان اختبار شامل للحفظ"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "توفير الوقت",
      description: "توليد مواضع الاختبار تلقائياً يوفر وقت المعلم"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "اختبار عادل",
      description: "مواضع عشوائية تضمن عدالة الاختبار لجميع الطلاب"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "تقييم شامل",
      description: "اختبار متعدد المواضع يضمن تقييماً شاملاً للحفظ"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "مرونة في الاختيار",
      description: "حرية اختيار الأجزاء المناسبة لمستوى كل طالب"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-6">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              عن أداة المعلم لسرد القرآن الكريم
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              أداة تقنية متطورة تساعد المعلمين في اختبار حفظ الطلاب للقرآن الكريم بطريقة عادلة وفعالة
            </p>
          </div>

          {/* Mission Section */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center transition-all duration-700 ease-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">هدف الأداة</h2>
              <p className="text-muted-foreground mb-4">
                تم تطوير هذه الأداة لمساعدة المعلمين والمربين في اختبار حفظ الطلاب للقرآن الكريم 
                بطريقة عادلة وفعالة. تعتمد الأداة على توليد مواضع عشوائية من الأجزاء المختارة 
                لضمان اختبار شامل ومتوازن.
              </p>
              <p className="text-muted-foreground mb-4">
                تساعد الأداة في توفير الوقت والجهد على المعلمين، وتضمن عدالة الاختبار 
                لجميع الطلاب من خلال الاختيار العشوائي للمواضع.
              </p>
              <p className="text-muted-foreground">
                سهولة الاستخدام ووضوح الواجهة يجعلان من هذه الأداة خياراً مثالياً 
                للمعلمين في المدارس والمراكز القرآنية.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl p-8 text-center">
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary">30</div>
                  <div className="text-sm text-muted-foreground">جزء من القرآن</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">مواضع للاختبار</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">عشوائية في الاختيار</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">إعادة توليد المواضع</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mb-16 transition-all duration-700 ease-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">مميزات الأداة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className={`mb-16 transition-all duration-700 ease-out delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">فوائد استخدام الأداة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-700 ease-out delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-4">
                ابدأ استخدام الأداة الآن
              </h3>
              <p className="text-muted-foreground mb-6">
                استفد من هذه الأداة المجانية لاختبار حفظ طلابك للقرآن الكريم بطريقة عادلة وفعالة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/select-parts"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition font-medium"
                >
                  <span>ابدأ الآن</span>
                  <BookOpen className="h-5 w-5" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition font-medium"
                >
                  <span>العودة للرئيسية</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default About;