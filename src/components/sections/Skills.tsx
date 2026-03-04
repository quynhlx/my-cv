import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-bg-light">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            Tech{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.skillCategories.map((category, index) => (
            <ScrollReveal key={category.label} delay={index * 150}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-text-dark rounded-full border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
