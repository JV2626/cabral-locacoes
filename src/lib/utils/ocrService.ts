export interface OcrResult {
  extractedKm: number;
  confidence: number; // 0 to 100%
  detectedPlate?: string;
  isDashboardValid: boolean;
  warnings?: string[];
  readingTimestamp: string;
}

/**
 * Serviço de OCR com IA (Gemini Vision) para leitura automática de painéis de instrumentos
 */
export async function analyzeDashboardImage(
  imageSource: string | File,
  previousKm: number = 40000
): Promise<OcrResult> {
  // Simulação de processamento por IA (Gemini 2.0 Flash Multimodal Vision)
  // Em produção, este método enviaria a imagem para a Cloud Function / Edge Function do Gemini API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula um acréscimo realista de KM semanal (entre 600km e 1.400km rodados na semana)
      const weeklyMileage = Math.floor(Math.random() * (1400 - 650 + 1)) + 650;
      const newKm = previousKm + weeklyMileage;
      const confidence = Math.floor(Math.random() * 6) + 94; // 94% a 99%

      resolve({
        extractedKm: newKm,
        confidence,
        isDashboardValid: true,
        readingTimestamp: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        warnings: newKm <= previousKm ? ['Atenção: O KM detectado é igual ou menor que o anterior.'] : []
      });
    }, 1800);
  });
}
