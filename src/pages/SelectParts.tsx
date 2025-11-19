import { useState } from "react";
import { ArrowRight, ArrowLeft, Book } from "lucide-react";
import Header from "@/components/Header";

const SelectParts = () => {
  const [selectedParts, setSelectedParts] = useState<number[]>([]);

  const quranParts = Array.from({ length: 30 }, (_, i) => i + 1);

  const togglePart = (partNumber: number) => {
    setSelectedParts(prev => 
      prev.includes(partNumber) 
        ? prev.filter(p => p !== partNumber)
        : [...prev, partNumber]
    );
  };

  const handleNext = () => {
    if (selectedParts.length > 0) {
      const partsParam = selectedParts.join(',');
      window.location.href = `/student-info?parts=${partsParam}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-luxury mb-4">
              اختيار أجزاء القرآن الكريم
            </h1>
            <p className="text-muted-foreground text-lg">
              اختر الأجزاء التي تريد اختبار الطالب فيها
            </p>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 mb-8">
            {quranParts.map((partNumber) => (
              <button
                key={partNumber}
                onClick={() => togglePart(partNumber)}
                className={`
                  aspect-square rounded-xl border-2 transition-all duration-300 hover:scale-105
                  flex flex-col items-center justify-center p-2
                  ${selectedParts.includes(partNumber)
                    ? 'bg-yellow-500 border-yellow-600 text-black'
                    : 'bg-card border-border hover:border-gold text-foreground'
                  }
                `}
              >
                <Book className="h-4 w-4 mb-1" />
                <span className="text-sm font-medium">{partNumber}</span>
              </button>
            ))}
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

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>العودة للرئيسية</span>
            </a>

            <button
              onClick={handleNext}
              disabled={selectedParts.length === 0}
              className={`
                inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${selectedParts.length > 0
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span>التالي</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectParts;