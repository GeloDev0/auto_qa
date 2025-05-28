"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { TestCase } from "@/app/page"
import { Search, X } from "lucide-react"

interface FilterBarProps {
  testCases: TestCase[]
  onFilter: (filteredCases: TestCase[]) => void
}

export function FilterBar({ testCases, onFilter }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")

  useEffect(() => {
    let filtered = testCases

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tc) =>
          tc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tc.labels.some((label) => label.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((tc) => tc.priority === priorityFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((tc) => tc.status === statusFilter)
    }

    // Assignee filter
    if (assigneeFilter !== "all") {
      filtered = filtered.filter((tc) => tc.assignee === assigneeFilter)
    }

    onFilter(filtered)
  }, [searchTerm, priorityFilter, statusFilter, assigneeFilter, testCases, onFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setPriorityFilter("all")
    setStatusFilter("all")
    setAssigneeFilter("all")
  }

  const hasActiveFilters = searchTerm || priorityFilter !== "all" || statusFilter !== "all" || assigneeFilter !== "all"

  const uniqueAssignees = Array.from(new Set(testCases.map((tc) => tc.assignee)))

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search test cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="Critical">Critical</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Ready">Ready</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          {uniqueAssignees.map((assignee) => (
            <SelectItem key={assignee} value={assignee}>
              {assignee}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
