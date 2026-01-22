import { Music, Cpu, Briefcase, Utensils, Palette, Dumbbell, Heart, Users, Share2, Film } from "lucide-react";

const categories = [
  { name: "Music", icon: Music, count: 234, color: "bg-pink-500/10 text-pink-500" },
  { name: "Technology", icon: Cpu, count: 156, color: "bg-blue-500/10 text-blue-500" },
  { name: "Business", icon: Briefcase, count: 89, color: "bg-emerald-500/10 text-emerald-500" },
  { name: "Food & Drink", icon: Utensils, count: 312, color: "bg-orange-500/10 text-orange-500" },
  { name: "Arts", icon: Palette, count: 178, color: "bg-purple-500/10 text-purple-500" },
  { name: "Sports", icon: Dumbbell, count: 145, color: "bg-red-500/10 text-red-500" },
  { name: "Health", icon: Heart, count: 92, color: "bg-green-500/10 text-green-500" },
  { name: "Community", icon: Users, count: 203, color: "bg-cyan-500/10 text-cyan-500" },
  { name: "Social", icon: Share2, count: 167, color: "bg-indigo-500/10 text-indigo-500" },
  { name: "Entertainment", icon: Film, count: 198, color: "bg-yellow-500/10 text-yellow-500" },
];

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find events that match your interests
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} events</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
