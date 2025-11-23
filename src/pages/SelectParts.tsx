import { useState } from "react";
import { ArrowRight, ArrowLeft, Book, Shuffle, X } from "lucide-react";
import Header from "@/components/Header";

const SelectParts = () => {
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomCount, setRandomCount] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingParts, setAnimatingParts] = useState<number[]>([]);

  const quranParts = Array.from({ length: 30 }, (_, i) => i + 1);

  const togglePart = (partNumber: number) => {
    setSelectedParts(prev =>
      prev.includes(partNumber)
        ? prev.filter(p => p !== partNumber)
        : [...prev, partNumber]
    );
  };

  const handleRandomSelection = async () => {
    const count = parseInt(randomCount);
    if (count > 0 && count <= 30) {
      // Close modal first
      setShowRandomModal(false);
      setRandomCount("");

      // Clear current selection
      setSelectedParts([]);

      // Start animation
      setIsAnimating(true);

      // Randomly select final parts
      const shuffled = [...quranParts].sort(() => Math.random() - 0.5);
      const finalSelection = shuffled.slice(0, count);

      // Animation sequence: show random parts flashing for 3.5 seconds
      const animationDuration = 3500; // 3.5 seconds
      const intervalTime = 250; // Change every 250ms (slower)
      const totalSteps = animationDuration / intervalTime;

      let step = 0;
      let currentInterval = intervalTime;

      const runAnimationStep = () => {
        // Show random parts during animation
        const randomAnimationParts = [...quranParts]
          .sort(() => Math.random() - 0.5)
          .slice(0, count);
        setAnimatingParts(randomAnimationParts);

        step++;

        // Gradually slow down the animation (like a slot machine)
        if (step > totalSteps * 0.6) { // After 60% of animation
          currentInterval = currentInterval * 1.15; // Slow down by 15% each step
        }

        if (step >= totalSteps) {
          // End animation and show final selection
          setIsAnimating(false);
          setAnimatingParts([]);
          setSelectedParts(finalSelection.sort((a, b) => a - b));
        } else {
          setTimeout(runAnimationStep, currentInterval);
        }
      };

      // Start the animation
      runAnimationStep();
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
                disabled={isAnimating}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                  ${isAnimating
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
                `}
              >
                <Shuffle className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
                <span>{isAnimating ? 'جاري الاختيار...' : 'اختيار عشوائي'}</span>
              </button>

              {selectedParts.length > 0 && !isAnimating && (
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  مسح الكل
                </button>
              )}
            </div>

            {isAnimating && (
              <div className="mt-4 text-center">
                <p className="text-blue-600 font-medium animate-pulse">
                  🎲 جاري اختيار الأجزاء عشوائياً...
                </p>
              </div>
            )}
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 mb-8">
            {quranParts.map((partNumber) => {
              const isSelected = selectedParts.includes(partNumber);
              const isAnimating = animatingParts.includes(partNumber);

              return (
                <button
                  key={partNumber}
                  onClick={() => !isAnimating && togglePart(partNumber)}
                  disabled={isAnimating}
                  className={`
                    aspect-square rounded-xl border-2 transition-all duration-500 ease-in-out
                    flex flex-col items-center justify-center p-2
                    ${isSelected
                      ? 'bg-yellow-500 border-yellow-600 text-black'
                      : isAnimating
                        ? 'bg-gradient-to-br from-blue-400 to-blue-500 border-blue-400 text-white shadow-lg transform scale-110'
                        : 'bg-card border-border hover:border-gold text-foreground hover:scale-105'
                    }
                    ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <Book className="h-4 w-4 mb-1" />
                  <span className="text-sm font-medium">{partNumber}</span>
                </button>
              );
            })}
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
