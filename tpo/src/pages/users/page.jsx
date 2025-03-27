"use client"

import { useState } from "react"
import { Building, Download, Filter, GraduationCap, MoreHorizontal, Plus, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("students")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="students" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="students" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="tpos" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            TPOs
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder={`Search ${activeTab}...`} className="w-full pl-8" />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts and profiles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "John Doe",
                      id: "S2021001",
                      department: "Computer Science",
                      year: "3rd Year",
                      status: "Active",
                    },
                    {
                      name: "Alice Smith",
                      id: "S2021002",
                      department: "Electrical Engineering",
                      year: "4th Year",
                      status: "Active",
                    },
                    {
                      name: "Robert Johnson",
                      id: "S2021003",
                      department: "Mechanical Engineering",
                      year: "2nd Year",
                      status: "Inactive",
                    },
                    {
                      name: "Maria Perez",
                      id: "S2021004",
                      department: "Information Technology",
                      year: "3rd Year",
                      status: "Active",
                    },
                    {
                      name: "David Lee",
                      id: "S2021005",
                      department: "Civil Engineering",
                      year: "4th Year",
                      status: "Active",
                    },
                  ].map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            student.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {student.status}
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Companies</CardTitle>
              <CardDescription>Manage company accounts and profiles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "TechCorp",
                      industry: "Information Technology",
                      contact: "James Wilson",
                      email: "james@techcorp.com",
                      status: "Active",
                    },
                    {
                      name: "DataSystems",
                      industry: "Data Analytics",
                      contact: "Sarah Johnson",
                      email: "sarah@datasystems.com",
                      status: "Active",
                    },
                    {
                      name: "CloudNet",
                      industry: "Cloud Services",
                      contact: "Michael Brown",
                      email: "michael@cloudnet.com",
                      status: "Active",
                    },
                    {
                      name: "FinTech Inc",
                      industry: "Financial Technology",
                      contact: "Emily Davis",
                      email: "emily@fintechinc.com",
                      status: "Inactive",
                    },
                    {
                      name: "MediTech",
                      industry: "Healthcare Technology",
                      contact: "Daniel Martinez",
                      email: "daniel@meditech.com",
                      status: "Active",
                    },
                  ].map((company, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.contact}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            company.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {company.status}
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tpos">
          <Card>
            <CardHeader>
              <CardTitle>Training & Placement Officers</CardTitle>
              <CardDescription>Manage TPO accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Dr. Richard Thompson",
                      department: "Computer Science",
                      email: "richard@university.edu",
                      phone: "+1 (555) 123-4567",
                      status: "Active",
                    },
                    {
                      name: "Prof. Jennifer Adams",
                      department: "Electrical Engineering",
                      email: "jennifer@university.edu",
                      phone: "+1 (555) 234-5678",
                      status: "Active",
                    },
                    {
                      name: "Dr. Thomas Clark",
                      department: "Mechanical Engineering",
                      email: "thomas@university.edu",
                      phone: "+1 (555) 345-6789",
                      status: "Inactive",
                    },
                  ].map((tpo, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>
                              {tpo.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{tpo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{tpo.department}</TableCell>
                      <TableCell>{tpo.email}</TableCell>
                      <TableCell>{tpo.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            tpo.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {tpo.status}
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

