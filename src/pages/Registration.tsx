import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    phone: "",
    email: "",
    group: "",
    experience: "",
    memorizedParts: ""
  });

  const groups = [
    { id: "children", name: "مجموعة الأطفال (8-12 سنة)", description: "للأطفال من سن 8 إلى 12 سنة" },
    { id: "youth", name: "مجموعة الشباب (13-18 سنة)", description: "للشباب من سن 13 إلى 18 سنة" },
    { id: "adults", name: "مجموعة الكبار (19-35 سنة)", description: "للكبار من سن 19 إلى 35 سنة" },
    { id: "seniors", name: "مجموعة كبار السن (36+ سنة)", description: "لكبار السن من سن 36 فما فوق" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.age || !formData.phone || !formData.group) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Registration data:", formData);
    toast.success("تم تسجيل الاشتراك بنجاح! سيتم التواصل معك قريباً");
    
    // Reset form
    setFormData({
      fullName: "",
      age: "",
      phone: "",
      email: "",
      group: "",
      experience: "",
      memorizedParts: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              تسجيل في مسابقة حفظ القرآن الكريم
            </h1>
            <p className="text-lg text-muted-foreground">
              انضم إلينا في هذه المسابقة المباركة لحفظ كتاب الله العزيز
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>نموذج التسجيل</CardTitle>
              <CardDescription>
                يرجى ملء جميع البيانات المطلوبة للتسجيل في المسابقة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">العمر *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="أدخل عمرك"
                    min="8"
                    max="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="أدخل رقم هاتفك"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="أدخل بريدك الإلكتروني (اختياري)"
                  />
                </div>

                <div className="space-y-4">
                  <Label>اختر المجموعة المناسبة *</Label>
                  <RadioGroup
                    value={formData.group}
                    onValueChange={(value) => setFormData({...formData, group: value})}
                  >
                    {groups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={group.id} id={group.id} />
                        <Label htmlFor={group.id} className="flex-1">
                          <div className="font-medium">{group.name}</div>
                          <div className="text-sm text-muted-foreground">{group.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">مستوى الحفظ الحالي</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({...formData, experience: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مستوى حفظك الحالي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدئ (أقل من جزء)</SelectItem>
                      <SelectItem value="intermediate">متوسط (1-5 أجزاء)</SelectItem>
                      <SelectItem value="advanced">متقدم (6-15 جزء)</SelectItem>
                      <SelectItem value="expert">خبير (16-30 جزء)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memorizedParts">الأجزاء المحفوظة</Label>
                  <Input
                    id="memorizedParts"
                    value={formData.memorizedParts}
                    onChange={(e) => setFormData({...formData, memorizedParts: e.target.value})}
                    placeholder="مثال: الفاتحة، البقرة، آل عمران..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  تسجيل الاشتراك
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;