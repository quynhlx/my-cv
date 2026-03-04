import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST() {
  let browser = null;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    await page.waitForTimeout(1000);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5cm",
        right: "0.5cm",
        bottom: "0.5cm",
        left: "0.5cm",
      },
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Quynh_Le_CV.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
