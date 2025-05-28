"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TestCaseListItem } from "@/components/test-case-list-item"
import type { TestCase } from "@/types/test-case"
import { CheckCircle2, Plus } from "lucide-react"

interface TestCasesPanelProps {
  testCases: TestCase[]
  onUpdateTestCase: (testCase: TestCase) => void
  onDeleteTestCase: (id: string) => void
  onDuplicateTestCase: (testCase: TestCase) => void
  selectedCount: number
}

export function TestCasesPanel({
  testCases = [],
  onUpdateTestCase,
  onDeleteTestCase,
  onDuplicateTestCase,
  selectedCount,
}: TestCasesPanelProps) {
  const handleAddToProject = () => {
    const selectedTestCases = testCases.filter((tc) => tc.selected)
    console.log("Adding to project:", selectedTestCases)
  }

  if (!Array.isArray(testCases)) {
    return (
      <Card className="h-full flex flex-col shadow-sm border-0 bg-white">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-gray-600">Loading test cases...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (testCases.length === 0) {
    return (
      <Card className="h-full flex flex-col shadow-sm border-0 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Generated Test Cases</h3>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-gray-600 font-medium">No test cases generated yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Enter your requirements and click generate to create test cases
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Generated Test Cases</h3>
              <p className="text-sm text-gray-600 mt-1">{testCases.length} test cases generated</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allSelected = testCases.every((tc) => tc.selected)
                  testCases.forEach((tc) => {
                    onUpdateTestCase({ ...tc, selected: !allSelected })
                  })
                }}
              >
                {testCases.every((tc) => tc.selected) ? "Deselect All" : "Select All"}
              </Button>
              <Badge variant="secondary">{selectedCount} selected</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-0">
          {/* Table Header */}
          <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
            <div className="w-6"></div> {/* Checkbox space */}
            <div className="min-w-[80px]">ID</div>
            <div className="flex-1">Test Case</div>
            <div className="w-6">Priority</div>
            <div className="w-8">Assignee</div>
            <div className="w-[100px]">Type</div>
          </div>

          {/* Test Cases List */}
          <div className="divide-y divide-gray-100">
            {testCases.map((testCase) => (
              <TestCaseListItem
                key={testCase.id}
                testCase={testCase}
                onUpdate={onUpdateTestCase}
                onDelete={onDeleteTestCase}
                onDuplicate={onDuplicateTestCase}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      {selectedCount > 0 && (
        <div className="mt-4">
          <Button
            onClick={handleAddToProject}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Add {selectedCount} Test Cases to Project</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}
