"use client"

import { useState } from "react"
import { Bell, Check, Clock, Filter, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export default function NotificationsPage() {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const toggleSelectAll = (notifications: any[]) => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(notifications.map((notification) => notification.id))
    }
  }

  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((notificationId) => notificationId !== id))
    } else {
      setSelectedNotifications([...selectedNotifications, id])
    }
  }

  const notifications = [
    {
      id: "NOTIF001",
      title: "New Job Posting",
      message: "TechCorp has posted a new job for Software Engineer position.",
      type: "job",
      date: "Today, 10:30 AM",
      read: false,
    },
    {
      id: "NOTIF002",
      title: "Drive Update",
      message: "DataSystems recruitment drive has been rescheduled to May 5th.",
      type: "drive",
      date: "Today, 9:15 AM",
      read: false,
    },
    {
      id: "NOTIF003",
      title: "Application Status",
      message: "5 new students have applied for the DevOps Engineer position at CloudNet.",
      type: "application",
      date: "Yesterday, 4:45 PM",
      read: true,
    },
    {
      id: "NOTIF004",
      title: "System Maintenance",
      message: "The system will be down for maintenance on Sunday, April 30th from 2 AM to 4 AM.",
      type: "system",
      date: "Yesterday, 2:30 PM",
      read: true,
    },
    {
      id: "NOTIF005",
      title: "New Company Registration",
      message: "FinTech Inc has registered on the platform. Pending approval.",
      type: "company",
      date: "Apr 20, 2023",
      read: true,
    },
  ]

  const sentNotifications = [
    {
      id: "SENT001",
      title: "Job Fair Announcement",
      message: "Annual Job Fair will be held on May 15th. All students are encouraged to attend.",
      recipients: "All Students",
      date: "Apr 22, 2023",
      status: "Delivered",
    },
    {
      id: "SENT002",
      title: "Interview Schedule",
      message: "Technical interviews for TechCorp will be held on April 25th starting at 10 AM.",
      recipients: "Selected Candidates",
      date: "Apr 20, 2023",
      status: "Delivered",
    },
    {
      id: "SENT003",
      title: "Resume Submission Reminder",
      message: "Reminder: Submit your updated resumes by April 30th for the upcoming placement season.",
      recipients: "All Students",
      date: "Apr 18, 2023",
      status: "Delivered",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Job
          </Badge>
        )
      case "drive":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Drive
          </Badge>
        )
      case "application":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Application
          </Badge>
        )
      case "system":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            System
          </Badge>
        )
      case "company":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Company
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Notification
          </Button>
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="received" className="space-y-4">
        <TabsList>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search notifications..." className="w-full pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              {selectedNotifications.length > 0 && (
                <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              )}
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Inbox</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedNotifications.length === notifications.length}
                    onCheckedChange={() => toggleSelectAll(notifications)}
                    aria-label="Select all notifications"
                  />
                  <span className="text-sm text-muted-foreground">Select All</span>
                </div>
              </div>
              <CardDescription>Manage your notifications and alerts.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 ${notification.read ? "" : "bg-muted/50"}`}
                  >
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => toggleSelectNotification(notification.id)}
                      aria-label={`Select notification ${notification.title}`}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {getTypeIcon(notification.type)}
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {!notification.read ? (
                            <DropdownMenuItem>Mark as read</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                          )}
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search sent notifications..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>View and manage notifications you've sent.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {sentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4">
                    <Avatar className="mt-0.5 h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="text-muted-foreground">To:</span>
                        <Badge variant="secondary">{notification.recipients}</Badge>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          {notification.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Recipients</DropdownMenuItem>
                        <DropdownMenuItem>Resend</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

