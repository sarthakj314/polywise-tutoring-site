import { GraduationCap, Code, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Me</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-foreground/90">
              Hi! I'm Sarthak, a passionate educator specializing in mathematics and computer science. 
              As a student at the University of California, Berkeley, pursuing Computer Science, I bring 
              both academic excellence and real-world programming experience to my tutoring sessions.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground/90">
              My journey in competitive programming, including participation in the USA Computing Olympiad 
              and various math competitions, has given me deep insights into problem-solving strategies that 
              I love sharing with my students. I've helped students excel in AP Computer Science, prepare for 
              programming contests, and build strong foundations in mathematics from algebra through calculus.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground/90">
              Whether you're struggling with a specific concept, preparing for an exam, or looking to advance 
              your skills, I create personalized lesson plans tailored to your learning style and goals. My 
              approach combines clear explanations, practical examples, and plenty of practice to ensure lasting 
              understanding and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="bg-background p-6 rounded-xl shadow-soft text-center space-y-3 hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">UC Berkeley Student</h3>
              <p className="text-sm text-muted-foreground">Studying Computer Science at one of the world's top universities</p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-soft text-center space-y-3 hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Contest Experience</h3>
              <p className="text-sm text-muted-foreground">USACO competitor with strong algorithmic problem-solving skills</p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-soft text-center space-y-3 hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Proven Results</h3>
              <p className="text-sm text-muted-foreground">Helping students achieve their academic goals and build confidence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
