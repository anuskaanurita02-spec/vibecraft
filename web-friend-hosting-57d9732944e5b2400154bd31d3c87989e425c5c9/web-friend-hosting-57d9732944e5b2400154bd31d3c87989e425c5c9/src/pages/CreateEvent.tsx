import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Calendar, MapPin, DollarSign, Settings, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eventStore } from "@/lib/eventStore";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coverImage, setCoverImage] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venueName: "",
    address: "",
    category: "",
    ticketPrice: 0,
    isFree: false,
    capacity: 100,
    isPrivate: false,
  });

  const categories = ["Music", "Technology", "Business", "Food & Drink", "Arts", "Sports", "Health", "Community"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!formData.title || !formData.date || !formData.venueName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    eventStore.create({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.venueName,
      address: formData.address,
      capacity: formData.capacity,
      category: formData.category || "Community",
      price: formData.isFree ? 0 : formData.ticketPrice,
      isFree: formData.isFree,
      image: coverImage || "/placeholder.svg",
      featured: false,
      status: isDraft ? "draft" : "published",
      organizer: "You",
      organizerId: "current-user",
      faqs: [],
      whatToExpect: [],
    });

    toast({
      title: isDraft ? "Draft saved" : "Event published!",
      description: isDraft ? "Your event has been saved as a draft." : "Your event is now live.",
    });

    navigate("/my-events");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Create Event</h1>
            <p className="text-muted-foreground">Bring your event to life and reach your audience</p>
          </div>

          <div className="space-y-6">
            {/* Cover Image */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Image className="w-5 h-5 text-primary" />
                  Cover Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => document.getElementById("cover-upload")?.click()}
                >
                  {coverImage ? (
                    <img src={coverImage} alt="Cover preview" className="w-full h-48 object-cover rounded-lg" />
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Click to upload cover image</p>
                      <p className="text-xs text-muted-foreground">Recommended: 1920x1080px, JPG or PNG</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="cover-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your event a catchy title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell attendees what makes your event special..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input
                    id="venue"
                    placeholder="e.g., Convention Center"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tickets & Capacity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Tickets & Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Free Event</p>
                    <p className="text-sm text-muted-foreground">No ticket price required</p>
                  </div>
                  <Switch
                    checked={formData.isFree}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked })}
                  />
                </div>
                {!formData.isFree && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Ticket Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.ticketPrice}
                      onChange={(e) => setFormData({ ...formData, ticketPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="capacity">Maximum Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    placeholder="e.g., 100"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Settings */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  Event Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Private Event</p>
                    <p className="text-sm text-muted-foreground">Only visible to invited guests</p>
                  </div>
                  <Switch
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => handleSubmit(true)}>
                Save as Draft
              </Button>
              <Button className="flex-1 bg-gradient-primary hover:opacity-90" onClick={() => handleSubmit(false)}>
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
