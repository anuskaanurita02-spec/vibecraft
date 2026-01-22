import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  price?: string;
  image: string;
  featured?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  attendees,
  category,
  price,
  image,
  featured = false,
}: EventCardProps) => {
  const cardContent = (
    <div
      className={`group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-lifted hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-full min-h-[300px]" : "h-48"}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm border-0 hover:bg-background/90">
          {category}
        </Badge>
        {price && (
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 font-semibold text-foreground">
            {price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{attendees} attending</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity">
            Get Tickets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-border hover:bg-secondary">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/event/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default EventCard;
