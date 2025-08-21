'use client';

interface CostEstimationScreenProps {
  onProceed: () => void;
}

export default function CostEstimationScreen({ onProceed }: CostEstimationScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{background: 'linear-gradient(135deg, rgb(246, 246, 246) 0%, rgb(240, 240, 240) 100%)'}}>
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
          <div className="mb-8">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full mb-6" style={{backgroundColor: 'rgba(4, 20, 37, 0.1)'}}>
                <svg className="w-12 h-12" style={{color: 'rgb(4, 20, 37)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                BAE Şirket Kuruluş Maliyetleri
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Şirket kuruluş süreciniz için detaylı maliyet tahmini alın
              </p>
            </div>
          </div>
          
          <button
            onClick={onProceed}
            className="btn-primary text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl"
          >
            Maliyet Tahmini Görmek İstermisiniz?
          </button>
          
          <div className="mt-6 text-sm text-gray-500">
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ücretsiz ve hızlı tahmin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
