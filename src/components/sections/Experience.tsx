import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center text-text-light">
            Work{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </ScrollReveal>

        <Timeline>
          {resume.experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <TimelineItem>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="font-heading text-xl font-bold text-text-light">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-sm text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-heading text-secondary font-semibold mb-3">
                    {exp.company}
                  </p>
                  <p className="text-text-light/60 mb-4">{exp.description}</p>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-text-light/70 text-sm flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 shrink-0">&#9654;</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-primary/20 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TimelineItem>
            </ScrollReveal>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
