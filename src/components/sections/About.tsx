import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const { summary } = resume.personal;
  const yearsOfExperience = 12;

  return (
    <section id="about" className="py-20 px-6 bg-bg-light">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl leading-relaxed text-text-dark/80 text-center mb-12">
            {summary}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {yearsOfExperience}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">
                Years Experience
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {resume.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">Technologies</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {resume.experience.length}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">
                Companies
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
