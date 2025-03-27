"use client"

import { useState } from "react"
import { Bell, Lock, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    newJobs: true,
    applicationUpdates: true,
    driveUpdates: true,
    systemUpdates: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newJobs: false,
    applicationUpdates: true,
    driveUpdates: true,
    systemUpdates: false,
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    Upload New Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Remove Photo
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Administrator for the campus placement system."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="utc+5.5">Indian Standard Time (UTC+5:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications you receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-new-jobs">New Job Postings</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when new jobs are posted.</p>
                  </div>
                  <Switch
                    id="email-new-jobs"
                    checked={emailNotifications.newJobs}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newJobs: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-application-updates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when application statuses change.
                    </p>
                  </div>
                  <Switch
                    id="email-application-updates"
                    checked={emailNotifications.applicationUpdates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, applicationUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-drive-updates">Drive Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about campus drive updates.</p>
                  </div>
                  <Switch
                    id="email-drive-updates"
                    checked={emailNotifications.driveUpdates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, driveUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates and maintenance.
                    </p>
                  </div>
                  <Switch
                    id="email-system-updates"
                    checked={emailNotifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, systemUpdates: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Configure which push notifications you receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-new-jobs">New Job Postings</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications when new jobs are posted.
                    </p>
                  </div>
                  <Switch
                    id="push-new-jobs"
                    checked={pushNotifications.newJobs}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, newJobs: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-application-updates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications when application statuses change.
                    </p>
                  </div>
                  <Switch
                    id="push-application-updates"
                    checked={pushNotifications.applicationUpdates}
                    onCheckedChange={(checked) =>
                      setPushNotifications({ ...pushNotifications, applicationUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-drive-updates">Drive Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about campus drive updates.
                    </p>
                  </div>
                  <Switch
                    id="push-drive-updates"
                    checked={pushNotifications.driveUpdates}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, driveUpdates: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about system updates and maintenance.
                    </p>
                  </div>
                  <Switch
                    id="push-system-updates"
                    checked={pushNotifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setPushNotifications({ ...pushNotifications, systemUpdates: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require a verification code when logging in.</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>Manage your active sessions and devices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Current Session</h3>
                    <p className="text-xs text-muted-foreground">
                      Chrome on Windows • IP 192.168.1.1 • Last active: Now
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Current
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Mobile App</h3>
                    <p className="text-xs text-muted-foreground">
                      iPhone 13 • IP 192.168.1.2 • Last active: 2 hours ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                    Revoke
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Firefox</h3>
                    <p className="text-xs text-muted-foreground">
                      Firefox on MacOS • IP 192.168.1.3 • Last active: Yesterday
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="destructive">Revoke All Other Sessions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

