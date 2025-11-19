import { ArrowRight, Users, BookOpen, Clock, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Groups = () => {
  const groups = [
    {
      id: "children",
      name: "مجموعة الأطفال",
      ageRange: "8-12 سنة",
      description: "مجموعة مخصصة للأطفال الصغار لتعلم وحفظ القرآن الكريم بطريقة ممتعة وتفاعلية",
      participants: "50+ مشارك",
      schedule: "السبت والأحد",
      color: "bg-green-100 text-green-800",
      icon: <Users className="h-6 w-6" />
    },
    {
      id: "youth",
      name: "مجموعة الشباب",
      ageRange: "13-18 سنة",
      description: "مجموعة للشباب المراهقين لتطوير مهارات الحفظ والتلاوة مع التركيز على الفهم والتدبر",
      participants: "75+ مشارك",
      schedule: "الثلاثاء والخميس",
      color: "bg-blue-100 text-blue-800",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "adults",
      name: "مجموعة الكبار",
      ageRange: "19-35 سنة",
      description: "مجموعة للبالغين الشباب مع التركيز على الحفظ المتقن والتطبيق العملي في الحياة اليومية",
      participants: "60+ مشارك",
      schedule: "الاثنين والأربعاء",
      color: "bg-purple-100 text-purple-800",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      id: "seniors",
      name: "مجموعة كبار السن",
      ageRange: "36+ سنة",
      description: "مجموعة لكبار السن مع التركيز على المراجعة والتثبيت والاستفادة من الخبرة الحياتية",
      participants: "40+ مشارك",
      schedule: "الجمعة",
      color: "bg-orange-100 text-orange-800",
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <section id="groups" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            مجموعات المسابقة
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            أربع مجموعات عمرية مصممة لتناسب جميع المستويات والأعمار
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">المشاركون:</span>
                    <span className="font-medium">{group.participants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">المواعيد:</span>
                    <span className="font-medium">{group.schedule}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <a 
                      href="/registration" 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      <span>انضم لهذه المجموعة</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/groups"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition font-medium"
          >
            <span>تفاصيل أكثر عن المجموعات</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Groups;