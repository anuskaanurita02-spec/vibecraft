import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { eventStore } from "@/lib/eventStore";

const UpcomingEvents = () => {
  const events = eventStore.getUpcoming().slice(0, 5);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Discover what's happening in your area and beyond
            </p>
          </div>
          <Link to="/discover">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Events
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-lifted overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold text-foreground">Event</TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Tickets
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => {
                const spotsLeft = event.capacity - event.attendees;
                return (
                  <TableRow
                    key={event.id}
                    className="cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => window.location.href = `/event/${event.id}`}
                  >
                    <TableCell className="font-medium text-foreground">
                      {event.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })} at {event.time}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {event.location}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        spotsLeft < 100
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-primary/10 text-primary"
                      }`}>
                        <Users className="w-3 h-3" />
                        {spotsLeft < 100 ? `${spotsLeft} left` : `${event.attendees} attending`}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
