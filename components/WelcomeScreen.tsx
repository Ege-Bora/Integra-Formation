'use client';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Integra Formation BAE Şirket Kuruluş Anketine hoş geldiniz
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Tahmini maliyetleri görmek için aşağıya tıklayın.
            </p>
            <div className="inline-flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Yaklaşık 5 dakika sürer
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="btn-primary text-lg px-8 py-4"
          >
            Başla
          </button>
        </div>
      </div>
    </div>
  );
}
