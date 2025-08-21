'use client';

interface FinalCostEstimationScreenProps {
  onProceed: () => void;
  onSkip: () => void;
}

export default function FinalCostEstimationScreen({ onProceed, onSkip }: FinalCostEstimationScreenProps) {
  console.log('FinalCostEstimationScreen component rendered');
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
          <div className="mb-8">
            <div className="mb-6">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Formunuz Tamamlandı!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Bilgileriniz başarıyla kaydedildi. Şimdi size özel maliyet tahmini hazırlayabiliriz.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                console.log('Proceed button clicked');
                onProceed();
              }}
              className="w-full text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Endikatif Maliyet Tahmini Görmek İstermisiniz?
            </button>
            
            <button
              onClick={() => {
                console.log('Skip button clicked');
                onSkip();
              }}
              className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors duration-200"
            >
              Şimdilik atlayın
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kişiselleştirilmiş tahmin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
