import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "High School Student",
      text: "My calculus grades improved dramatically after just a few sessions. The explanations are clear and easy to understand!"
    },
    {
      name: "Michael T.",
      role: "AP CS Student",
      text: "Thanks to the personalized help, I not only passed my AP Computer Science exam but got a 5! The problem-solving strategies were invaluable."
    },
    {
      name: "Jennifer L.",
      role: "Parent",
      text: "My son went from struggling with algebra to actually enjoying math. The patient, encouraging teaching style made all the difference."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-width">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What Students Say</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-foreground/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
