import { jsPDF } from 'jspdf';
import { QuotedPartItem } from '../../types/fleet';
import { formatCurrency } from './calculations';

export interface PurchaseOrderData {
  orderNumber: string;
  date: string;
  supplierName?: string;
  items: QuotedPartItem[];
  totalAmount: number;
  estimatedSavings: number;
  notes?: string;
}

export function generatePurchaseOrderPdf(data: PurchaseOrderData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 15;

  // 1. Header Banner (Azul Marinho #0F172A)
  doc.setFillColor(15, 23, 42); // #0F172A
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CABRAL LOCAÇÕES', 15, 18);

  // Subtitle
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129); // #10B981 Emerald
  doc.text('GESTÃO DE FROTAS & MANUTENÇÃO PREDITIVA', 15, 24);

  // Document Title on Right
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDEM DE COMPRA', pageWidth - 15, 18, { align: 'right' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(`Nº: ${data.orderNumber} | Emissão: ${data.date}`, pageWidth - 15, 24, { align: 'right' });

  currentY = 45;

  // 2. Info Box
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.roundedRect(15, currentY, pageWidth - 30, 22, 3, 3, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.setFont('helvetica', 'bold');
  doc.text('EMPRESA SOLICITANTE:', 20, currentY + 7);
  doc.text('FINALIDADE:', 110, currentY + 7);

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.setFont('helvetica', 'normal');
  doc.text('Cabral Locações de Veículos LTDA (CNPJ: 00.000.000/0001-00)', 20, currentY + 14);
  doc.text('Revisão Preventiva & Reposição de Peças', 110, currentY + 14);

  currentY += 32;

  // 3. Items Table Header
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(15, currentY, pageWidth - 30, 8, 'F');

  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('VEÍCULO / PLACA', 18, currentY + 5.5);
  doc.text('DESCRIÇÃO DA PEÇA / ITEM', 65, currentY + 5.5);
  doc.text('QTD', 130, currentY + 5.5, { align: 'center' });
  doc.text('UNIT. (R$)', 155, currentY + 5.5, { align: 'right' });
  doc.text('TOTAL (R$)', pageWidth - 18, currentY + 5.5, { align: 'right' });

  currentY += 8;

  // 4. Table Rows
  data.items.forEach((item, index) => {
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252); // Slate 50
      doc.rect(15, currentY, pageWidth - 30, 8, 'F');
    }

    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59); // Slate 800
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.vehiclePlate} (${item.vehicleModel})`, 18, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.text(item.partName, 65, currentY + 5.5);

    doc.text(`${item.quantity} ${item.unit}`, 130, currentY + 5.5, { align: 'center' });
    doc.text(formatCurrency(item.unitPrice), 155, currentY + 5.5, { align: 'right' });
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(formatCurrency(item.quantity * item.unitPrice), pageWidth - 18, currentY + 5.5, { align: 'right' });

    currentY += 8;
  });

  // Divider line
  doc.setDrawColor(203, 213, 225);
  doc.line(15, currentY, pageWidth - 15, currentY);
  currentY += 6;

  // 5. Totals & Savings Summary Box
  const summaryX = 110;
  const summaryWidth = pageWidth - summaryX - 15;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(summaryX, currentY, summaryWidth, 26, 3, 3, 'F');

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal Bruto:', summaryX + 5, currentY + 7);
  doc.text(formatCurrency(data.totalAmount + data.estimatedSavings), pageWidth - 20, currentY + 7, { align: 'right' });

  doc.setTextColor(16, 185, 129); // Green
  doc.setFont('helvetica', 'bold');
  doc.text('Desconto em Lote (IA):', summaryX + 5, currentY + 13);
  doc.text(`- ${formatCurrency(data.estimatedSavings)}`, pageWidth - 20, currentY + 13, { align: 'right' });

  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // Black
  doc.text('TOTAL LÍQUIDO:', summaryX + 5, currentY + 21);
  doc.text(formatCurrency(data.totalAmount), pageWidth - 20, currentY + 21, { align: 'right' });

  currentY += 34;

  // 6. Signature & Notes Section
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, currentY, pageWidth - 30, 26, 3, 3, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTRUÇÕES DE ENTREGA E FATURAMENTO:', 20, currentY + 7);

  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.text('• As peças devem ser entregues diretamente na oficina indicada com Nota Fiscal vinculada ao CNPJ da Cabral Locações.', 20, currentY + 13);
  doc.text('• Pagamento via PIX no ato do recebimento e conferência física das peças pela equipe mecânica.', 20, currentY + 18);
  doc.text('• Dúvidas ou confirmações: WhatsApp Oficial Cabral Locações.', 20, currentY + 23);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Documento gerado automaticamente pelo Cabral Locações SaaS — Sistema de Gestão de Frotas e Locação', pageWidth / 2, 285, { align: 'center' });

  // Save the PDF
  const filename = `ordem_de_compra_cabral_locacoes_${data.orderNumber.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  doc.save(filename);
}
