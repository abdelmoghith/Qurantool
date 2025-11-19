import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Trophy, BookOpen } from "lucide-react";

const Groups = () => {
  const groups = [
    {
      id: "children",
      name: "مجموعة الأطفال",
      ageRange: "8-12 سنة",
      description: "مجموعة مخصصة للأطفال الصغار لتعلم وحفظ القرآن الكريم بطريقة ممتعة وتفاعلية",
      features: [
        "حفظ السور القصيرة",
        "تعلم التجويد الأساسي",
        "أنشطة تفاعلية وألعاب",
        "مكافآت وتشجيع مستمر"
      ],
      schedule: "السبت والأحد - 9:00 صباحاً",
      color: "bg-green-100 text-green-800",
      icon: <Users className="h-6 w-6" />
    },
    {
      id: "youth",
      name: "مجموعة الشباب",
      ageRange: "13-18 سنة",
      description: "مجموعة للشباب المراهقين لتطوير مهارات الحفظ والتلاوة مع التركيز على الفهم والتدبر",
      features: [
        "حفظ الأجزاء الكاملة",
        "تعلم أحكام التجويد",
        "مسابقات وتحديات",
        "ورش تدبر القرآن"
      ],
      schedule: "الثلاثاء والخميس - 4:00 مساءً",
      color: "bg-blue-100 text-blue-800",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "adults",
      name: "مجموعة الكبار",
      ageRange: "19-35 سنة",
      description: "مجموعة للبالغين الشباب مع التركيز على الحفظ المتقن والتطبيق العملي في الحياة اليومية",
      features: [
        "حفظ متقدم ومراجعة",
        "إتقان التجويد والقراءات",
        "دروس في التفسير",
        "تطبيق عملي للآيات"
      ],
      schedule: "الاثنين والأربعاء - 7:00 مساءً",
      color: "bg-purple-100 text-purple-800",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      id: "seniors",
      name: "مجموعة كبار السن",
      ageRange: "36+ سنة",
      description: "مجموعة لكبار السن مع التركيز على المراجعة والتثبيت والاستفادة من الخبرة الحياتية",
      features: [
        "مراجعة وتثبيت الحفظ",
        "دروس في الحكمة القرآنية",
        "جلسات تدبر جماعية",
        "مشاركة الخبرات والتجارب"
      ],
      schedule: "الجمعة - 10:00 صباحاً",
      color: "bg-orange-100 text-orange-800",
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            مجموعات المسابقة
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تم تقسيم المسابقة إلى أربع مجموعات عمرية لضمان التنافس العادل والتعلم المناسب لكل فئة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {group.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{group.name}</CardTitle>
                      <Badge className={group.color}>{group.ageRange}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-right mt-2">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">مميزات المجموعة:</h4>
                    <ul className="space-y-1">
                      {group.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">مواعيد الجلسات:</span>
                      <span>{group.schedule}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <div>
                <h4 className="font-semibold mb-2">شروط المشاركة:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• الالتزام بحضور الجلسات المحددة</li>
                  <li>• إحضار المصحف الشريف</li>
                  <li>• الاستعداد للمشاركة الفعالة</li>
                  <li>• احترام آداب تلاوة القرآن الكريم</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">الجوائز والمكافآت:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• شهادات تقدير لجميع المشاركين</li>
                  <li>• جوائز قيمة للفائزين في كل مجموعة</li>
                  <li>• رحلة عمرة للفائز الأول في كل مجموعة</li>
                  <li>• مكافآت تشجيعية أسبوعية</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Groups;