import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, MapPin, Users, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eventStore } from "@/lib/eventStore";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const categories = ["All", "Music", "Technology", "Business", "Food & Drink", "Arts", "Sports", "Health", "Community"];
  
  let events = eventStore.search(searchQuery, selectedCategory);
  
  // Sort events
  events = [...events].sort((a, b) => {
    if (sortBy === "date") return a.date.localeCompare(b.date);
    if (sortBy === "popular") return b.attendees - a.attendees;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Discover Events</h1>
            <p className="text-muted-foreground">Find amazing experiences happening around you</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-4 border border-border mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events, venues, or keywords..."
                  className="pl-12 h-12 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] h-12 bg-secondary border-0">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low</SelectItem>
                    <SelectItem value="price-high">Price: High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {events.length} events
          </p>

          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lifted transition-all hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                        {event.category}
                      </Badge>
                      {!event.isFree && (
                        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-lg px-2 py-1 text-sm font-bold">
                          ${event.price}
                        </div>
                      )}
                      {event.isFree && (
                        <div className="absolute bottom-3 right-3 bg-green-500 text-white rounded-lg px-2 py-1 text-sm font-bold">
                          Free
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No events found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
