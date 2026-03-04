"use client";

import Image from "next/image";
import { resume } from "@/data/resume";

export default function Hero() {
  const { name, title, summary, avatar } = resume.personal;

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch("/api/generate-pdf", { method: "POST" });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}_CV.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-primary/20 rotate-45 animate-spin-slow" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-[0_0_40px_rgba(108,99,255,0.3)]">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-text-light mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        {/* Title */}
        <p className="font-heading text-xl md:text-2xl text-text-light/80 mb-6">
          {title}
        </p>

        {/* Summary */}
        <p className="text-text-light/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          {summary}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-heading font-semibold rounded-full hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] transition-all duration-300 hover:scale-105 print:hidden"
          >
            Download PDF
          </button>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary/50 text-text-light font-heading font-semibold rounded-full hover:bg-primary/10 transition-all duration-300 print:hidden"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce print:hidden">
        <div className="w-6 h-10 border-2 border-text-light/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-text-light/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
