"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { TestCase, TestStep } from "@/app/page"
import { Sparkles, Loader2, CheckCircle } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface GenerateTestCasesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerateTestCases: (testCases: TestCase[]) => void
  existingTestCaseCount: number
}

interface GenerationRequest {
  feature: string
  description: string
  component: string
  priority: TestCase["priority"]
  assignee: string
  testTypes: string[]
  additionalRequirements: string
}

export function GenerateTestCasesDialog({
  open,
  onOpenChange,
  onGenerateTestCases,
  existingTestCaseCount,
}: GenerateTestCasesDialogProps) {
  const [formData, setFormData] = useState<GenerationRequest>({
    feature: "",
    description: "",
    component: "",
    priority: "Medium",
    assignee: "",
    testTypes: ["positive", "negative"],
    additionalRequirements: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([])
  const [selectedTestCases, setSelectedTestCases] = useState<Set<string>>(new Set())
  const [step, setStep] = useState<"input" | "review">("input")

  const testTypeOptions = [
    { id: "positive", label: "Positive Test Cases", description: "Happy path scenarios" },
    { id: "negative", label: "Negative Test Cases", description: "Error handling and validation" },
    { id: "boundary", label: "Boundary Test Cases", description: "Edge cases and limits" },
    { id: "integration", label: "Integration Test Cases", description: "Component interactions" },
    { id: "performance", label: "Performance Test Cases", description: "Load and response time" },
    { id: "security", label: "Security Test Cases", description: "Authentication and authorization" },
  ]

  const handleTestTypeChange = (typeId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      testTypes: checked ? [...prev.testTypes, typeId] : prev.testTypes.filter((t) => t !== typeId),
    }))
  }

  const generateTestCases = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Generate comprehensive test cases for the following feature:

Feature: ${formData.feature}
Description: ${formData.description}
Component: ${formData.component}
Test Types: ${formData.testTypes.join(", ")}
Additional Requirements: ${formData.additionalRequirements || "None"}

Please generate test cases that include:
1. Clear, descriptive summaries
2. Detailed test steps with specific actions
3. Expected results for each step
4. Appropriate labels based on the test type

Generate between 3-8 test cases covering different scenarios. For each test case, provide:
- Summary (concise but descriptive)
- Description (brief overview)
- Test steps (3-6 steps with clear actions and expected results)
- Suggested labels (comma-separated)

Format the response as a JSON array of test cases with this structure:
{
  "testCases": [
    {
      "summary": "Test case summary",
      "description": "Test case description", 
      "labels": ["label1", "label2"],
      "steps": [
        {
          "description": "Step action",
          "expectedResult": "Expected outcome"
        }
      ]
    }
  ]
}

Focus on practical, executable test cases that a QA engineer could follow.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system:
          "You are an expert QA engineer who creates comprehensive, practical test cases. Always respond with valid JSON.",
      })

      // Parse the generated text to extract test cases
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Could not parse generated test cases")
      }

      const parsed = JSON.parse(jsonMatch[0])
      const testCases: TestCase[] = parsed.testCases.map((tc: any, index: number) => {
        const id = `TC-${String(existingTestCaseCount + index + 1).padStart(3, "0")}`
        const steps: TestStep[] = tc.steps.map((step: any, stepIndex: number) => ({
          id: `step-${Date.now()}-${stepIndex}`,
          description: step.description,
          expectedResult: step.expectedResult,
        }))

        return {
          id,
          summary: tc.summary,
          description: tc.description,
          priority: formData.priority,
          status: "Draft" as const,
          assignee: formData.assignee,
          labels: tc.labels || [],
          component: formData.component,
          steps,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })

      setGeneratedTestCases(testCases)
      setSelectedTestCases(new Set(testCases.map((tc) => tc.id)))
      setStep("review")
    } catch (error) {
      console.error("Error generating test cases:", error)
      alert("Failed to generate test cases. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAddSelectedTestCases = () => {
    const selectedCases = generatedTestCases.filter((tc) => selectedTestCases.has(tc.id))
    onGenerateTestCases(selectedCases)
    handleClose()
  }

  const handleClose = () => {
    setStep("input")
    setGeneratedTestCases([])
    setSelectedTestCases(new Set())
    setFormData({
      feature: "",
      description: "",
      component: "",
      priority: "Medium",
      assignee: "",
      testTypes: ["positive", "negative"],
      additionalRequirements: "",
    })
    onOpenChange(false)
  }

  const toggleTestCaseSelection = (testCaseId: string) => {
    const newSelected = new Set(selectedTestCases)
    if (newSelected.has(testCaseId)) {
      newSelected.delete(testCaseId)
    } else {
      newSelected.add(testCaseId)
    }
    setSelectedTestCases(newSelected)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Generate Test Cases with AI
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feature">Feature Name *</Label>
                <Input
                  id="feature"
                  value={formData.feature}
                  onChange={(e) => setFormData((prev) => ({ ...prev, feature: e.target.value }))}
                  placeholder="e.g., User Login, Shopping Cart, Payment Processing"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="component">Component</Label>
                <Input
                  id="component"
                  value={formData.component}
                  onChange={(e) => setFormData((prev) => ({ ...prev, component: e.target.value }))}
                  placeholder="e.g., Authentication, E-commerce, API"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Feature Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the feature functionality, user stories, or requirements..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Test Types to Generate</Label>
              <div className="grid grid-cols-2 gap-3">
                {testTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.testTypes.includes(option.id)}
                      onCheckedChange={(checked) => handleTestTypeChange(option.id, checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={option.id} className="text-sm font-medium">
                        {option.label}
                      </Label>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Default Priority</Label>
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
                <Label htmlFor="assignee">Default Assignee</Label>
                <Input
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
                  placeholder="Who will be responsible for these tests"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional">Additional Requirements</Label>
              <Textarea
                id="additional"
                value={formData.additionalRequirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalRequirements: e.target.value }))}
                placeholder="Any specific testing requirements, constraints, or scenarios to include..."
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={generateTestCases}
                disabled={!formData.feature || !formData.description || formData.testTypes.length === 0 || isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Test Cases
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Review Generated Test Cases</h3>
                <p className="text-sm text-gray-600">
                  Select the test cases you want to add to your project ({selectedTestCases.size} of{" "}
                  {generatedTestCases.length} selected)
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTestCases(new Set(generatedTestCases.map((tc) => tc.id)))}
                >
                  Select All
                </Button>
                <Button variant="outline" onClick={() => setSelectedTestCases(new Set())}>
                  Deselect All
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {generatedTestCases.map((testCase) => (
                  <Card
                    key={testCase.id}
                    className={`cursor-pointer transition-all ${
                      selectedTestCases.has(testCase.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleTestCaseSelection(testCase.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedTestCases.has(testCase.id)}
                          onChange={() => toggleTestCaseSelection(testCase.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono text-gray-500">{testCase.id}</span>
                            <Badge className="bg-blue-100 text-blue-800">{testCase.priority}</Badge>
                            {selectedTestCases.has(testCase.id) && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <CardTitle className="text-base">{testCase.summary}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{testCase.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {testCase.labels.map((label) => (
                              <Badge key={label} variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm">
                        <p className="font-medium text-gray-700 mb-2">Test Steps ({testCase.steps.length}):</p>
                        <div className="space-y-2">
                          {testCase.steps.slice(0, 2).map((step, index) => (
                            <div key={step.id} className="text-xs bg-gray-50 p-2 rounded">
                              <p className="font-medium">
                                Step {index + 1}: {step.description}
                              </p>
                              <p className="text-gray-600 mt-1">Expected: {step.expectedResult}</p>
                            </div>
                          ))}
                          {testCase.steps.length > 2 && (
                            <p className="text-xs text-gray-500">... and {testCase.steps.length - 2} more steps</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("input")}>
                Back to Edit
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSelectedTestCases}
                  disabled={selectedTestCases.size === 0}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Add {selectedTestCases.size} Test Cases
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
