import { GraduationCap, Code, Award, Sparkles, Target, BookOpen } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Me</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        
        <div className="max-w-5xl mx-auto">
          {/* Introduction with photo placeholder area */}
          <div className="bg-background rounded-2xl shadow-soft p-8 md:p-10 mb-10">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                Hi! I'm <span className="text-primary font-bold">Sarthak</span>, a passionate educator 
                specializing in <span className="bg-primary/10 px-2 py-0.5 rounded-md">mathematics</span> and{" "}
                <span className="bg-primary/10 px-2 py-0.5 rounded-md">computer science</span>.
              </p>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed ml-9">
              As a <span className="font-semibold text-foreground">Turing Scholar at UT Austin</span>, 
              I'm pursuing a dual degree in Computer Science and Mathematics. I bring both academic 
              excellence and real-world programming experience to every tutoring session.
            </p>
          </div>

          {/* Achievements Grid - More Visual */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="group bg-background p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-l-4 border-primary">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">UT Austin Turing Scholar</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dual degree in Computer Science & Mathematics from one of the nation's top programs
              </p>
            </div>

            <div className="group bg-background p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-l-4 border-amber-500">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Elite Competitor</h3>
              <div className="space-y-1.5">
                <p className="text-sm"><span className="font-semibold text-amber-600">USACO Platinum</span> division</p>
                <p className="text-sm"><span className="font-semibold text-amber-600">6× AIME</span> qualifier</p>
                <p className="text-sm"><span className="font-semibold text-amber-600">Perfect 36</span> ACT score</p>
              </div>
            </div>

            <div className="group bg-background p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-l-4 border-emerald-500">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Published Researcher</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Research published at the <span className="font-semibold text-emerald-600">NeurIPS</span> High School Research Conference
              </p>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Academic Excellence</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Completed <span className="font-semibold text-primary">20+ AP and college-level courses</span> in 
                high school. Scored <span className="font-semibold">5s on AP Calculus AB/BC, AP Computer Science A, 
                AP Physics</span>, and many more. This gives me the depth across subjects to help you succeed.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Personalized Approach</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Whether you're <span className="font-semibold">struggling with a concept</span>, 
                <span className="font-semibold"> preparing for exams</span>, or 
                <span className="font-semibold"> advancing your skills</span>, I create custom lesson plans 
                with clear explanations, practical examples, and plenty of practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
