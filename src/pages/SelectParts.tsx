import { useState } from "react";
import { ArrowRight, ArrowLeft, Book, Shuffle, X } from "lucide-react";
import Header from "@/components/Header";

const SelectParts = () => {
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomCount, setRandomCount] = useState("");

  const quranParts = Array.from({ length: 30 }, (_, i) => i + 1);

  const togglePart = (partNumber: number) => {
    setSelectedParts(prev =>
      prev.includes(partNumber)
        ? prev.filter(p => p !== partNumber)
        : [...prev, partNumber]
    );
  };

  const handleRandomSelection = () => {
    const count = parseInt(randomCount);
    if (count > 0 && count <= 30) {
      // Randomly select parts from all available parts (1-30)
      const shuffled = [...quranParts].sort(() => Math.random() - 0.5);
      const randomlySelected = shuffled.slice(0, count);

      // Replace existing selection with new random selection
      setSelectedParts(randomlySelected.sort((a, b) => a - b));
      setShowRandomModal(false);
      setRandomCount("");
    }
  };

  const closeModal = () => {
    setShowRandomModal(false);
    setRandomCount("");
  };

  const clearSelection = () => {
    setSelectedParts([]);
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

          {/* Random Selection Controls */}
          <div className="glass-effect rounded-xl p-6 mb-8 border border-border/50">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowRandomModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
              >
                <Shuffle className="h-4 w-4" />
                <span>اختيار عشوائي</span>
              </button>

              {selectedParts.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  مسح الكل
                </button>
              )}
            </div>
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

      {/* Random Selection Modal */}
      {showRandomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-6 max-w-md w-full mx-4 border border-border shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-luxury">اختيار عشوائي</h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-muted-foreground mb-4">
              كم عدد الأجزاء التي تريد اختيارها عشوائياً؟
            </p>

            <div className="space-y-4">
              <input
                type="number"
                min="1"
                max="30"
                value={randomCount}
                onChange={(e) => setRandomCount(e.target.value)}
                placeholder="أدخل عدد الأجزاء (1-30)"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-center text-lg"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-all duration-300"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleRandomSelection}
                  disabled={!randomCount || parseInt(randomCount) <= 0 || parseInt(randomCount) > 30}
                  className="flex-1 px-4 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                >
                  اختر عشوائياً
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectParts;
