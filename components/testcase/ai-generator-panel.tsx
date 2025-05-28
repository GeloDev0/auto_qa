"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, FileText, Zap } from "lucide-react"

interface AIGeneratorPanelProps {
  onGenerate: (requirements: string, testTypes: string[]) => void
  isGenerating: boolean
}

const testTypeOptions = [
  { id: "functional", label: "Functional Tests", description: "Core feature functionality", icon: "⚡" },
  { id: "negative", label: "Negative Tests", description: "Error handling & validation", icon: "🚫" },
  { id: "edge", label: "Edge Cases", description: "Boundary conditions & limits", icon: "🎯" },
  { id: "performance", label: "Performance Tests", description: "Load & response time", icon: "🚀" },
  { id: "security", label: "Security Tests", description: "Authentication & authorization", icon: "🔒" },
  { id: "integration", label: "Integration Tests", description: "Component interactions", icon: "🔗" },
]

export function AIGeneratorPanel({ onGenerate, isGenerating }: AIGeneratorPanelProps) {
  const [requirements, setRequirements] = useState("")
  const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>(["functional", "negative"])

  const handleTestTypeChange = (typeId: string, checked: boolean) => {
    setSelectedTestTypes((prev) => (checked ? [...prev, typeId] : prev.filter((t) => t !== typeId)))
  }

  const handleGenerate = () => {
    if (requirements.trim() && selectedTestTypes.length > 0) {
      onGenerate(requirements, selectedTestTypes)
    }
  }

  const exampleRequirements = `As a user, I want to log into the application so that I can access my personal dashboard.

Acceptance Criteria:
- Users can log in with email and password
- Invalid credentials show appropriate error messages
- Successful login redirects to dashboard
- Session persists across browser tabs
- Password reset functionality is available`

  return (
    <Card className="h-full flex flex-col shadow-sm border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          AI Test Case Generator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Describe your feature requirements and let AI generate comprehensive test cases
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Requirements Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="requirements" className="text-sm font-medium text-gray-700">
              Requirements & User Stories
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRequirements(exampleRequirements)}
              className="text-xs text-blue-600 hover:text-blue-700 h-auto p-1"
            >
              Use example
            </Button>
          </div>
          <Textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Describe the feature, user stories, acceptance criteria, or any specific requirements you want to test..."
            className="min-h-[200px] resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-200"
          />
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FileText className="h-3 w-3" />
            <span>{requirements.length} characters</span>
          </div>
        </div>

        {/* Test Types Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Test Types to Generate</Label>
          <div className="grid grid-cols-1 gap-2">
            {testTypeOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 ${
                  selectedTestTypes.includes(option.id) ? "border-blue-200 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => handleTestTypeChange(option.id, !selectedTestTypes.includes(option.id))}
              >
                <Checkbox
                  id={option.id}
                  checked={selectedTestTypes.includes(option.id)}
                  onCheckedChange={(checked) => handleTestTypeChange(option.id, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{option.icon}</span>
                    <Label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-auto pt-4">
          <Button
            onClick={handleGenerate}
            disabled={!requirements.trim() || selectedTestTypes.length === 0 || isGenerating}
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating test cases...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Generate Test Cases</span>
              </div>
            )}
          </Button>

          {selectedTestTypes.length > 0 && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Will generate {selectedTestTypes.length} type{selectedTestTypes.length !== 1 ? "s" : ""} of test cases
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
