import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Video, Clock, Target } from "lucide-react";

const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Pricing & Format</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-medium">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-baseline gap-2 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$75</span>
                  <span className="text-2xl text-muted-foreground">/hour</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Professional, personalized 1-on-1 tutoring sessions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">100% Online</h3>
                    <p className="text-sm text-muted-foreground">
                      Convenient video sessions via Zoom or Google Meet from anywhere
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Book sessions at times that work best for your schedule
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Personalized Plans</h3>
                    <p className="text-sm text-muted-foreground">
                      Custom lesson plans tailored to your specific goals and learning style
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">No Hidden Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple, transparent pricing with no long-term commitments required
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-lg mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Customized lesson plans based on your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Homework help and assignment review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Exam preparation and test-taking strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Project support and code debugging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Practice problems and supplemental materials</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button size="lg" onClick={scrollToContact} className="text-lg px-8">
                  Schedule Your First Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
