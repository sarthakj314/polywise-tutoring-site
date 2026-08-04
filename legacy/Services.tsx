import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Code2, GraduationCap, Trophy, FileText, Zap } from "lucide-react";

const Services = () => {
  const testPrepTopics = [
    { name: "SAT", detail: "All sections: Math, Reading & Writing" },
    { name: "ACT", detail: "All sections: Math, Science, English, Reading" },
  ];

  const apCourses = [
    "AP Calculus AB/BC",
    "AP Computer Science A",
    "AP Computer Science Principles",
    "AP Physics 1, 2, C",
    "AP Statistics",
    "AP Precalculus",
  ];

  const competitiveTopics = [
    { name: "USACO", detail: "Bronze → Silver → Gold → Platinum" },
    { name: "AMC 8/10/12", detail: "Math competition fundamentals" },
    { name: "AIME", detail: "Advanced problem-solving strategies" },
    { name: "Codeforces/LeetCode", detail: "Algorithm & interview prep" },
  ];

  const mathTopics = [
    "Algebra & Pre-Algebra",
    "Geometry & Trigonometry",
    "Pre-Calculus",
    "Calculus & Beyond",
    "Statistics & Probability",
    "Linear Algebra",
  ];

  const csTopics = [
    "Python & Java Programming",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Machine Learning Basics",
    "Web Development Fundamentals",
    "Debugging & Problem Solving",
  ];

  return (
    <section id="services" className="section-padding bg-secondary/20 border-y border-border/50">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What I Teach</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          From standardized tests to competitive programming, I offer personalized tutoring across a wide range of subjects and skill levels.
        </p>
        
        {/* Main Service Categories */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          
          {/* Test Prep Card */}
          <Card className="border-2 hover:border-amber-500/50 transition-all hover:shadow-medium group">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-amber-500" />
              </div>
              <CardTitle className="text-xl">Standardized Tests</CardTitle>
              <p className="text-sm text-muted-foreground">Complete prep for college admissions</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {testPrepTopics.map((topic) => (
                  <li key={topic.name} className="border-l-2 border-amber-500/30 pl-3">
                    <span className="font-semibold text-amber-500">{topic.name}</span>
                    <p className="text-sm text-muted-foreground">{topic.detail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* AP Courses Card */}
          <Card className="border-2 hover:border-emerald-500/50 transition-all hover:shadow-medium group">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-emerald-500" />
              </div>
              <CardTitle className="text-xl">AP Courses</CardTitle>
              <p className="text-sm text-muted-foreground">Ace your Advanced Placement exams</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {apCourses.map((course) => (
                  <li key={course} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-sm">{course}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Competitions Card */}
          <Card className="border-2 hover:border-violet-500/50 transition-all hover:shadow-medium group">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-violet-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-violet-500" />
              </div>
              <CardTitle className="text-xl">Competitions</CardTitle>
              <p className="text-sm text-muted-foreground">Stand out with competitive achievements</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {competitiveTopics.map((topic) => (
                  <li key={topic.name} className="border-l-2 border-violet-500/30 pl-3">
                    <span className="font-semibold text-violet-500">{topic.name}</span>
                    <p className="text-sm text-muted-foreground">{topic.detail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Core Subjects Row */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Mathematics */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Mathematics</CardTitle>
                  <p className="text-sm text-muted-foreground">All levels from basics to advanced</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {mathTopics.map((topic) => (
                  <span key={topic} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Computer Science */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Computer Science</CardTitle>
                  <p className="text-sm text-muted-foreground">Programming & software skills</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {csTopics.map((topic) => (
                  <span key={topic} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Support Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Don't see what you need?</h3>
              <p className="text-muted-foreground">
                I also help with homework, project debugging, college application essays, and more. 
                Reach out and let's discuss how I can help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
