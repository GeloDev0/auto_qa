"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestCaseCard } from "@/components/test-case-card"
import type { TestCase } from "@/types/test-case"
import { ArrowLeft, CheckCircle2, Download, Share } from "lucide-react"

interface GeneratedTestCasesViewProps {
  testCases: TestCase[]
  userStoryTitle: string
  onBack: () => void
  onUpdateTestCase: (testCase: TestCase) => void
}

export function GeneratedTestCasesView({
  testCases,
  userStoryTitle,
  onBack,
  onUpdateTestCase,
}: GeneratedTestCasesViewProps) {
  const selectedCount = testCases.filter((tc) => tc.selected).length

  const groupedTestCases = testCases.reduce(
    (groups, testCase) => {
      const module = testCase.module || "General"
      if (!groups[module]) {
        groups[module] = []
      }
      groups[module].push(testCase)
      return groups
    },
    {} as Record<string, TestCase[]>,
  )

  const handleSelectAll = () => {
    const allSelected = testCases.every((tc) => tc.selected)
    testCases.forEach((tc) => {
      onUpdateTestCase({ ...tc, selected: !allSelected })
    })
  }

  const handleAddToProject = () => {
    const selectedTestCases = testCases.filter((tc) => tc.selected)
    console.log("Adding to project:", selectedTestCases)
    // Navigate back to main project or show success message
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Generator
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Generated Test Cases</h1>
              <p className="text-gray-600 mt-1">For: {userStoryTitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {testCases.every((tc) => tc.selected) ? "Deselect All" : "Select All"}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-gray-900">{testCases.length}</div>
              <div className="text-sm text-gray-600">Total Test Cases</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-blue-600">{selectedCount}</div>
              <div className="text-sm text-gray-600">Selected</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-green-600">{Object.keys(groupedTestCases).length}</div>
              <div className="text-sm text-gray-600">Modules</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-purple-600">
                {testCases.reduce((sum, tc) => sum + tc.steps.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Steps</div>
            </CardContent>
          </Card>
        </div>

        {/* Test Cases by Module */}
        <div className="space-y-6">
          {Object.entries(groupedTestCases).map(([module, cases]) => (
            <Card key={module} className="bg-white shadow-sm border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{module}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{cases.length} test cases</Badge>
                    <Badge variant="outline">{cases.filter((tc) => tc.selected).length} selected</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cases.map((testCase) => (
                  <TestCaseCard
                    key={testCase.id}
                    testCase={testCase}
                    onUpdate={onUpdateTestCase}
                    onDelete={() => {}} // Not needed in this view
                    onDuplicate={() => {}} // Not needed in this view
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        {selectedCount > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button
              onClick={handleAddToProject}
              size="lg"
              className="h-14 px-6 bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Add {selectedCount} Test Cases to Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
