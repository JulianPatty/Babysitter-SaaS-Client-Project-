import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, CreditCard, Shield, AlertCircle, CheckCircle, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">BabyCare</span>
            </Link>
            <div className="text-sm text-gray-600">Step 2 of 3: Booking Details</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Complete your booking</h1>
              <p className="text-gray-600">Fill in the details below to book Sarah for your childcare needs</p>
            </div>

            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Children Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="num-children">Number of Children</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 child</SelectItem>
                        <SelectItem value="2">2 children</SelectItem>
                        <SelectItem value="3">3 children</SelectItem>
                        <SelectItem value="4">4+ children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ages">Ages</Label>
                    <Input id="ages" placeholder="e.g., 3, 7, 10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="special-needs">Special Needs or Instructions</Label>
                  <Textarea
                    id="special-needs"
                    placeholder="Any allergies, medical conditions, behavioral notes, or special instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your full address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="ZIP" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-location" />
                  <Label htmlFor="share-location" className="text-sm">
                    Share real-time location with sitter during booking
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="homework" />
                      <Label htmlFor="homework">Homework Help</Label>
                    </div>
                    <span className="text-sm text-gray-600">+$5/hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="meals" />
                      <Label htmlFor="meals">Meal Preparation</Label>
                    </div>
                    <span className="text-sm text-gray-600">+$3/hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transport" />
                      <Label htmlFor="transport">Transportation</Label>
                    </div>
                    <span className="text-sm text-gray-600">+$8/hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="housework" />
                      <Label htmlFor="housework">Light Housework</Label>
                    </div>
                    <span className="text-sm text-gray-600">+$2/hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input id="emergency-name" placeholder="Full name" />
                  </div>
                  <div>
                    <Label htmlFor="emergency-phone">Phone Number</Label>
                    <Input id="emergency-phone" placeholder="Phone number" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergency-relation">Relationship</Label>
                  <Input id="emergency-relation" placeholder="e.g., Spouse, Grandparent, Friend" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="Full name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="save-payment" />
                  <Label htmlFor="save-payment" className="text-sm">
                    Save payment method for future bookings
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sitter Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64&text=Sarah" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">Sarah M.</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">4.9 (127 reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          CPR Certified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base rate (4 hours)</span>
                      <span>$72.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Homework help (+$5/hr)</span>
                      <span>$20.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Service fee</span>
                      <span>$9.20</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>$101.20</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Reminder */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Safety First</h4>
                      <p className="text-sm text-green-700">
                        All communications and payments are handled securely through our platform. Never share personal
                        information outside the app.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </div>

              {/* Cancellation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Cancellation Policy</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-gray-600 space-y-2">
                  <p>• Free cancellation up to 24 hours before start time</p>
                  <p>• 50% refund for cancellations 2-24 hours before</p>
                  <p>• No refund for cancellations less than 2 hours before</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
