import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Ticket, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventStore } from "@/lib/eventStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = eventStore.getById(id || "");
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Event not found</h1>
            <Link to="/">
              <Button>Go back home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isRegistered = eventStore.isUserRegistered(event.id);

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      const success = eventStore.register(event.id);
      setIsRegistering(false);
      if (success) {
        toast({
          title: "Registration successful!",
          description: `You're now registered for ${event.title}`,
        });
        window.location.reload(); // Refresh to update UI
      } else {
        toast({
          title: "Registration failed",
          description: "This event is at full capacity.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleCancelRegistration = () => {
    setIsCancelling(true);
    setTimeout(() => {
      const success = eventStore.cancelRegistration(event.id);
      setIsCancelling(false);
      if (success) {
        toast({
          title: "Registration cancelled",
          description: `Your registration for ${event.title} has been cancelled`,
        });
        window.location.reload(); // Refresh to update UI
      } else {
        toast({
          title: "Cancellation failed",
          description: "Unable to cancel your registration.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const spotsLeft = event.capacity - event.attendees;
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to events
              </Link>
              <Badge className="mb-3 bg-primary/90">{event.category}</Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <p className="text-white/80">by {event.organizer}</p>
              <div className="flex flex-wrap items-center gap-6 mt-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">About This Event</h2>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      Join us for an unforgettable experience! This event brings together enthusiasts from all backgrounds to share, learn, and connect. Whether you're a seasoned professional or just starting out, there's something for everyone.
                    </p>
                  </div>

                  {event.whatToExpect.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                      <ul className="space-y-2">
                        {event.whatToExpect.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="discussion" className="mt-6">
                  <Card className="border-border">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        Discussion forum coming soon! Connect with other attendees and ask questions.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {event.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Ticket Card */}
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-4xl font-bold text-foreground">
                      {event.isFree ? "Free" : `$${event.price}`}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {isRegistered ? (
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-50 h-12 text-lg"
                        onClick={handleCancelRegistration}
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Cancelling..." : "Cancel Registration"}
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg"
                        onClick={handleRegister}
                        disabled={isRegistering || spotsLeft <= 0}
                      >
                        <Ticket className="w-5 h-5 mr-2" />
                        {isRegistering ? "Processing..." : spotsLeft <= 0 ? "Sold Out" : "Get Tickets"}
                      </Button>
                    )}
                    
                    {isRegistered && (
                      <div className="text-center">
                        <p className="text-sm text-green-600 font-medium">✓ You're registered for this event</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <span>{spotsLeft} spots left</span>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Organized by</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {event.organizer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{event.organizer}</p>
                        <p className="text-xs text-muted-foreground">Event Organizer</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
