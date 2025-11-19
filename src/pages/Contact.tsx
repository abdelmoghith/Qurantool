import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Mail, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-6">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              تواصل معنا
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              لديك سؤال أو استفسار حول المسابقة؟ تواصل معنا وسنكون سعداء لمساعدتك
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className={`transition-all duration-700 ease-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">معلومات الاتصال</CardTitle>
                  <CardDescription>
                    يمكنك التواصل معنا من خلال الطرق التالية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">العنوان</h3>
                        <p className="text-muted-foreground">
                          مركز تحفيظ القرآن الكريم<br />
                          الجزائر العاصمة، الجزائر
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">الهاتف</h3>
                        <p className="text-muted-foreground">+213 XXX XXX XXX</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h3>
                        <p className="text-muted-foreground">info@qurancompetition.dz</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">ساعات العمل</h3>
                        <p className="text-muted-foreground">السبت - الخميس: 8:00 ص - 6:00 م</p>
                        <p className="text-muted-foreground">الجمعة: مغلق</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className={`transition-all duration-700 ease-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">الأسئلة الشائعة</CardTitle>
                  <CardDescription>
                    إجابات على أكثر الأسئلة شيوعاً حول المسابقة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">كيف يمكنني التسجيل في المسابقة؟</h3>
                      <p className="text-muted-foreground text-sm">
                        يمكنك التسجيل من خلال ملء نموذج التسجيل المتاح على الموقع أو زيارة مركزنا مباشرة.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">ما هي شروط المشاركة؟</h3>
                      <p className="text-muted-foreground text-sm">
                        المسابقة مفتوحة لجميع الأعمار من 8 سنوات فما فوق، مع ضرورة الالتزام بحضور الجلسات المحددة.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">ما هي الجوائز المتاحة؟</h3>
                      <p className="text-muted-foreground text-sm">
                        رحلات عمرة للفائزين الأوائل في كل مجموعة، بالإضافة إلى جوائز نقدية وشهادات تقدير.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">كم تستغرق مدة المسابقة؟</h3>
                      <p className="text-muted-foreground text-sm">
                        تستغرق المسابقة 6 أشهر كاملة مع جلسات منتظمة لكل مجموعة عمرية.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;