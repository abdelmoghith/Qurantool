import { Trophy, Calendar, MapPin, Gift, BookOpen, Users, Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompetitionInfo = () => {
  const features = [
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "جوائز قيمة",
      description: "رحلات عمرة للفائزين الأوائل في كل مجموعة بالإضافة إلى جوائز نقدية وشهادات تقدير"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "برنامج منظم",
      description: "جدول زمني محدد لكل مجموعة مع جلسات منتظمة ومتابعة مستمرة للتقدم"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "بيئة تنافسية إيجابية",
      description: "جو من التنافس الشريف والتشجيع المتبادل بين المشاركين"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "منهج شامل",
      description: "تعلم التجويد والحفظ والتدبر مع أساتذة متخصصين ومؤهلين"
    }
  ];

  const timeline = [
    {
      phase: "التسجيل",
      duration: "شهر واحد",
      description: "فتح باب التسجيل لجميع المجموعات العمرية",
      status: "جاري الآن"
    },
    {
      phase: "التقييم الأولي",
      duration: "أسبوعان",
      description: "تقييم مستوى الحفظ الحالي وتوزيع المشاركين",
      status: "قريباً"
    },
    {
      phase: "بداية المسابقة",
      duration: "6 أشهر",
      description: "بداية الجلسات التعليمية والتنافسية",
      status: "قريباً"
    },
    {
      phase: "التصفيات النهائية",
      duration: "أسبوع واحد",
      description: "التصفيات النهائية وإعلان الفائزين",
      status: "قريباً"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            لماذا تنضم لمسابقتنا؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مسابقة شاملة ومنظمة تهدف إلى تشجيع حفظ القرآن الكريم وتعلم أحكام التجويد
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              الجدول الزمني للمسابقة
            </h3>
            <p className="text-muted-foreground">
              خطة زمنية واضحة لجميع مراحل المسابقة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <div key={index} className="relative">
                <Card className={`${phase.status === 'جاري الآن' ? 'border-primary bg-primary/5' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{phase.phase}</CardTitle>
                      {phase.status === 'جاري الآن' && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">نشط</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{phase.duration}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{phase.description}</p>
                  </CardContent>
                </Card>
                
                {/* Connector line */}
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                ابدأ رحلتك مع القرآن الكريم
              </CardTitle>
              <CardDescription className="text-lg">
                انضم إلينا اليوم واكسب الأجر والثواب مع فرصة الفوز بجوائز قيمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/registration"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition font-medium"
                >
                  <span>سجل الآن</span>
                  <Star className="h-5 w-5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition font-medium"
                >
                  <span>اتصل بنا للاستفسار</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CompetitionInfo;