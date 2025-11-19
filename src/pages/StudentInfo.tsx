import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, User } from "lucide-react";
import Header from "@/components/Header";

const StudentInfo = () => {
  const [studentName, setStudentName] = useState("");
  const [selectedParts, setSelectedParts] = useState<number[]>([]);

  useEffect(() => {
    // Get selected parts from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const partsParam = urlParams.get('parts');
    if (partsParam) {
      const parts = partsParam.split(',').map(Number);
      setSelectedParts(parts);
    }
  }, []);

  const handleStart = () => {
    if (studentName.trim() && selectedParts.length > 0) {
      const partsParam = selectedParts.join(',');
      const nameParam = encodeURIComponent(studentName.trim());
      window.location.href = `/recitation-test?parts=${partsParam}&student=${nameParam}`;
    }
  };

  const handleBack = () => {
    const partsParam = selectedParts.join(',');
    window.location.href = `/select-parts?parts=${partsParam}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-luxury mb-4">
              معلومات الطالب
            </h1>
            <p className="text-muted-foreground text-lg">
              أدخل اسم الطالب لبدء الاختبار
            </p>
          </div>

          {/* Selected Parts Summary */}
          {selectedParts.length > 0 && (
            <div className="glass-effect rounded-xl p-6 mb-8 border border-border/50">
              <h3 className="text-lg font-semibold mb-3 text-luxury">
                الأجزاء المختارة ({selectedParts.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedParts.sort((a, b) => a - b).map((part) => (
                  <span
                    key={part}
                    className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    الجزء {part}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Student Name Input */}
          <div className="glass-effect rounded-xl p-8 mb-8 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-6 w-6 text-gold" />
              <label htmlFor="studentName" className="text-lg font-semibold text-luxury">
                اسم الطالب
              </label>
            </div>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="أدخل اسم الطالب..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-lg"
              autoFocus
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>تعديل الأجزاء</span>
            </button>

            <button
              onClick={handleStart}
              disabled={!studentName.trim()}
              className={`
                inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${studentName.trim()
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span>بدء الاختبار</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentInfo;