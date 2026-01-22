import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventStore } from "@/lib/eventStore";

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState("organizing");
  
  // In a real app, this would filter by current user
  const allEvents = eventStore.getAll();
  const organizingEvents = allEvents.filter((e) => e.organizerId === "org-1");
  const attendingEvents = allEvents.filter((e) => e.organizerId !== "org-1").slice(0, 2);

  const EventCard = ({ event }: { event: typeof allEvents[0] }) => (
    <Link to={`/event/${event.id}`}>
      <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lifted transition-all hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden">
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
          {activeTab === "organizing" && event.status === "published" && (
            <Badge variant="secondary" className="mt-3 bg-green-500/10 text-green-600">
              10 Sold
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">My Events</h1>
              <p className="text-muted-foreground">Manage events you're organizing or attending</p>
            </div>
            <Link to="/create">
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="organizing" onValueChange={setActiveTab}>
            <TabsList className="bg-secondary mb-8">
              <TabsTrigger value="organizing">
                Organizing ({organizingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="attending">
                Attending ({attendingEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organizing">
              {organizingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organizingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">You haven't created any events yet.</p>
                  <Link to="/create">
                    <Button className="bg-gradient-primary hover:opacity-90">
                      Create Your First Event
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="attending">
              {attendingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attendingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">You're not attending any events yet.</p>
                  <Link to="/discover">
                    <Button className="bg-gradient-primary hover:opacity-90">
                      Explore Events
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyEvents;
