"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { TestCase } from "@/app/page"

interface CreateTestCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTestCase: (testCase: Omit<TestCase, "id" | "createdAt" | "updatedAt">) => void
}

export function CreateTestCaseDialog({ open, onOpenChange, onCreateTestCase }: CreateTestCaseDialogProps) {
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    priority: "Medium" as TestCase["priority"],
    status: "Draft" as TestCase["status"],
    assignee: "",
    component: "",
    labels: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onCreateTestCase({
      ...formData,
      steps: [],
    })

    // Reset form
    setFormData({
      summary: "",
      description: "",
      priority: "Medium",
      status: "Draft",
      assignee: "",
      component: "",
      labels: [],
    })

    onOpenChange(false)
  }

  const handleLabelsChange = (value: string) => {
    const labels = value
      .split(",")
      .map((label) => label.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, labels }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Test Case</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Input
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief description of what this test case covers"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of the test case"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TestCase["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TestCase["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
                placeholder="Who is responsible for this test case"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="component">Component</Label>
              <Input
                id="component"
                value={formData.component}
                onChange={(e) => setFormData((prev) => ({ ...prev, component: e.target.value }))}
                placeholder="Which component/module this tests"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="labels">Labels</Label>
            <Input
              id="labels"
              value={formData.labels.join(", ")}
              onChange={(e) => handleLabelsChange(e.target.value)}
              placeholder="Comma-separated labels (e.g., authentication, critical-path)"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Test Case</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
