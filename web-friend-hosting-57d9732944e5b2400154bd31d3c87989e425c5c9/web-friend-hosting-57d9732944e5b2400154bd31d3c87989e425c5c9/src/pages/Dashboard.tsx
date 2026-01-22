import { Link } from "react-router-dom";
import { Plus, Calendar, Users, DollarSign, TrendingUp, MoreVertical } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { eventStore } from "@/lib/eventStore";

const Dashboard = () => {
  const allEvents = eventStore.getAll();
  const myEvents = allEvents.filter((e) => e.organizerId === "org-1");
  
  const totalAttendees = myEvents.reduce((sum, e) => sum + e.attendees, 0);
  const totalRevenue = myEvents.reduce((sum, e) => sum + (e.attendees * e.price), 0);
  const conversionRate = myEvents.length > 0 
    ? Math.round((totalAttendees / myEvents.reduce((sum, e) => sum + e.capacity, 0)) * 100) 
    : 0;

  const stats = [
    { 
      label: "Total Events", 
      value: myEvents.length.toString(), 
      change: "+1", 
      icon: Calendar,
      color: "bg-blue-500/10 text-blue-500"
    },
    { 
      label: "Total Attendees", 
      value: totalAttendees.toLocaleString(), 
      change: "+18%", 
      icon: Users,
      color: "bg-green-500/10 text-green-500"
    },
    { 
      label: "Revenue", 
      value: `$${totalRevenue.toLocaleString()}`, 
      change: "+12%", 
      icon: DollarSign,
      color: "bg-orange-500/10 text-orange-500"
    },
    { 
      label: "Conversion Rate", 
      value: `${conversionRate}%`, 
      change: "+5%", 
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Manage your events and track performance</p>
            </div>
            <Link to="/create">
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Events Table */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Events</CardTitle>
              <Link to="/my-events" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{event.attendees}</span>
                        <span className="text-muted-foreground">/{event.capacity}</span>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(event.attendees * event.price).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={event.status === "published" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-yellow-500/10 text-yellow-600"
                          }
                        >
                          {event.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
