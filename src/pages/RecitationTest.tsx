import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, User, Book, MapPin, X } from "lucide-react";
import Header from "@/components/Header";

interface RecitationPosition {
  id: number;
  partNumber: number;
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  position: string;
  description: string;
  fullText?: string;
}

interface QuranVerse {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
  };
}

const RecitationTest = () => {
  const [studentName, setStudentName] = useState("");
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [positions, setPositions] = useState<RecitationPosition[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<RecitationPosition | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Arabic names for all 114 Surahs
  const surahNames: { [key: number]: string } = {
    1: "الفاتحة", 2: "البقرة", 3: "آل عمران", 4: "النساء", 5: "المائدة",
    6: "الأنعام", 7: "الأعراف", 8: "الأنفال", 9: "التوبة", 10: "يونس",
    11: "هود", 12: "يوسف", 13: "الرعد", 14: "إبراهيم", 15: "الحجر",
    16: "النحل", 17: "الإسراء", 18: "الكهف", 19: "مريم", 20: "طه",
    21: "الأنبياء", 22: "الحج", 23: "المؤمنون", 24: "النور", 25: "الفرقان",
    26: "الشعراء", 27: "النمل", 28: "القصص", 29: "العنكبوت", 30: "الروم",
    31: "لقمان", 32: "السجدة", 33: "الأحزاب", 34: "سبأ", 35: "فاطر",
    36: "يس", 37: "الصافات", 38: "ص", 39: "الزمر", 40: "غافر",
    41: "فصلت", 42: "الشورى", 43: "الزخرف", 44: "الدخان", 45: "الجاثية",
    46: "الأحقاف", 47: "محمد", 48: "الفتح", 49: "الحجرات", 50: "ق",
    51: "الذاريات", 52: "الطور", 53: "النجم", 54: "القمر", 55: "الرحمن",
    56: "الواقعة", 57: "الحديد", 58: "المجادلة", 59: "الحشر", 60: "الممتحنة",
    61: "الصف", 62: "الجمعة", 63: "المنافقون", 64: "التغابن", 65: "الطلاق",
    66: "التحريم", 67: "الملك", 68: "القلم", 69: "الحاقة", 70: "المعارج",
    71: "نوح", 72: "الجن", 73: "المزمل", 74: "المدثر", 75: "القيامة",
    76: "الإنسان", 77: "المرسلات", 78: "النبأ", 79: "النازعات", 80: "عبس",
    81: "التكوير", 82: "الانفطار", 83: "المطففين", 84: "الانشقاق", 85: "البروج",
    86: "الطارق", 87: "الأعلى", 88: "الغاشية", 89: "الفجر", 90: "البلد",
    91: "الشمس", 92: "الليل", 93: "الضحى", 94: "الشرح", 95: "التين",
    96: "العلق", 97: "القدر", 98: "البينة", 99: "الزلزلة", 100: "العاديات",
    101: "القارعة", 102: "التكاثر", 103: "العصر", 104: "الهمزة", 105: "الفيل",
    106: "قريش", 107: "الماعون", 108: "الكوثر", 109: "الكافرون", 110: "النصر",
    111: "المسد", 112: "الإخلاص", 113: "الفلق", 114: "الناس"
  };

  // Verse counts for each surah (to generate valid verse numbers)
  const surahVerseCounts: { [key: number]: number } = {
    1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
    11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
    21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
    31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
    41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
    51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
    61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
    71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
    81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
    91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
    101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
    111: 5, 112: 4, 113: 5, 114: 6
  };

  // Mapping of Quran parts (Juz/Para) to their verse ranges
  const quranPartsMapping = {
    1: { startSurah: 1, startVerse: 1, endSurah: 2, endVerse: 141 },
    2: { startSurah: 2, startVerse: 142, endSurah: 2, endVerse: 252 },
    3: { startSurah: 2, startVerse: 253, endSurah: 3, endVerse: 92 },
    4: { startSurah: 3, startVerse: 93, endSurah: 4, endVerse: 23 },
    5: { startSurah: 4, startVerse: 24, endSurah: 4, endVerse: 147 },
    6: { startSurah: 4, startVerse: 148, endSurah: 5, endVerse: 81 },
    7: { startSurah: 5, startVerse: 82, endSurah: 6, endVerse: 110 },
    8: { startSurah: 6, startVerse: 111, endSurah: 7, endVerse: 87 },
    9: { startSurah: 7, startVerse: 88, endSurah: 8, endVerse: 40 },
    10: { startSurah: 8, startVerse: 41, endSurah: 9, endVerse: 92 },
    11: { startSurah: 9, startVerse: 93, endSurah: 11, endVerse: 5 },
    12: { startSurah: 11, startVerse: 6, endSurah: 12, endVerse: 52 },
    13: { startSurah: 12, startVerse: 53, endSurah: 14, endVerse: 52 },
    14: { startSurah: 15, startVerse: 1, endSurah: 16, endVerse: 128 },
    15: { startSurah: 17, startVerse: 1, endSurah: 18, endVerse: 74 },
    16: { startSurah: 18, startVerse: 75, endSurah: 20, endVerse: 135 },
    17: { startSurah: 21, startVerse: 1, endSurah: 22, endVerse: 78 },
    18: { startSurah: 23, startVerse: 1, endSurah: 25, endVerse: 20 },
    19: { startSurah: 25, startVerse: 21, endSurah: 27, endVerse: 55 },
    20: { startSurah: 27, startVerse: 56, endSurah: 29, endVerse: 45 },
    21: { startSurah: 29, startVerse: 46, endSurah: 33, endVerse: 30 },
    22: { startSurah: 33, startVerse: 31, endSurah: 36, endVerse: 27 },
    23: { startSurah: 36, startVerse: 28, endSurah: 39, endVerse: 31 },
    24: { startSurah: 39, startVerse: 32, endSurah: 41, endVerse: 46 },
    25: { startSurah: 41, startVerse: 47, endSurah: 45, endVerse: 37 },
    26: { startSurah: 46, startVerse: 1, endSurah: 51, endVerse: 30 },
    27: { startSurah: 51, startVerse: 31, endSurah: 57, endVerse: 29 },
    28: { startSurah: 58, startVerse: 1, endSurah: 66, endVerse: 12 },
    29: { startSurah: 67, startVerse: 1, endSurah: 77, endVerse: 50 },
    30: { startSurah: 78, startVerse: 1, endSurah: 114, endVerse: 6 }
  };

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const partsParam = urlParams.get('parts');
    const studentParam = urlParams.get('student');
    
    if (partsParam) {
      const parts = partsParam.split(',').map(Number);
      setSelectedParts(parts);
    }
    
    if (studentParam) {
      setStudentName(decodeURIComponent(studentParam));
    }
  }, []);

  useEffect(() => {
    if (selectedParts.length > 0) {
      generatePositions();
    }
  }, [selectedParts]);

  const generateRandomVerseFromPart = (partNumber: number) => {
    const partMapping = quranPartsMapping[partNumber as keyof typeof quranPartsMapping];
    if (!partMapping) return null;

    // Generate random surah within the part range
    const randomSurah = Math.floor(Math.random() * (partMapping.endSurah - partMapping.startSurah + 1)) + partMapping.startSurah;
    
    // Get the actual verse count for this surah
    const verseCount = surahVerseCounts[randomSurah] || 10;
    
    // Calculate minimum verses needed for recitation (at least 10 verses)
    const minVersesForRecitation = 10;
    
    // Determine the maximum starting verse to ensure enough verses remain
    let maxStartingVerse;
    if (verseCount <= minVersesForRecitation) {
      // For very short surahs, start from verse 1
      maxStartingVerse = 1;
    } else {
      // For longer surahs, ensure at least 10 verses remain after starting point
      maxStartingVerse = Math.max(1, verseCount - minVersesForRecitation);
      // Also limit to reasonable starting positions (not beyond 80% of surah)
      maxStartingVerse = Math.min(maxStartingVerse, Math.floor(verseCount * 0.8));
    }
    
    // Generate random verse within the safe range
    const randomVerse = Math.floor(Math.random() * maxStartingVerse) + 1;
    
    return { surah: randomSurah, verse: randomVerse };
  };

  const fetchVerseFromAPI = async (surahNumber: number, verseNumber: number): Promise<QuranVerse | null> => {
    try {
      // Use the surah-specific API endpoint to get the correct verse
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
      const data = await response.json();
      
      if (data.code === 200 && data.data && data.data.ayahs && data.data.ayahs[verseNumber - 1]) {
        const verse = data.data.ayahs[verseNumber - 1];
        return {
          number: verseNumber, // Use the verse number within the surah
          text: verse.text,
          surah: {
            number: surahNumber,
            name: surahNames[surahNumber] || `سورة ${surahNumber}`,
            englishName: data.data.englishName || '',
            englishNameTranslation: data.data.englishNameTranslation || ''
          }
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching verse:', error);
      return null;
    }
  };

  const generatePositions = async () => {
    setIsGenerating(true);
    
    try {
      // Always ensure we have exactly 4 positions
      const newPositions: RecitationPosition[] = [];
      
      // Generate 4 random positions distributed across selected parts
      const shuffledParts = [...selectedParts].sort(() => Math.random() - 0.5);
      
      // Process all 4 positions sequentially to ensure they all complete
      for (let i = 0; i < 4; i++) {
        const partNumber = shuffledParts[i % shuffledParts.length];
        const randomVerse = generateRandomVerseFromPart(partNumber);
        
        if (randomVerse) {
          try {
            // Try to fetch verse from API with timeout
            const verseData = await Promise.race([
              fetchVerseFromAPI(randomVerse.surah, randomVerse.verse),
              new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
            ]);
            
            if (verseData) {
              const verseText = verseData.text;
              const shortText = verseText.length > 50 ? verseText.substring(0, 50) + "..." : verseText;
              const arabicSurahName = surahNames[verseData.surah.number] || verseData.surah.name;
              
              newPositions.push({
                id: i + 1,
                partNumber: partNumber,
                surahNumber: verseData.surah.number,
                surahName: arabicSurahName,
                verseNumber: verseData.number,
                position: `الآية ${verseData.number} من سورة ${arabicSurahName}`,
                description: `من قوله تعالى: ${shortText}`,
                fullText: verseText
              });
            } else {
              throw new Error('No verse data');
            }
          } catch (apiError) {
            // Fallback for this specific position if API fails
            const arabicSurahName = surahNames[randomVerse.surah] || `السورة ${randomVerse.surah}`;
            newPositions.push({
              id: i + 1,
              partNumber: partNumber,
              surahNumber: randomVerse.surah,
              surahName: arabicSurahName,
              verseNumber: randomVerse.verse,
              position: `الآية ${randomVerse.verse} من سورة ${arabicSurahName}`,
              description: `موضع للسرد من الجزء ${partNumber}`,
              fullText: `موضع للسرد من الجزء ${partNumber}`
            });
          }
        } else {
          // Fallback if verse generation fails
          const randomPartIndex = Math.floor(Math.random() * selectedParts.length);
          const fallbackPart = selectedParts[randomPartIndex];
          newPositions.push({
            id: i + 1,
            partNumber: fallbackPart,
            surahNumber: 2,
            surahName: "البقرة",
            verseNumber: 1,
            position: `موضع عشوائي من الجزء ${fallbackPart}`,
            description: `موضع للسرد من الجزء ${fallbackPart}`
          });
        }
      }
      
      // Ensure we always have exactly 4 positions
      while (newPositions.length < 4) {
        const randomPartIndex = Math.floor(Math.random() * selectedParts.length);
        const partNumber = selectedParts[randomPartIndex];
        newPositions.push({
          id: newPositions.length + 1,
          partNumber: partNumber,
          surahNumber: 2,
          surahName: "البقرة",
          verseNumber: 1,
          position: `موضع عشوائي من الجزء ${partNumber}`,
          description: `موضع للسرد من الجزء ${partNumber}`
        });
      }
      
      setPositions(newPositions);
    } catch (error) {
      console.error('Error generating positions:', error);
      // Ultimate fallback - always create 4 positions
      const fallbackPositions: RecitationPosition[] = [];
      for (let i = 0; i < 4; i++) {
        const randomPartIndex = Math.floor(Math.random() * selectedParts.length);
        const partNumber = selectedParts[randomPartIndex];
        fallbackPositions.push({
          id: i + 1,
          partNumber: partNumber,
          surahNumber: 2,
          surahName: "البقرة",
          verseNumber: 1,
          position: `موضع عشوائي من الجزء ${partNumber}`,
          description: `موضع للسرد من الجزء ${partNumber}`
        });
      }
      setPositions(fallbackPositions);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    const partsParam = selectedParts.join(',');
    const nameParam = encodeURIComponent(studentName);
    window.location.href = `/student-info?parts=${partsParam}&student=${nameParam}`;
  };

  const handleRegenerate = () => {
    generatePositions();
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <Header />
      
      {/* Fixed Top Section - Compact Header */}
      <div className="bg-background border-b border-border/50 px-4 py-3">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Left: Main Title and Student */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-bold text-luxury">مواضع السرد</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <User className="h-4 w-4" />
                  <span>الطالب: {studentName}</span>
                </div>
              </div>
            </div>
            
            {/* Right: Regenerate Button */}
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>إعادة توليد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area - Optimized Layout */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
            
            {/* Left Column: Selected Parts - Compact */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-xl border border-border/50 h-fit">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Book className="h-5 w-5 text-gold" />
                    <h3 className="text-base font-semibold text-luxury">
                      الأجزاء المختارة ({selectedParts.length})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {selectedParts.sort((a, b) => a - b).map((part) => (
                      <span
                        key={part}
                        className="bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        الجزء {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Positions - Expanded */}
            <div className="lg:col-span-3">
              <div className="mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-gold" />
                  <h2 className="text-2xl font-bold text-luxury">مواضع السرد (4)</h2>
                </div>
              </div>
              
              <div className="space-y-3">
                {isGenerating ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="glass-effect rounded-xl p-4 border border-border/50 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {positions.map((position) => (
                      <div 
                        key={`position-${position.id}`} 
                        className="glass-effect rounded-xl p-4 border border-border/50 shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          setSelectedPosition(position);
                          setShowModal(true);
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-base font-bold">
                            {position.id}
                          </span>
                          <span className="bg-gold/20 text-gold px-3 py-1 rounded-lg text-base font-medium">
                            الجزء {position.partNumber}
                          </span>
                        </div>
                        <h3 className="font-semibold text-luxury mb-1 text-lg">
                          {position.position}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {position.description}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation - Compact */}
      <div className="bg-background border-t border-border/50 px-4 py-3">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>العودة</span>
            </button>

            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-yellow-500 text-black hover:bg-yellow-600 transition-all duration-300 font-medium"
            >
              <span>اختبار جديد</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedPosition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl border border-border/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-lg font-bold">
                  {selectedPosition.id}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-luxury">
                    {selectedPosition.position}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="bg-gold/20 text-gold px-2 py-1 rounded text-xs">
                      الجزء {selectedPosition.partNumber}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div>
                <h3 className="text-xl font-semibold text-luxury mb-4">النص الكامل:</h3>
                <div className="bg-secondary/30 rounded-lg p-6 border border-border/30">
                  <p className="text-right leading-relaxed text-2xl" style={{ fontFamily: 'Amiri, serif' }}>
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-700 text-white rounded-full text-sm font-bold ml-2 shadow-lg border-2 border-gray-600">
                      {selectedPosition.verseNumber}
                    </span>
                    {selectedPosition.fullText || selectedPosition.description}
                    <span className="text-gold font-bold mr-2">...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecitationTest;
