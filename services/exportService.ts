
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign
} from 'docx';
import { saveAs } from 'file-saver';
import { LessonPlan } from '../types';

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f8fafc' // Match body bg
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const exportToDocx = async (plan: LessonPlan, filename: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: plan.subject,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: plan.topic,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: plan.gradeLevel,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "MOE B.E. 2551 Aligned | PPP Model", bold: true, color: "4f46e5" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Standards
          new Paragraph({
            text: "Learning Standards",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: plan.strandStandards, italics: true }),
            ],
          }),

          // Indicators
          new Paragraph({
            text: "Indicators",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...plan.indicators.map(ind => new Paragraph({
            children: [new TextRun({ text: ind, italics: true })],
            bullet: { level: 0 },
          })),

          // Key Competencies
          new Paragraph({
            text: "Key Competencies",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...plan.keyCompetencies.map(comp => new Paragraph({
            text: comp,
            bullet: { level: 0 },
          })),

          // Desired Characteristics
          new Paragraph({
            text: "Desired Characteristics",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...plan.desiredCharacteristics.map(char => new Paragraph({
            text: char,
            bullet: { level: 0 },
          })),

          // Objectives
          new Paragraph({
            text: "Learning Objectives",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...plan.objectives.map(obj => new Paragraph({
            text: obj,
            bullet: { level: 0 },
          })),

          // Vocabulary & Grammar
          new Paragraph({
            text: "Vocabulary & Grammar",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Vocabulary: ", bold: true }),
              new TextRun(plan.vocabulary.join(", ")),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Grammar: ", bold: true }),
              new TextRun(plan.grammar),
            ],
            spacing: { after: 400 },
          }),

          // Procedure
          new Paragraph({
            text: "Lesson Procedure (PPP Model)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          
          // Procedure Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createProcedureRow("Warm Up", plan.procedure.warmUp.duration, plan.procedure.warmUp.title, plan.procedure.warmUp.content),
              createProcedureRow("Presentation", plan.procedure.presentation.duration, plan.procedure.presentation.title, plan.procedure.presentation.content),
              createProcedureRow("Practice", plan.procedure.practice.duration, plan.procedure.practice.title, plan.procedure.practice.content),
              createProcedureRow("Production", plan.procedure.production.duration, plan.procedure.production.title, plan.procedure.production.content),
              createProcedureRow("Wrap Up", plan.procedure.wrapUp.duration, plan.procedure.wrapUp.title, plan.procedure.wrapUp.content),
            ],
          }),

          // Worksheet Ideas
          new Paragraph({
            text: "Worksheet Ideas",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: plan.worksheetIdeas,
          }),

          // Materials
          new Paragraph({
            text: "Materials",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...plan.materials.map(m => new Paragraph({
            text: m,
            bullet: { level: 0 },
          })),

          // Assessment
          new Paragraph({
            text: "Assessment",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: plan.assessment,
          }),

          // Reflection
          new Paragraph({
            text: "Reflection",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: plan.reflection, italics: true }),
            ],
          }),

          // Signatures
          new Paragraph({ text: "", spacing: { before: 800 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ text: "__________________________", alignment: AlignmentType.CENTER }),
                      new Paragraph({ text: `(${plan.teacherName})`, alignment: AlignmentType.CENTER }),
                      new Paragraph({ text: "Teacher", alignment: AlignmentType.CENTER }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "__________________________", alignment: AlignmentType.CENTER }),
                      new Paragraph({ text: `(${plan.departmentHeadName})`, alignment: AlignmentType.CENTER }),
                      new Paragraph({ text: "Department Head", alignment: AlignmentType.CENTER }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
};

function createProcedureRow(stage: string, duration: string, title: string, content: string) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 20, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [new TextRun({ text: stage, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `(${duration})`, size: 18, color: "666666" })],
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        width: { size: 80, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true })],
          }),
          new Paragraph({
            text: content,
          }),
        ],
      }),
    ],
  });
}
