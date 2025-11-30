import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Code2, Brain, Trophy } from "lucide-react";

const Services = () => {
  const mathTopics = [
    "SAT/ACT Math Prep",
    "Calculus (AP & beyond)",
    "AMC/AIME Math Competition Prep",
    "Statistics & Probability",
    "Algebra & Pre-Algebra",
    "Geometry",
    "Trigonometry",
    "Pre-Calculus"
  ];

  const codingTopics = [
    "AP Computer Science A",
    "AP Computer Science Principles",
    "USACO Contest Preparation",
    "Machine Learning Principles",
    "Python Programming",
    "Java Programming",
    "Data Structures & Algorithms",
    "Object-Oriented Programming"
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What I Teach</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mathematics Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Mathematics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                From foundational concepts to advanced calculus, I help students build strong mathematical reasoning and problem-solving skills.
              </p>
              <ul className="space-y-2">
                {mathTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Coding Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Computer Science</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Master programming fundamentals, algorithms, and competitive programming with hands-on guidance and real-world applications.
              </p>
              <ul className="space-y-2">
                {codingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
          <div className="flex items-start gap-4 p-6 bg-secondary/50 rounded-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Homework Help & Project Support</h3>
              <p className="text-sm text-muted-foreground">
                Get assistance with assignments, debugging code, and completing projects with clear explanations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-secondary/50 rounded-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Test Prep & Competition Training</h3>
              <p className="text-sm text-muted-foreground">
                Focused preparation for AP exams, SAT/ACT, and programming competitions like USACO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
