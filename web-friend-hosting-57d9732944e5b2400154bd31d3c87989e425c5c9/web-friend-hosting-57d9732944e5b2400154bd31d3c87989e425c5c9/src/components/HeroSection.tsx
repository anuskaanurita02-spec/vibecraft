import { Search, MapPin, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  const popularCategories = ["Music", "Technology", "Food & Drink", "Arts"];
  const categoryOptions = ["All Categories", "Music", "Technology", "Business", "Food & Drink", "Arts", "Sports", "Health", "Community", "Social"];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Discover 10,000+ events happening near you
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Create Moments
            <br />
            <span className="text-gradient">That Matter</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            The all-in-one platform to discover amazing events, create unforgettable experiences, and connect with people who share your passions.
          </p>

          {/* Search Bar */}
          <div className="bg-card rounded-2xl p-3 shadow-lifted border border-border max-w-4xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="pl-12 h-12 bg-secondary border-0 focus-visible:ring-primary"
                />
              </div>
              <div className="flex-1 relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Date"
                  className="pl-12 h-12 bg-secondary border-0 focus-visible:ring-primary"
                />
              </div>
              <div className="flex-1 relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
                <Select defaultValue="All Categories">
                  <SelectTrigger className="pl-12 h-12 bg-secondary border-0 focus:ring-primary">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-12 px-8 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <span className="text-sm text-muted-foreground font-medium">Popular:</span>
            {popularCategories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary text-sm font-medium transition-all"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
