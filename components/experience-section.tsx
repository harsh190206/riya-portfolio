'use client'

export default function ExperienceSection() {
  const experiences = [
    {
      title: 'Hands-on Workshop on Genomic DNA Isolation and PCR Based Analysis',
      organization: 'Department of Biotechnology, Ashoka Institute of Technology and Management School of Business',
      location: 'Varanasi',
      date: 'September 15–16, 2025',
      type: 'Workshop',
      skills: ['Genomic DNA Isolation', 'PCR Analysis', 'Lab Techniques'],
    },
    {
      title: 'NGS Essentials: From Sample Preparation to Data Analysis',
      organization: 'Institute of Eminence Science & Research',
      location: 'Kashi Institute of Technology',
      date: '20/04/2025',
      type: 'Training',
      skills: ['Next Generation Sequencing', 'Data Analysis', 'Sample Preparation'],
    },
  ]

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Internships & Trainings
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto" />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500 -translate-x-1/2 shadow-lg shadow-cyan-500/50" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className="absolute left-4 md:left-1/2 top-6 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full -translate-x-2.5 md:-translate-x-3 ring-4 ring-background shadow-lg shadow-cyan-500/50 hover:scale-150 transition-transform duration-300" />

                {/* Content card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-8' : 'md:ml-1/2 md:pl-8'}`}>
                  <div className="group relative bg-gradient-to-r from-slate-800/40 to-slate-900/40 border-2 border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-cyan-200 flex-1 group-hover:text-cyan-100 transition-colors">{exp.title}</h3>
                        <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold whitespace-nowrap ml-2 border border-cyan-500/50 group-hover:bg-cyan-500/30 transition-colors">
                          {exp.type}
                        </span>
                      </div>

                      <p className="text-base text-cyan-400 font-semibold mb-1 group-hover:text-cyan-300 transition-colors">{exp.organization}</p>
                      <p className="text-sm text-foreground/70 mb-3">{exp.location}</p>
                      <p className="text-sm text-cyan-300/70 mb-4 font-medium">{exp.date}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold hover:bg-cyan-500/40 hover:scale-110 transition-all border border-cyan-500/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
