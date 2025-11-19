

const Header = () => {
  return (
    <>
      {/* Luxury Announcement Bar */}
      <div className="w-full bg-gold-gradient text-gold-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-20"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center py-3 text-sm font-medium">
            <p className="text-shadow">أداة المعلم لاختبار حفظ القرآن الكريم</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;