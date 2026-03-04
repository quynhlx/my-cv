import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center text-text-light">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {resume.education.map((edu, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-light">
                      {edu.degree}
                    </h3>
                    <p className="text-secondary font-semibold">{edu.school}</p>
                    <p className="font-mono text-sm text-primary mt-1">
                      {edu.period}
                    </p>
                    {edu.description && (
                      <p className="text-text-light/60 mt-3">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
