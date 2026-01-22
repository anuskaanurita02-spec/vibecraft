import { Zap, Users, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    title: "Easy Event Creation",
    description: "Set up your event in minutes with our intuitive tools.",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Track registrations, send updates, and engage your audience.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Get insights to optimize your events and grow your reach.",
  },
];

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Create Your Next Event?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of organizers who trust VibeCraft to bring their events to life. Start for free, upgrade when you need more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow h-12 px-8">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="h-12 px-8 border-border hover:bg-secondary">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-soft transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
