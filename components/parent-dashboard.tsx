import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Heart, Calendar, MessageCircle, Star, Plus, Settings, AlertCircle } from "lucide-react"

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-20 flex-col">
          <Calendar className="w-6 h-6 mb-2" />
          Book a Sitter
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <MessageCircle className="w-6 h-6 mb-2" />
          Messages
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Heart className="w-6 h-6 mb-2" />
          Favorite Sitters
        </Button>
      </div>

      {/* Children Profiles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            My Children
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Emma", age: 7, needs: "No allergies", photo: "E" },
            { name: "Lucas", age: 4, needs: "Peanut allergy", photo: "L" },
          ].map((child, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600">{child.photo}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{child.name}</h3>
                  <p className="text-sm text-gray-600">Age {child.age}</p>
                  <p className="text-xs text-gray-500">{child.needs}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {child.needs.includes("allergy") && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Allergy
                  </Badge>
                )}
                <Button size="sm" variant="ghost">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Favorite Sitters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Favorite Sitters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Sarah M.", rating: 4.9, rate: "$18/hr", available: true },
              { name: "Jessica L.", rating: 4.8, rate: "$22/hr", available: false },
            ].map((sitter, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder-40x40.png?height=40&width=40&text=${sitter.name.charAt(0)}`} />
                    <AvatarFallback>{sitter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{sitter.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{sitter.rating}</span>
                      </div>
                      <span className="text-xs text-gray-600">{sitter.rate}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={sitter.available ? "secondary" : "outline"} className="mb-2">
                    {sitter.available ? "Available" : "Busy"}
                  </Badge>
                  <Button size="sm" disabled={!sitter.available}>
                    Book
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { sitter: "Sarah M.", date: "Dec 15, 2024", status: "Completed", children: "Emma, Lucas" },
              { sitter: "Jessica L.", date: "Dec 20, 2024", status: "Upcoming", children: "Emma" },
            ].map((booking, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{booking.sitter}</h4>
                  <p className="text-sm text-gray-600">{booking.date}</p>
                  <p className="text-xs text-gray-500">Children: {booking.children}</p>
                </div>
                <div className="text-right">
                  <Badge variant={booking.status === "Completed" ? "secondary" : "default"}>{booking.status}</Badge>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
