'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, defaultValues, FormData } from '@/lib/schema';
import WelcomeScreen from '@/components/WelcomeScreen';
import CostEstimationScreen from '@/components/CostEstimationScreen';
import FinalCostEstimationScreen from '@/components/FinalCostEstimationScreen';
import StepShell from '@/components/StepShell';
import RadioGroup from '@/components/fields/RadioGroup';
import TextInput from '@/components/fields/TextInput';
import TextArea from '@/components/fields/TextArea';
import MatrixCheckbox from '@/components/fields/MatrixCheckbox';
import CheckboxList from '@/components/fields/CheckboxList';

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for cost estimation screen, 0 for welcome
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFinalCostEstimation, setShowFinalCostEstimation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchedValues = watch();

  // Define all steps with conditional logic
  const getVisibleSteps = () => {
    const steps = [
      { id: 1, key: 'has_company' },
      { id: 2, key: 'value_creation_area' },
      { id: 3, key: 'business_activity_brief' },
      { id: 4, key: 'annual_revenue_usd' },
      { id: 5, key: 'annual_import_usd' },
      { id: 6, key: 'annual_export_usd' },
      { id: 7, key: 'annual_profitability_usd' },
      { id: 8, key: 'interested_services' },
      { id: 9, key: 'preferred_partnership_type' },
      { id: 10, key: 'partnership_structure_text' },
      { id: 11, key: 'residence_permit_request' },
    ];

    // Add conditional step 12
    if (watchedValues.residence_permit_request === 'Evet') {
      steps.push({ id: 12, key: 'residence_permit_headcount' });
    }

    steps.push(
      { id: 13, key: 'physical_office_request' },
      { id: 14, key: 'prev_company_in_uae' },
      { id: 15, key: 'prev_uae_residence_permit' }
    );

    // Add conditional step 16
    if (watchedValues.physical_office_request === 'Evet') {
      steps.push({ id: 16, key: 'office_headcount_request' });
    }

    steps.push({ id: 17, key: 'current_turkish_banks' });
    steps.push({ id: 18, key: 'preferred_jurisdiction' });

    return steps;
  };

  const visibleSteps = getVisibleSteps();
  const totalSteps = visibleSteps.length;

  const handleNext = async () => {
    const currentStepData = visibleSteps[currentStep - 1];
    const stepId = currentStepData.id;
    
    // Questions 4, 5, 6, 7 can be skipped (financial questions)
    const skippableSteps = [4, 5, 6, 7];
    
    if (skippableSteps.includes(stepId)) {
      // Allow skipping these steps
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Validate other steps before proceeding
      const isValid = await trigger(currentStepData.key as keyof FormData);
      
      if (isValid && currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === totalSteps) {
        handleSubmit(onSubmit)();
      } else {
        handleNext();
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    // Check honeypot
    if (data.website) {
      setShowSuccess(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        ip: typeof window !== 'undefined' ? window.location.hostname : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Always show final cost estimation screen regardless of API response
      setShowFinalCostEstimation(true);
    } catch (error) {
      console.error('Submit error:', error);
      // Even if there's an error, show the final screen
      setShowFinalCostEstimation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showFinalCostEstimation) {
    return (
      <FinalCostEstimationScreen 
        onProceed={() => {
          // This will be connected to the next page later
          console.log('Proceeding to cost estimation details');
        }}
        onSkip={() => setShowSuccess(true)}
      />
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Teşekkürler! Bilgileriniz alındı.
            </h1>
            <p className="text-gray-600">
              Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === -1) {
    return <CostEstimationScreen onProceed={() => setCurrentStep(0)} />;
  }

  if (currentStep === 0) {
    return <WelcomeScreen onStart={() => setCurrentStep(1)} />;
  }

  const currentStepData = visibleSteps[currentStep - 1];
  const stepId = currentStepData.id;

  const renderStepContent = () => {
    switch (stepId) {
      case 1:
        return (
          <RadioGroup
            name="has_company"
            options={["Evet", "Hayır"]}
            value={watchedValues.has_company}
            onChange={(value) => setValue('has_company', value as any)}
            register={register}
            error={errors.has_company}
          />
        );

      case 2:
        return (
          <RadioGroup
            name="value_creation_area"
            options={["Ticaret", "Sanayi", "Servis"]}
            value={watchedValues.value_creation_area}
            onChange={(value) => setValue('value_creation_area', value as any)}
            register={register}
            error={errors.value_creation_area}
          />
        );

      case 3:
        return (
          <TextArea
            name="business_activity_brief"
            register={register}
            error={errors.business_activity_brief}
            onKeyDown={handleKeyDown}
          />
        );

      case 4:
        return (
          <RadioGroup
            name="annual_revenue_usd"
            options={["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"]}
            value={watchedValues.annual_revenue_usd}
            onChange={(value) => setValue('annual_revenue_usd', value as any)}
            register={register}
            error={errors.annual_revenue_usd}
          />
        );

      case 5:
        return (
          <RadioGroup
            name="annual_import_usd"
            options={["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"]}
            value={watchedValues.annual_import_usd}
            onChange={(value) => setValue('annual_import_usd', value as any)}
            register={register}
            error={errors.annual_import_usd}
          />
        );

      case 6:
        return (
          <RadioGroup
            name="annual_export_usd"
            options={["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"]}
            value={watchedValues.annual_export_usd}
            onChange={(value) => setValue('annual_export_usd', value as any)}
            register={register}
            error={errors.annual_export_usd}
          />
        );

      case 7:
        return (
          <RadioGroup
            name="annual_profitability_usd"
            options={["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"]}
            value={watchedValues.annual_profitability_usd}
            onChange={(value) => setValue('annual_profitability_usd', value as any)}
            register={register}
            error={errors.annual_profitability_usd}
          />
        );

      case 8:
        return (
          <MatrixCheckbox
            name="interested_services"
            options={[
              { key: 'is_gelistirme', label: 'İş Geliştirme' },
              { key: 'oturma_izni', label: 'Oturma İzni' },
              { key: 'vergi_yonetimi', label: 'Vergi Yönetimi' },
              { key: 'finansman', label: 'Finansman' },
              { key: 'sirket_tasinmasi', label: 'Şirket Taşınması' },
            ]}
            values={watchedValues.interested_services || {}}
            onChange={(values) => setValue('interested_services', values)}
            register={register}
            error={errors.interested_services}
          />
        );

      case 9:
        return (
          <RadioGroup
            name="preferred_partnership_type"
            options={["Kurumsal", "Bireysel", "Diğer"]}
            value={watchedValues.preferred_partnership_type}
            onChange={(value) => setValue('preferred_partnership_type', value as any)}
            register={register}
            error={errors.preferred_partnership_type}
          />
        );

      case 10:
        return (
          <TextInput
            name="partnership_structure_text"
            register={register}
            error={errors.partnership_structure_text}
            onKeyDown={handleKeyDown}
          />
        );

      case 11:
        return (
          <RadioGroup
            name="residence_permit_request"
            options={["Evet", "Hayır"]}
            value={watchedValues.residence_permit_request}
            onChange={(value) => setValue('residence_permit_request', value as any)}
            register={register}
            error={errors.residence_permit_request}
          />
        );

      case 12:
        return (
          <TextInput
            name="residence_permit_headcount"
            type="number"
            register={register}
            error={errors.residence_permit_headcount}
            onKeyDown={handleKeyDown}
          />
        );

      case 13:
        return (
          <RadioGroup
            name="physical_office_request"
            options={["Evet", "Hayır"]}
            value={watchedValues.physical_office_request}
            onChange={(value) => setValue('physical_office_request', value as any)}
            register={register}
            error={errors.physical_office_request}
          />
        );

      case 14:
        return (
          <RadioGroup
            name="prev_company_in_uae"
            options={["Evet", "Hayır"]}
            value={watchedValues.prev_company_in_uae}
            onChange={(value) => setValue('prev_company_in_uae', value as any)}
            register={register}
            error={errors.prev_company_in_uae}
          />
        );

      case 15:
        return (
          <RadioGroup
            name="prev_uae_residence_permit"
            options={["Evet", "Hayır"]}
            value={watchedValues.prev_uae_residence_permit}
            onChange={(value) => setValue('prev_uae_residence_permit', value as any)}
            register={register}
            error={errors.prev_uae_residence_permit}
          />
        );

      case 16:
        return (
          <TextInput
            name="office_headcount_request"
            type="number"
            register={register}
            error={errors.office_headcount_request}
            onKeyDown={handleKeyDown}
          />
        );

      case 17:
        return (
          <CheckboxList
            name="current_turkish_banks"
            options={[
              "Akbank", "Garanti BBVA", "İşbank", "Yapı Kredi", "Halkbank",
              "VakıfBank", "QNB Finansbank", "DenizBank", "TEB", "Ziraat Bankası",
              "Albaraka", "ING Bank", "Diğer"
            ]}
            values={watchedValues.current_turkish_banks || []}
            onChange={(values) => setValue('current_turkish_banks', values)}
            register={register}
            error={errors.current_turkish_banks}
          />
        );

      case 18:
        return (
          <RadioGroup
            name="preferred_jurisdiction"
            options={["DMCC", "IFZA", "Mainland", "Diğer", "Hiçbiri"]}
            value={watchedValues.preferred_jurisdiction}
            onChange={(value) => setValue('preferred_jurisdiction', value as any)}
            register={register}
            error={errors.preferred_jurisdiction}
          />
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (stepId) {
      case 1: return "Hâlihazırda mevcut bir şirketiniz var mı?";
      case 2: return "Şirketinizin değer yaratımını en iyi hangi alan tanımlar?";
      case 3: return "Şirketinizin faaliyet alanını kısaca açıklayınız.";
      case 4: return "Yıllık gelir tutarınızı seçiniz (USD).";
      case 5: return "Yıllık ithalat tutarınızı seçin (USD)";
      case 6: return "Yıllık ihracat tutarınızı seçin (USD)";
      case 7: return "Yıllık kârlılık tutarınızı seçin (USD)";
      case 8: return "Hangi hizmetlerle ilgileniyorsunuz?";
      case 9: return "Tercih edilen ortaklık yapısı";
      case 10: return "Ortaklık yapısını belirtiniz";
      case 11: return "Oturum izni talebiniz var mı?";
      case 12: return "Evet ise kaç kişi adına?";
      case 13: return "Fiziksel ofis talebiniz var mı?";
      case 14: return "Daha önce BAE'de şirket kurdunuz mu?";
      case 15: return "Daha önce BAE'de oturma izni aldınız mı?";
      case 16: return "Evet ise kaç kişilik bir ofis talep ediyorsunuz?";
      case 17: return "Hangi Türk bankası/bankalarıyla şu anda çalışıyorsunuz?";
      case 18: return "Tercih edilen şirket kuruluş yargı yetkisi (jurisdiction) nedir?";
      default: return "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Honeypot field */}
      <input
        type="text"
        {...register('website')}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <StepShell
        title={getStepTitle()}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit(onSubmit)}
        isFirstStep={currentStep === 1}
        isLastStep={currentStep === totalSteps}
        canGoNext={true}
        isSubmitting={isSubmitting}
      >
        {renderStepContent()}
      </StepShell>
    </form>
  );
}
