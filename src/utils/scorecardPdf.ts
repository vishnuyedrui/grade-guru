import jsPDF from "jspdf";

interface CourseScore {
  name: string;
  credits: number;
  letterGrade: string;
  gradePoint: number;
}

interface ScoreCardData {
  courses: CourseScore[];
  wgp?: number;
  sgpa: number;
  cgpa?: number;
}

export function generateScoreCardPDF(data: ScoreCardData) {
  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(16);
  doc.text("Student Score Card", 105, y, { align: "center" });

  y += 8;
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);

  // Table Header
  y += 10;
  doc.setFontSize(12);
  doc.text("Subject-wise Performance", 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.text("Subject", 14, y);
  doc.text("Credits", 90, y);
  doc.text("Grade", 120, y);
  doc.text("Grade Point", 160, y);

  y += 3;
  doc.line(14, y, 196, y);
  y += 5;

  // Subject rows
  data.courses.forEach((course) => {
    doc.text(course.name || "-", 14, y);
    doc.text(String(course.credits), 90, y);
    doc.text(course.letterGrade, 120, y);
    doc.text(course.gradePoint.toFixed(2), 160, y);
    y += 6;
  });

  // Summary
  y += 4;
  doc.line(14, y, 196, y);
  y += 8;

  doc.setFontSize(12);
  doc.text("Summary", 14, y);

  y += 6;
  doc.setFontSize(11);

  if (data.wgp !== undefined) {
    doc.text(`WGP  : ${data.wgp.toFixed(2)}`, 14, y);
    y += 6;
  }

  doc.text(`SGPA : ${data.sgpa.toFixed(2)}`, 14, y);

  if (data.cgpa !== undefined) {
    y += 6;
    doc.text(`CGPA : ${data.cgpa.toFixed(2)}`, 14, y);
  }

  // Footer
  y += 12;
  doc.setFontSize(9);
  doc.text(
    "This score card is system generated and does not require a signature.",
    105,
    y,
    { align: "center" }
  );

  doc.save("ScoreCard.pdf");
}

