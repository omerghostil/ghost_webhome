import { jsPDF } from "jspdf";
import type { MemoryEntry } from "./ghost-brain";
import { MIRIAM_LIBRE_REGULAR, MIRIAM_LIBRE_BOLD } from "./fonts/miriam-libre";

function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("MiriamLibre-Regular.ttf", MIRIAM_LIBRE_REGULAR);
  doc.addFont("MiriamLibre-Regular.ttf", "MiriamLibre", "normal");

  doc.addFileToVFS("MiriamLibre-Bold.ttf", MIRIAM_LIBRE_BOLD);
  doc.addFont("MiriamLibre-Bold.ttf", "MiriamLibre", "bold");
}

function setFont(doc: jsPDF, style: "normal" | "bold" = "normal") {
  doc.setFont("MiriamLibre", style);
}

function rtlText(doc: jsPDF, text: string, x: number, y: number, options?: { align?: "center" | "right" | "left" }) {
  const align = options?.align ?? "right";
  doc.text(text, x, y, { align });
}

export function generateGhostPdf(memoryLog: MemoryEntry[]): Blob {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  registerFonts(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const rightEdge = pageWidth - margin;
  let y = margin;

  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 50, "F");

  setFont(doc, "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  rtlText(doc, "Ghost", pageWidth / 2, 22, { align: "center" });

  setFont(doc, "normal");
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  rtlText(doc, "\u05D3\u05D5\u05D7 \u05E4\u05D2\u05D9\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4", pageWidth / 2, 30, { align: "center" });

  const now = new Date();
  const dateStr =
    now.toLocaleDateString("he-IL") +
    " " +
    now.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
  rtlText(doc, dateStr, pageWidth / 2, 38, { align: "center" });

  y = 60;

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  setFont(doc, "bold");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(14);
  rtlText(doc, "\u05D9\u05D5\u05DE\u05DF \u05D6\u05D9\u05DB\u05E8\u05D5\u05DF", rightEdge, y);
  y += 8;

  setFont(doc, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  rtlText(doc, `\u05E1\u05D4\u05F4\u05DB \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA: ${memoryLog.length}`, rightEdge, y);
  y += 10;

  for (const entry of memoryLog) {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = margin;
    }

    const badge =
      entry.type === "change_detected"
        ? "[\u05E9\u05D9\u05E0\u05D5\u05D9]"
        : "[\u05E1\u05E8\u05D9\u05E7\u05D4]";
    const badgeColor =
      entry.type === "change_detected" ? [220, 80, 60] : [80, 140, 200];

    setFont(doc, "bold");
    doc.setFontSize(8);
    doc.setTextColor(badgeColor[0], badgeColor[1], badgeColor[2]);
    rtlText(doc, `${badge}  ${entry.timestamp}`, rightEdge, y);
    y += 5;

    setFont(doc, "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const lines: string[] = doc.splitTextToSize(entry.description, contentWidth);
    for (const line of lines) {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = margin;
      }
      rtlText(doc, line, rightEdge, y);
      y += 4.5;
    }
    y += 4;

    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    setFont(doc, "normal");
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    rtlText(doc, "\u00A9 2026 Ghost AI \u2014 ghost-il.com", pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
  }

  return doc.output("blob");
}
