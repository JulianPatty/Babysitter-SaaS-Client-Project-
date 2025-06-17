import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, MessageCircle, MapPin, Phone, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function SafetyFeatures() {
  return (
    <div className="space-y-6">
      {/* Real-time Safety Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Active Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Location Sharing</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium">In-App Messaging</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Available
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Emergency Contacts</span>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Set
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm font-medium">Check-in Reminders</span>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Enabled
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="destructive" className="w-full">
            <Phone className="w-4 h-4 mr-2" />
            Call Emergency Services (911)
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
            <MessageCircle className="w-4 h-4 mr-2" />
            Alert BabyCare Support
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
            <MapPin className="w-4 h-4 mr-2" />
            Share Location with Emergency Contact
          </Button>
        </CardContent>
      </Card>

      {/* Live Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Live Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">Sarah checked in</p>
              <p className="text-xs text-gray-600">2:00 PM - Arrived at location</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">Activity update</p>
              <p className="text-xs text-gray-600">2:30 PM - Playing in the backyard</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium">Photo shared</p>
              <p className="text-xs text-gray-600">3:15 PM - Snack time!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
