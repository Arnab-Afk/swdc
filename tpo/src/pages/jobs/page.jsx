"use client"

import { useState } from "react"
import { Calendar, Clock, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function JobsPage() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(jobs.map((job) => job.id))
    }
  }

  const toggleSelectJob = (id: string) => {
    if (selectedJobs.includes(id)) {
      setSelectedJobs(selectedJobs.filter((jobId) => jobId !== id))
    } else {
      setSelectedJobs([...selectedJobs, id])
    }
  }

  const jobs = [
    {
      id: "JOB001",
      title: "Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      deadline: "Apr 30, 2023",
      status: "Active",
    },
    {
      id: "JOB002",
      title: "Data Analyst",
      company: "DataSystems",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted: "1 week ago",
      deadline: "May 15, 2023",
      status: "Active",
    },
    {
      id: "JOB003",
      title: "DevOps Engineer",
      company: "CloudNet",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "3 days ago",
      deadline: "May 5, 2023",
      status: "Active",
    },
    {
      id: "JOB004",
      title: "UI/UX Designer",
      company: "FinTech Inc",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$100,000 - $120,000",
      posted: "2 weeks ago",
      deadline: "Apr 25, 2023",
      status: "Closed",
    },
    {
      id: "JOB005",
      title: "Product Manager",
      company: "MediTech",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140,000 - $170,000",
      posted: "5 days ago",
      deadline: "May 20, 2023",
      status: "Active",
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Job Postings</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
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
          <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Job Postings</CardTitle>
          <CardDescription>Manage and monitor all job postings across companies.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedJobs.length === jobs.length}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Posted
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Deadline
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedJobs.includes(job.id)}
                      onCheckedChange={() => toggleSelectJob(job.id)}
                      aria-label={`Select ${job.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>{job.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{job.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.posted}</TableCell>
                  <TableCell>{job.deadline}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        job.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Job</DropdownMenuItem>
                        <DropdownMenuItem>View Applications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          {job.status === "Active" ? "Close Job" : "Reopen Job"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

