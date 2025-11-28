import { Button } from "@/components/ui/button";
import headshotImage from "@/assets/headshot.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="section-padding min-h-screen flex items-center bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container-width w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Personalized Online Tutoring in{" "}
              <span className="text-primary">Math & Coding</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert 1-on-1 online lessons designed to build confidence, improve grades, 
              and unlock your full potential in mathematics and computer science.
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="text-lg shadow-md hover:shadow-lg transition-all"
              >
                Book a Session
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img 
                src={headshotImage} 
                alt="Sarthak Jain - Math and Coding Tutor" 
                className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
