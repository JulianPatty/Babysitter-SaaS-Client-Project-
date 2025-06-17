import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import {
  Star,
  MapPin,
  Clock,
  Shield,
  Award,
  Heart,
  Share,
  MessageCircle,
  CheckCircle,
  Users,
  Baby,
  GraduationCap,
  Languages,
  Car,
  Home,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SitterProfile() {
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
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Sarah M."
                  alt="Sarah M."
                  width={300}
                  height={300}
                  className="w-64 h-64 rounded-2xl object-cover mx-auto md:mx-0"
                />
                <Badge className="absolute top-4 left-4 bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">Sarah M.</h1>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Background Checked
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold ml-1">4.9</span>
                    <span className="text-gray-600 ml-1">(127 reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    Downtown Seattle
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Experienced and loving babysitter with over 5 years of childcare experience. I specialize in caring
                  for children ages 2-12 and have a background in early childhood education. I'm CPR and First Aid
                  certified, and I speak both English and Spanish fluently.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-blue-100 text-blue-800">
                    <Award className="w-3 h-3 mr-1" />
                    CPR Certified
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    First Aid
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    <Languages className="w-3 h-3 mr-1" />
                    Bilingual
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Early Education
                  </Badge>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Sarah
                  </Button>
                  <Button size="lg" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Quick Call
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Experience & Qualifications */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Experience & Qualifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 5+ years of babysitting experience</li>
                      <li>• Cared for children ages 6 months - 12 years</li>
                      <li>• Experience with special needs children</li>
                      <li>• Comfortable with pets</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Bachelor's in Early Childhood Education</li>
                      <li>• CPR & First Aid Certified (2024)</li>
                      <li>• Childcare Development Associate (CDA)</li>
                      <li>• Background Check Cleared</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Special Skills */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Special Skills & Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Baby className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <span className="text-sm font-medium">Infant Care</span>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <span className="text-sm font-medium">Homework Help</span>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Car className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <span className="text-sm font-medium">Transportation</span>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Home className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <span className="text-sm font-medium">Light Housework</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Reviews (127)</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={`/parent-text.png?height=40&width=40&text=Parent ${i}`} />
                          <AvatarFallback>P{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Jennifer K.</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2 weeks ago</span>
                          </div>
                          <p className="text-gray-700">
                            Sarah was absolutely wonderful with my 3-year-old daughter. She was punctual, professional,
                            and my daughter immediately felt comfortable with her. Sarah even helped with bedtime
                            routine and left the house spotless. Highly recommend!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Show All Reviews
              </Button>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$18/hour</span>
                    <Badge variant="secondary">Available Today</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">127</div>
                      <div className="text-sm text-gray-600">Reviews</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">98%</div>
                      <div className="text-sm text-gray-600">Response Rate</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pick-up/Drop-off Calendar */}
                  <div>
                    <h3 className="font-semibold mb-3">Pick-up/Drop-off Schedule</h3>
                    <Calendar className="w-full" />
                    <div className="mt-3 text-xs text-gray-600">
                      <p>• Green: Available for pick-up/drop-off</p>
                      <p>• Red: Not available</p>
                      <p>• Yellow: Limited availability</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Policies */}
                  <div>
                    <h3 className="font-semibold mb-3">Booking Policies</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Minimum 3 hours
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Same-day booking available
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Free cancellation 24h before
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Book Sarah Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request to Book
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Features */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Safety Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Identity Verified
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Background Check Passed
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      References Verified
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      In-App Messaging
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
