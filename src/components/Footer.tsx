import { BookOpen, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <p className="text-xl tracking-tight font-semibold text-primary">مسابقة القرآن الكريم</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              مسابقة شاملة لحفظ القرآن الكريم لجميع الأعمار مع جوائز قيمة ورحلات عمرة للفائزين
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>الجزائر - جميع الولايات</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">روابط سريعة</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="/registration" className="text-muted-foreground hover:text-primary transition">
                التسجيل في المسابقة
              </a>
              <a href="/groups" className="text-muted-foreground hover:text-primary transition">
                المجموعات العمرية
              </a>
              <a href="/about" className="text-muted-foreground hover:text-primary transition">
                عن المسابقة
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-primary transition">
                اتصل بنا
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">تواصل معنا</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+213 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@qurancompetition.dz</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">
                  أوقات العمل: السبت - الخميس، 8:00 ص - 6:00 م
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <a href="#" className="hover:text-foreground transition">
              سياسة الخصوصية
            </a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:text-foreground transition">
              الشروط والأحكام
            </a>
          </div>
          <p>© {currentYear} مسابقة حفظ القرآن الكريم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
