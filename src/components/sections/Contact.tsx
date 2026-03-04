import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  const { email, phone, location, socials } = resume.personal;

  const contactItems = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
    {
      label: "Location",
      value: location,
      href: undefined,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
      ),
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: socials.github, icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
    { name: "LinkedIn", url: socials.linkedin, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-deep-space-1">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-text-light">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-text-light/60 mb-12 max-w-lg mx-auto">
            I&apos;m always open to new opportunities and interesting projects.
            Let&apos;s connect!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,99,255,0.2)] block"
              >
                <svg
                  className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
                <p className="text-text-light/60 text-sm">{item.label}</p>
                <p className="text-text-light font-medium mt-1">{item.value}</p>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex justify-center gap-4">
            {socialLinks
              .filter((link) => link.url)
              .map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all duration-300 group"
                  aria-label={link.name}
                >
                  <svg
                    className="w-5 h-5 text-text-light/60 group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <p className="text-text-light/30 text-sm mt-16">
            &copy; {new Date().getFullYear()} {resume.personal.name}.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
