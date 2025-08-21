import { z } from 'zod';

export const formSchema = z.object({
  // Honeypot field
  website: z.string().optional(),
  
  // Screen 1 - Q1
  has_company: z.enum(["Evet", "Hayır"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 2 - Q2
  value_creation_area: z.enum(["Ticaret", "Sanayi", "Servis"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 3 - Q3
  business_activity_brief: z.string().min(1, "Bu alan zorunludur. Lütfen şirketinizin faaliyet alanını kısaca açıklayınız."),
  
  // Screen 4 - Q4
  annual_revenue_usd: z.enum(["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 5 - Q5
  annual_import_usd: z.enum(["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 6 - Q6
  annual_export_usd: z.enum(["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 7 - Q7
  annual_profitability_usd: z.enum(["5M'nin altında", "5M – 25M arası", "25M'nin üzerinde"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 8 - Q8 (Matrix - multiple selection)
  interested_services: z.object({
    is_gelistirme: z.boolean().optional(),
    oturma_izni: z.boolean().optional(),
    vergi_yonetimi: z.boolean().optional(),
    finansman: z.boolean().optional(),
    sirket_tasinmasi: z.boolean().optional(),
  }).refine((data) => {
    return Object.values(data).some(value => value === true);
  }, {
    message: "Lütfen en az bir hizmet seçiniz."
  }),
  
  // Screen 9 - Q9
  preferred_partnership_type: z.enum(["Kurumsal", "Bireysel", "Diğer"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 10 - Q10
  partnership_structure_text: z.string().min(1, "Bu alan zorunludur. Lütfen ortaklık yapısını belirtiniz."),
  
  // Screen 11 - Q11
  residence_permit_request: z.enum(["Evet", "Hayır"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 12 - Q12 (conditional on Q11 = Evet)
  residence_permit_headcount: z.preprocess(
    v => (v === "" || v == null ? undefined : Number(v)),
    z.number().int().positive().optional()
  ),
  
  // Screen 13 - Q13
  physical_office_request: z.enum(["Evet", "Hayır"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 14 - Q14
  prev_company_in_uae: z.enum(["Evet", "Hayır"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 15 - Q15
  prev_uae_residence_permit: z.enum(["Evet", "Hayır"], {
    errorMap: () => ({ message: "Lütfen yukarıdakilerden birini seçiniz." })
  }).optional(),
  
  // Screen 16 - Q16 (conditional on Q13 = Evet)
  office_headcount_request: z.preprocess(
    v => (v === "" || v == null ? undefined : Number(v)),
    z.number().int().positive().optional()
  ),
  
  // Screen 17 - Q17 (Matrix - multiple selection)
  current_turkish_banks: z.array(z.enum([
    "Akbank",
    "Garanti BBVA",
    "İşbank",
    "Yapı Kredi",
    "Halkbank",
    "VakıfBank",
    "QNB Finansbank",
    "DenizBank",
    "TEB",
    "Ziraat Bankası",
    "Albaraka",
    "ING Bank",
    "Diğer"
  ])).min(1, "Lütfen en az bir banka seçiniz."),

  // Screen 18 - Q18
  preferred_jurisdiction: z.string().min(1, "Lütfen bir seçenek belirtin"),
  
  // Screen 19 - Q19
  indicative_cost_calculation: z.string().min(1, "Lütfen bir seçenek belirtin"),
  
  // Screen 20 - Q20
  document_upload: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  website: "",
  has_company: undefined,
  value_creation_area: undefined,
  business_activity_brief: "",
  annual_revenue_usd: undefined,
  annual_import_usd: undefined,
  annual_export_usd: undefined,
  annual_profitability_usd: undefined,
  interested_services: {
    is_gelistirme: false,
    oturma_izni: false,
    vergi_yonetimi: false,
    finansman: false,
    sirket_tasinmasi: false,
  },
  preferred_partnership_type: undefined,
  partnership_structure_text: "",
  residence_permit_request: undefined,
  residence_permit_headcount: undefined,
  physical_office_request: undefined,
  prev_company_in_uae: undefined,
  prev_uae_residence_permit: undefined,
  office_headcount_request: undefined,
  current_turkish_banks: [],
  preferred_jurisdiction: "",
  indicative_cost_calculation: "",
  document_upload: "",
};
