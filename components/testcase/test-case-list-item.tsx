"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { TestCase } from "@/types/test-case"
import { ChevronDown, ChevronRight, Plus, Trash2, ArrowUp, ArrowDown, GripVertical, Edit, Save, X } from "lucide-react"

interface TestCaseListItemProps {
  testCase: TestCase
  onUpdate: (testCase: TestCase) => void
  onDelete: (id: string) => void
  onDuplicate: (testCase: TestCase) => void
}

const priorityColors = {
  Low: "bg-gray-400",
  Medium: "bg-yellow-400",
  High: "bg-orange-400",
  Critical: "bg-red-400",
}

export function TestCaseListItem({ testCase, onUpdate, onDelete, onDuplicate }: TestCaseListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    title: testCase.title,
    description: testCase.description,
    module: testCase.module,
  })

  const updateField = (field: keyof TestCase, value: any) => {
    onUpdate({ ...testCase, [field]: value })
  }

  const updateStep = (stepIndex: number, field: "action" | "expectedResult", value: string) => {
    const updatedSteps = testCase.steps.map((step, index) => (index === stepIndex ? { ...step, [field]: value } : step))
    updateField("steps", updatedSteps)
  }

  const addStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      action: "",
      expectedResult: "",
    }
    updateField("steps", [...testCase.steps, newStep])
  }

  const removeStep = (stepIndex: number) => {
    const updatedSteps = testCase.steps.filter((_, index) => index !== stepIndex)
    updateField("steps", updatedSteps)
  }

  const moveStep = (stepIndex: number, direction: "up" | "down") => {
    const newSteps = [...testCase.steps]
    const targetIndex = direction === "up" ? stepIndex - 1 : stepIndex + 1

    if (targetIndex < 0 || targetIndex >= newSteps.length) return
    ;[newSteps[stepIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[stepIndex]]
    updateField("steps", newSteps)
  }

  const handleEditStart = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
    })
    setIsEditing(true)
  }

  const handleEditSave = () => {
    onUpdate({
      ...testCase,
      title: editValues.title,
      description: editValues.description,
      module: editValues.module,
    })
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
    })
    setIsEditing(false)
  }

  const getAssigneeInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
          testCase.selected ? "bg-blue-50/30" : ""
        }`}
      >
        {/* Main Row */}
        <div className="flex items-center gap-4 px-4 py-3">
          {/* Checkbox */}
          <Checkbox checked={testCase.selected} onCheckedChange={(checked) => updateField("selected", checked)} />

          {/* Test Case ID */}
          <span className="text-sm font-medium text-blue-600 min-w-[80px]">{testCase.id}</span>

          {/* Test Case Title - Expandable */}
          <div className="flex-1 min-w-0">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto text-left font-normal hover:bg-transparent"
              >
                <div className="flex items-center gap-2 w-full">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-900 truncate">{testCase.title}</span>
                </div>
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Priority Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${priorityColors[testCase.priority]}`} />
          </div>

          {/* Assignee Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
              {testCase.module ? getAssigneeInitials(testCase.module) : "UN"}
            </AvatarFallback>
          </Avatar>

          {/* Environment/Status Dropdown */}
          <Select value={testCase.type} onValueChange={(value: TestCase["type"]) => updateField("type", value)}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Functional">FUNC</SelectItem>
              <SelectItem value="Negative">NEG</SelectItem>
              <SelectItem value="Edge Case">EDGE</SelectItem>
              <SelectItem value="Performance">PERF</SelectItem>
              <SelectItem value="Security">SEC</SelectItem>
              <SelectItem value="Integration">INT</SelectItem>
            </SelectContent>
          </Select>

          {/* Single Edit Button */}
          {!isEditing && (
            <Button
              onClick={handleEditStart}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Expanded Details */}
        <CollapsibleContent>
          <div className="px-4 pb-4 bg-gray-50/30 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                {/* Editable Fields Section */}
                {isEditing ? (
                  <div className="space-y-4 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">Edit Test Case</h4>
                      <div className="flex gap-2">
                        <Button onClick={handleEditSave} size="sm" className="h-7 bg-green-600 hover:bg-green-700">
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button onClick={handleEditCancel} variant="outline" size="sm" className="h-7">
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">Title</label>
                      <Input
                        value={editValues.title}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, title: e.target.value }))}
                        className="text-sm"
                        placeholder="Test case title..."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">Description</label>
                      <Textarea
                        value={editValues.description}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, description: e.target.value }))}
                        className="text-sm min-h-[80px]"
                        placeholder="Test case description..."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">Module</label>
                      <Input
                        value={editValues.module}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, module: e.target.value }))}
                        className="text-sm"
                        placeholder="Module name..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">Description</label>
                      <div className="text-sm text-gray-700 p-2 bg-white rounded border min-h-[80px]">
                        {testCase.description || <span className="text-gray-400 italic">No description</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 block mb-2">Priority</label>
                        <Select
                          value={testCase.priority}
                          onValueChange={(value: TestCase["priority"]) => updateField("priority", value)}
                        >
                          <SelectTrigger className="h-8">
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

                      <div>
                        <label className="text-xs font-medium text-gray-600 block mb-2">Module</label>
                        <div className="text-sm text-gray-700 p-2 bg-white rounded border h-8 flex items-center">
                          {testCase.module || <span className="text-gray-400 italic">No module</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Test Steps */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">Test Steps</label>
                  <Button onClick={addStep} size="sm" variant="outline" className="h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Step
                  </Button>
                </div>

                {testCase.steps.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 bg-white rounded border-2 border-dashed border-gray-200">
                    <p className="text-xs mb-2">No test steps defined</p>
                    <Button onClick={addStep} variant="outline" size="sm" className="h-7 text-xs">
                      Add First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {testCase.steps.map((step, index) => (
                      <div key={step.id} className="bg-white rounded border p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <span className="text-xs font-medium text-gray-500">Step {index + 1}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => moveStep(index, "up")}
                              disabled={index === 0}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => moveStep(index, "down")}
                              disabled={index === testCase.steps.length - 1}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => removeStep(index)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Action</label>
                          <Textarea
                            value={step.action}
                            onChange={(e) => updateStep(index, "action", e.target.value)}
                            className="text-xs min-h-[60px]"
                            placeholder="Describe the action..."
                          />
                        </div>

                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Expected Result</label>
                          <Textarea
                            value={step.expectedResult}
                            onChange={(e) => updateStep(index, "expectedResult", e.target.value)}
                            className="text-xs min-h-[60px]"
                            placeholder="Expected outcome..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                <Button onClick={() => onDuplicate(testCase)} variant="outline" size="sm">
                  Duplicate
                </Button>
                <Button
                  onClick={() => onDelete(testCase.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
