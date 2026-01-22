import EventCard from "./EventCard";
import { eventStore } from "@/lib/eventStore";

const FeaturedEvents = () => {
  const allEvents = eventStore.getAll();
  const featuredEvent = allEvents.find((e) => e.featured);
  const otherEvents = allEvents.filter((e) => !e.featured).slice(0, 1);
  
  const events = featuredEvent ? [featuredEvent, ...otherEvents] : allEvents.slice(0, 2);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Events
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hand-picked experiences you won't want to miss
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              location={event.location}
              attendees={event.attendees}
              category={event.category}
              price={event.isFree ? undefined : `$${event.price}`}
              image={event.image}
              featured={index === 0 && event.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
