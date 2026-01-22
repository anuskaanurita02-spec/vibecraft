import eventTechImage from "@/assets/event-tech.jpg";
import eventJazzImage from "@/assets/event-jazz.jpg";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  attendees: number;
  capacity: number;
  category: string;
  price: number;
  isFree: boolean;
  image: string;
  featured: boolean;
  status: "draft" | "published";
  organizer: string;
  organizerId: string;
  createdAt: string;
  faqs: { question: string; answer: string }[];
  whatToExpect: string[];
}

// Mock events store - in real app this would be from database
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Summit 2025",
    description: "Join the biggest technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
    date: "2025-02-15",
    time: "09:00",
    location: "San Francisco, CA",
    address: "Moscone Center, 747 Howard St",
    attendees: 847,
    capacity: 1000,
    category: "Technology",
    price: 299,
    isFree: false,
    image: eventTechImage,
    featured: true,
    status: "published",
    organizer: "TechEvents Inc.",
    organizerId: "org-1",
    createdAt: "2025-01-01",
    faqs: [
      { question: "What should I bring?", answer: "Please bring a valid ID and your ticket (digital or printed)." },
      { question: "Is parking available?", answer: "Yes, there is ample parking available at the venue." },
      { question: "Can I get a refund?", answer: "Refunds are available up to 7 days before the event." },
    ],
    whatToExpect: [
      "Expert-led sessions and workshops",
      "Networking opportunities with industry leaders",
      "Interactive activities and demonstrations",
      "Exclusive access to resources and materials",
    ],
  },
  {
    id: "2",
    title: "Jazz Night Under the Stars",
    description: "An unforgettable evening of smooth jazz performances in a beautiful open-air setting.",
    date: "2025-02-20",
    time: "19:00",
    location: "Central Park, NYC",
    address: "Central Park Bandshell",
    attendees: 320,
    capacity: 500,
    category: "Music",
    price: 45,
    isFree: false,
    image: eventJazzImage,
    featured: false,
    status: "published",
    organizer: "Jazz Foundation",
    organizerId: "org-2",
    createdAt: "2025-01-05",
    faqs: [
      { question: "What should I bring?", answer: "Bring a blanket or lawn chair for seating." },
      { question: "Is food available?", answer: "Food trucks will be on site." },
      { question: "What if it rains?", answer: "The event will be moved to the indoor venue nearby." },
    ],
    whatToExpect: [
      "Live jazz performances from renowned artists",
      "Open-air venue with stunning views",
      "Food and beverage options",
      "VIP seating available",
    ],
  },
  {
    id: "3",
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to top investors and industry experts.",
    date: "2025-03-01",
    time: "14:00",
    location: "Austin, TX",
    address: "Capital Factory, 701 Brazos St",
    attendees: 234,
    capacity: 300,
    category: "Business",
    price: 75,
    isFree: false,
    image: eventTechImage,
    featured: false,
    status: "published",
    organizer: "StartupHub",
    organizerId: "org-1",
    createdAt: "2025-01-10",
    faqs: [
      { question: "Can I pitch my startup?", answer: "Applications for pitching closed on Feb 15." },
      { question: "Will there be networking?", answer: "Yes, there's a networking session after the pitches." },
    ],
    whatToExpect: [
      "10 startup pitches",
      "Q&A sessions with investors",
      "Networking opportunities",
      "Awards ceremony",
    ],
  },
  {
    id: "4",
    title: "Gourmet Food Festival",
    description: "Experience culinary delights from world-renowned chefs at this exclusive food festival.",
    date: "2025-03-10",
    time: "11:00",
    location: "Los Angeles, CA",
    address: "Grand Park, 200 N Grand Ave",
    attendees: 1200,
    capacity: 2000,
    category: "Food & Drink",
    price: 0,
    isFree: true,
    image: eventJazzImage,
    featured: false,
    status: "published",
    organizer: "LA Food Council",
    organizerId: "org-3",
    createdAt: "2025-01-15",
    faqs: [
      { question: "Is it family-friendly?", answer: "Yes, this is a family-friendly event." },
      { question: "Are samples free?", answer: "Entry is free, but food samples are pay-as-you-go." },
    ],
    whatToExpect: [
      "50+ food vendors",
      "Live cooking demonstrations",
      "Celebrity chef appearances",
      "Kids' cooking classes",
    ],
  },
];

// Simple event store with localStorage persistence
class EventStore {
  private events: Event[] = [];
  private storageKey = "vibecraft-events";

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.events = JSON.parse(stored);
      } else {
        this.events = mockEvents;
        this.saveToStorage();
      }
    } catch {
      this.events = mockEvents;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.events));
    } catch (e) {
      console.error("Failed to save events to localStorage", e);
    }
  }

  getAll(): Event[] {
    return [...this.events];
  }

  getById(id: string): Event | undefined {
    return this.events.find((e) => e.id === id);
  }

  getByCategory(category: string): Event[] {
    if (category === "All" || !category) return this.getAll();
    return this.events.filter((e) => e.category === category);
  }

  getFeatured(): Event[] {
    return this.events.filter((e) => e.featured);
  }

  getUpcoming(): Event[] {
    const now = new Date().toISOString().split("T")[0];
    return this.events.filter((e) => e.date >= now).sort((a, b) => a.date.localeCompare(b.date));
  }

  create(event: Omit<Event, "id" | "createdAt" | "attendees">): Event {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      attendees: 0,
    };
    this.events.push(newEvent);
    this.saveToStorage();
    return newEvent;
  }

  register(eventId: string): boolean {
    const event = this.getById(eventId);
    if (event && event.attendees < event.capacity) {
      event.attendees += 1;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  search(query: string, category?: string, location?: string): Event[] {
    return this.events.filter((e) => {
      const matchesQuery = !query || 
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || category === "All" || e.category === category;
      const matchesLocation = !location || e.location.toLowerCase().includes(location.toLowerCase());
      return matchesQuery && matchesCategory && matchesLocation;
    });
  }
}

export const eventStore = new EventStore();
