"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, CreditCard, Shield, AlertCircle, CheckCircle, Star, Clock } from "lucide-react"
import type { Babysitter } from "@/lib/supabase"

interface BookingModalProps {
  sitter: Babysitter
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFilters?: any
}

export function BookingModal({ sitter, open, onOpenChange, initialFilters }: BookingModalProps) {
  const [bookingType, setBookingType] = useState<"instant" | "request">("instant")
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: initialFilters?.date || "",
    startTime: initialFilters?.time || "",
    endTime: "",
    duration: "4",
    children: initialFilters?.children || "1",
    childrenAges: "",
    specialRequirements: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    emergencyContact: "",
    emergencyPhone: "",
    additionalServices: [] as string[],
  })

  const handleServiceToggle = (service: string) => {
    setBookingData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }))
  }

  const calculateTotal = () => {
    const baseRate = sitter.hourly_rate * Number.parseInt(bookingData.duration)
    const servicesFee = bookingData.additionalServices.length * 5 * Number.parseInt(bookingData.duration)
    const platformFee = (baseRate + servicesFee) * 0.1
    return baseRate + servicesFee + platformFee
  }

  const handleBooking = () => {
    // Here you would integrate with your payment processor
    console.log("Booking submitted:", { sitter, bookingData, bookingType })
    onOpenChange(false)
    // Show success message or redirect
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 1 ? "Book" : step === 2 ? "Details" : "Payment"} - {sitter.first_name} {sitter.last_name}
            <Badge variant="outline" className="ml-auto">
              Step {step} of 3
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <>
                {/* Booking Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Booking Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          bookingType === "instant" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}
                        onClick={() => setBookingType("instant")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Instant Book</h3>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Book immediately and get instant confirmation</p>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          bookingType === "request" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}
                        onClick={() => setBookingType("request")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Request to Book</h3>
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">Send a request and wait for sitter approval</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Date & Time */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Pick-up & Drop-off Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Total Duration</Label>
                        <Select
                          value={bookingData.duration}
                          onValueChange={(value) => setBookingData((prev) => ({ ...prev, duration: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="6">6 hours</SelectItem>
                            <SelectItem value="8">8 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup-time">Pick-up Time</Label>
                        <Input
                          id="pickup-time"
                          type="time"
                          value={bookingData.startTime}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, startTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dropoff-time">Drop-off Time</Label>
                        <Input
                          id="dropoff-time"
                          type="time"
                          value={bookingData.endTime || ""}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, endTime: e.target.value }))}
                          placeholder="Calculated automatically"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Pick-up and drop-off times can be coordinated with your sitter. Some
                        sitters offer transportation services for an additional fee.
                      </p>
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
                        <Label htmlFor="children">Number of Children</Label>
                        <Select
                          value={bookingData.children}
                          onValueChange={(value) => setBookingData((prev) => ({ ...prev, children: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                        <Input
                          id="ages"
                          placeholder="e.g., 3, 7, 10"
                          value={bookingData.childrenAges}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, childrenAges: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="special-requirements">Special Requirements</Label>
                      <Textarea
                        id="special-requirements"
                        placeholder="Any allergies, medical conditions, behavioral notes, or special instructions..."
                        rows={3}
                        value={bookingData.specialRequirements}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {step === 2 && (
              <>
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
                      <Input
                        id="address"
                        placeholder="Enter your full address"
                        value={bookingData.address}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={bookingData.city}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={bookingData.state}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, state: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          placeholder="ZIP"
                          value={bookingData.zip}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, zip: e.target.value }))}
                        />
                      </div>
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
                      {[
                        { id: "homework", label: "Homework Help", price: 5 },
                        { id: "meals", label: "Meal Preparation", price: 3 },
                        { id: "transport", label: "Transportation", price: 8 },
                        { id: "housework", label: "Light Housework", price: 2 },
                      ].map((service) => (
                        <div key={service.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={service.id}
                              checked={bookingData.additionalServices.includes(service.id)}
                              onCheckedChange={() => handleServiceToggle(service.id)}
                            />
                            <Label htmlFor={service.id}>{service.label}</Label>
                          </div>
                          <span className="text-sm text-gray-600">+${service.price}/hour</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergency-contact">Contact Name</Label>
                        <Input
                          id="emergency-contact"
                          placeholder="Full name"
                          value={bookingData.emergencyContact}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency-phone">Phone Number</Label>
                        <Input
                          id="emergency-phone"
                          placeholder="Phone number"
                          value={bookingData.emergencyPhone}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
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
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : onOpenChange(false))}>
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              <Button onClick={() => (step < 3 ? setStep(step + 1) : handleBooking())}>
                {step === 3 ? (bookingType === "instant" ? "Book Now" : "Send Request") : "Continue"}
              </Button>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Sitter Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={sitter.profile_image_url || "/placeholder.svg"} />
                      <AvatarFallback>
                        {sitter.first_name.charAt(0)}
                        {sitter.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {sitter.first_name} {sitter.last_name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">
                          {sitter.rating} ({sitter.review_count} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
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
                      <span>Base rate ({bookingData.duration} hours)</span>
                      <span>${(sitter.hourly_rate * Number.parseInt(bookingData.duration)).toFixed(2)}</span>
                    </div>
                    {bookingData.additionalServices.length > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Additional services</span>
                        <span>
                          $
                          {(bookingData.additionalServices.length * 5 * Number.parseInt(bookingData.duration)).toFixed(
                            2,
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Service fee</span>
                      <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
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
                        All communications and payments are handled securely through our platform.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
