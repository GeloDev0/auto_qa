"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InlineEditor } from "@/components/inline-editor"
import type { TestStep } from "@/app/page"
import { Plus, GripVertical, Trash2, ArrowUp, ArrowDown } from "lucide-react"

interface StepEditorProps {
  steps: TestStep[]
  onStepsChange: (steps: TestStep[]) => void
}

export function StepEditor({ steps, onStepsChange }: StepEditorProps) {
  const addStep = () => {
    const newStep: TestStep = {
      id: `step-${Date.now()}`,
      description: "",
      expectedResult: "",
    }
    onStepsChange([...steps, newStep])
  }

  const updateStep = (stepId: string, field: keyof TestStep, value: string) => {
    const updatedSteps = steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step))
    onStepsChange(updatedSteps)
  }

  const deleteStep = (stepId: string) => {
    onStepsChange(steps.filter((step) => step.id !== stepId))
  }

  const moveStep = (stepId: string, direction: "up" | "down") => {
    const currentIndex = steps.findIndex((step) => step.id === stepId)
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === steps.length - 1)) {
      return
    }

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    ;[newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]]

    onStepsChange(newSteps)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Test Steps</h3>
        <Button onClick={addStep} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>

      {steps.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No test steps defined yet.</p>
          <Button onClick={addStep} variant="outline" className="mt-2">
            Add First Step
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <Card key={step.id} className="border-l-4 border-l-indigo-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-700">Step {index + 1}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveStep(step.id, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveStep(step.id, "down")}
                      disabled={index === steps.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteStep(step.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Action</label>
                  <InlineEditor
                    value={step.description}
                    onSave={(value) => updateStep(step.id, "description", value)}
                    placeholder="Describe the action to perform..."
                    multiline
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Result</label>
                  <InlineEditor
                    value={step.expectedResult}
                    onSave={(value) => updateStep(step.id, "expectedResult", value)}
                    placeholder="Describe the expected outcome..."
                    multiline
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
