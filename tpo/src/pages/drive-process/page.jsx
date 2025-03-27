"use client"

import { useState } from "react"
import { Calendar, Check, ChevronRight, Clock, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function DriveProcessPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const driveEvents = [
    {
      id: "DRIVE001",
      company: "TechCorp",
      title: "Campus Recruitment Drive",
      date: "Apr 25, 2023",
      time: "10:00 AM - 5:00 PM",
      location: "Main Campus Auditorium",
      status: "Upcoming",
      stages: [
        { name: "Pre-Placement Talk", status: "Scheduled", date: "Apr 25, 2023", time: "10:00 AM" },
        { name: "Aptitude Test", status: "Scheduled", date: "Apr 25, 2023", time: "11:30 AM" },
        { name: "Technical Interview", status: "Scheduled", date: "Apr 25, 2023", time: "2:00 PM" },
        { name: "HR Interview", status: "Scheduled", date: "Apr 25, 2023", time: "4:00 PM" },
      ],
      progress: 0,
    },
    {
      id: "DRIVE002",
      company: "DataSystems",
      title: "Data Science Recruitment",
      date: "Apr 28, 2023",
      time: "9:00 AM - 4:00 PM",
      location: "Engineering Block, Room 302",
      status: "Upcoming",
      stages: [
        { name: "Company Presentation", status: "Scheduled", date: "Apr 28, 2023", time: "9:00 AM" },
        { name: "Coding Test", status: "Scheduled", date: "Apr 28, 2023", time: "10:30 AM" },
        { name: "Technical Round", status: "Scheduled", date: "Apr 28, 2023", time: "1:00 PM" },
        { name: "Final Interview", status: "Scheduled", date: "Apr 28, 2023", time: "3:00 PM" },
      ],
      progress: 0,
    },
    {
      id: "DRIVE003",
      company: "CloudNet",
      title: "DevOps Hiring Drive",
      date: "Apr 20, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "Virtual (Online)",
      status: "In Progress",
      stages: [
        { name: "Introduction Session", status: "Completed", date: "Apr 20, 2023", time: "10:00 AM" },
        { name: "Technical Assessment", status: "Completed", date: "Apr 20, 2023", time: "11:00 AM" },
        { name: 'Group Discussion  status: "Completed', date: "Apr 20, 2023", time: "11:00 AM" },
        { name: "Group Discussion", status: "In Progress", date: "Apr 20, 2023", time: "2:00 PM" },
        { name: "Final Interview", status: "Scheduled", date: "Apr 20, 2023", time: "4:00 PM" },
      ],
      progress: 50,
    },
    {
      id: "DRIVE004",
      company: "FinTech Inc",
      title: "UI/UX Design Recruitment",
      date: "Apr 15, 2023",
      time: "9:00 AM - 3:00 PM",
      location: "Design Studio, Room 105",
      status: "Completed",
      stages: [
        { name: "Portfolio Review", status: "Completed", date: "Apr 15, 2023", time: "9:00 AM" },
        { name: "Design Challenge", status: "Completed", date: "Apr 15, 2023", time: "10:30 AM" },
        { name: "Team Interview", status: "Completed", date: "Apr 15, 2023", time: "1:00 PM" },
        { name: "Final Discussion", status: "Completed", date: "Apr 15, 2023", time: "2:30 PM" },
      ],
      progress: 100,
    },
  ]

  const filteredDrives = driveEvents.filter((drive) => {
    if (activeTab === "upcoming") return drive.status === "Upcoming"
    if (activeTab === "in-progress") return drive.status === "In Progress"
    if (activeTab === "completed") return drive.status === "Completed"
    return true
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Drive Process</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Drive
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search drives..." className="w-full pl-8" />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Drives</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <DriveList drives={filteredDrives} />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <DriveList drives={filteredDrives} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <DriveList drives={filteredDrives} />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <DriveList drives={driveEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DriveList({ drives }: { drives: any[] }) {
  if (drives.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No drive events found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {drives.map((drive) => (
        <Card key={drive.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{drive.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{drive.title}</CardTitle>
                  <CardDescription>{drive.company}</CardDescription>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  drive.status === "Upcoming"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : drive.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : "bg-green-100 text-green-800 hover:bg-green-100"
                }
              >
                {drive.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{drive.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{drive.time}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2">{drive.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span>{drive.progress}%</span>
                </div>
                <Progress value={drive.progress} className="h-2" />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Drive Stages</h4>
                <div className="space-y-2">
                  {drive.stages.map((stage: any, index: number) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2 text-sm">
                      <div className="flex items-center gap-2">
                        {stage.status === "Completed" ? (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        ) : stage.status === "In Progress" ? (
                          <div className="h-5 w-5 rounded-full border-2 border-yellow-400 bg-yellow-100" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                        )}
                        <span>{stage.name}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{stage.time}</span>
                        <Badge
                          variant="outline"
                          className={
                            stage.status === "Completed"
                              ? "ml-2 bg-green-100 text-green-800 hover:bg-green-100"
                              : stage.status === "In Progress"
                                ? "ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "ml-2 bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {stage.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <div className="flex items-center justify-end border-t bg-muted/50 px-4 py-2">
            <Button variant="ghost" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Drive</DropdownMenuItem>
                <DropdownMenuItem>Update Status</DropdownMenuItem>
                <DropdownMenuItem>View Participants</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Cancel Drive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </>
  )
}

