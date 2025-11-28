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
              As a Turing Scholar at the University of Texas at Austin, I'm pursuing a dual degree in 
              Computer Science and Mathematics, bringing both academic excellence and real-world programming 
              experience to my tutoring sessions.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground/90">
              My competitive achievements include reaching USACO Platinum division, qualifying for AIME 
              six times, scoring a perfect 36/36 on the ACT, and authoring research published at the 
              NeurIPS High School Research Conference. These experiences have given me deep insights into 
              problem-solving strategies that I love sharing with my students.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground/90">
              I also earned a score of 5 on <strong>AP Calculus AB</strong>, <strong>AP Calculus BC</strong>, <strong>AP Statistics</strong>, and <strong>AP Computer Science A</strong>, among others.
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
              <h3 className="font-semibold text-lg">UT Austin Turing Scholar</h3>
              <p className="text-sm text-muted-foreground">Dual degree in Computer Science and Mathematics</p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-soft text-center space-y-3 hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Elite Competitor</h3>
              <p className="text-sm text-muted-foreground">USACO Platinum, 6x AIME qualifier, perfect ACT score</p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-soft text-center space-y-3 hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Research Author</h3>
              <p className="text-sm text-muted-foreground">Published at NeurIPS High School Research Conference</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
