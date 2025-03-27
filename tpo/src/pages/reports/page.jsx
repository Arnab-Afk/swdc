"use client"

import { Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search reports..." className="w-full pl-8" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select defaultValue="current">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Year</SelectItem>
              <SelectItem value="previous">Previous Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Placements"
              value="1,245"
              change="+12%"
              trend="up"
              description="vs. previous year"
            />
            <MetricCard
              title="Average Package"
              value="$85,000"
              change="+8%"
              trend="up"
              description="vs. previous year"
            />
            <MetricCard title="Placement Rate" value="78%" change="+5%" trend="up" description="vs. previous year" />
            <MetricCard
              title="Companies Visited"
              value="145"
              change="-3%"
              trend="down"
              description="vs. previous year"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Monthly placement statistics for the current year.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Placement trend chart will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Recruiting Companies</CardTitle>
                <CardDescription>Companies with the highest number of placements.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Top companies chart will be displayed here.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department-wise Placement Statistics</CardTitle>
              <CardDescription>Placement rates and average packages by department.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Department statistics chart will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Placement Reports</CardTitle>
              <CardDescription>Detailed placement statistics and analytics.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Placement reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Reports</CardTitle>
              <CardDescription>Analytics on company participation and hiring.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Company reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Reports</CardTitle>
              <CardDescription>Analytics on student participation and placement.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Student reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  description,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={trend === "up" ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"}>
            {trend === "up" ? "↑" : "↓"} {change}
          </span>{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

