import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, MapPin, Users, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventStore } from "@/lib/eventStore";
import { useToast } from "@/hooks/use-toast";

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState("organizing");
  const { toast } = useToast();
  
  // In a real app, this would filter by current user
  const allEvents = eventStore.getAll();
  const organizingEvents = allEvents.filter((e) => e.organizerId === "org-1");
  const attendingEvents = eventStore.getUserRegisteredEvents();

  const EventCard = ({ event, showCancelButton = false }: { event: typeof allEvents[0], showCancelButton?: boolean }) => {
    const handleCancelRegistration = () => {
      const success = eventStore.cancelRegistration(event.id);
      if (success) {
        toast({
          title: "Registration cancelled",
          description: `Your registration for ${event.title} has been cancelled`,
        });
        window.location.reload(); // Refresh to update the list
      } else {
        toast({
          title: "Cancellation failed",
          description: "Unable to cancel your registration.",
          variant: "destructive",
        });
      }
    };

    return (
      <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lifted transition-all hover:-translate-y-1 relative">
        {showCancelButton && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCancelRegistration();
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            title="Cancel registration"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Link to={`/event/${event.id}`}>
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
            {showCancelButton && (
              <Badge variant="secondary" className="mt-3 bg-blue-500/10 text-blue-600">
                Registered
              </Badge>
            )}
          </div>
        </Link>
      </div>
    );
  };

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
                    <EventCard key={event.id} event={event} showCancelButton={true} />
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
