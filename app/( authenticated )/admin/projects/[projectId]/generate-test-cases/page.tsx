"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { TestCase } from "@/types/test-case";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Paperclip,
  Sparkles,
  Loader2,
  ArrowLeft,
  FileText,
  CheckCircle2,
  Plus,
} from "lucide-react";
import NextLink from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestCaseCard } from "@/components/testcase/test-case-card";
import { FaRobot } from "react-icons/fa";

export default function GenerateTestCasePage() {
  const [userStory, setUserStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [formData, setFormData] = useState<{ priority: TestCase["priority"] }>({
    priority: "Medium",
  });

  const generateTestCases = async () => {
    if (
      !userStory.trim() ||
      !formData.priority
    ) {
      return;
    }

    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await fetch("/api/admin/testcases/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userStory,
          priority: formData.priority.toUpperCase(), // ensure enum format
          save: false, // change to true if you want to store in DB
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Map the returned test cases to your interface and rename testSteps to steps
        const testCases: TestCase[] = data.testCases.map((tc: any, index: number) => ({
          id: tc.id ?? `TC-00${index+1}`,
          title: tc.title,
          description: tc.description,
          module: tc.module,
          priority: tc.priority,
          expectedResult: tc.expectedResult,
           testSteps: Array.isArray(tc.testSteps) ? tc.testSteps.map((step: any, index: number) => ({
            id: step.id ?? `${index + 1}`,
            action: step.action,
            expectedResult: step.expectedResult
          })) : [],
          selected: false,
        }));

        setGeneratedTestCases(testCases);
      } else {
        alert("Failed to generate test cases: " + JSON.stringify(data.error));
      }
    } catch (err) {
        alert("Error calling API");
    } finally {
      setIsGenerating(false)
    }


  };

  const updateTestCase = (updatedTestCase: TestCase) => {
    setGeneratedTestCases((prev) =>
      prev.map((tc) => (tc.id === updatedTestCase.id ? updatedTestCase : tc))
    );
  };

  const deleteTestCase = (id: string) => {
    setGeneratedTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const duplicateTestCase = (testCase: TestCase) => {
    const newTestCase = {
      ...testCase,
      id: `TC-00${String(generatedTestCases.length + 1).padStart(3, "0")}`,
      title: `${testCase.title} (Copy)`,
      selected: true,
    };
    setGeneratedTestCases((prev) => [...prev, newTestCase]);
  };

  const selectedCount = generatedTestCases.filter((tc) => tc.selected).length;

  const handleSelectAll = () => {
    const allSelected = generatedTestCases.every((tc) => tc.selected);
    setGeneratedTestCases((prev) =>
      prev.map((tc) => ({ ...tc, selected: !allSelected }))
    );
  };

  const handleAddToProject = () => {
    const selectedTestCases = generatedTestCases.filter((tc) => tc.selected);
    console.log("Adding to project:", selectedTestCases);
    alert(`Added ${selectedTestCases.length} test cases to project!`);
  };

  // Group test cases by module
  const groupedTestCases = generatedTestCases.reduce((groups, testCase) => {
    const module = testCase.module || "General";
    if (!groups[module]) {
      groups[module] = [];
    }
    groups[module].push(testCase);
    return groups;
  }, {} as Record<string, TestCase[]>);

  return (
    <div className="min-h-screen">
      {/* Header */}

      {/* Two Panel Layout */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
          {/* Left Panel - Generator */}
          <Card className="bg-white shadow-sm border-0 flex flex-col">
            <CardContent className="flex-1 overflow-auto space-y-6">
              {/* User Story */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-800">
                  User Story
                </Label>

                <div className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden">
                  {/* Rich Text Toolbar */}
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Bold">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Italic">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Underline">
                      <Underline className="h-4 w-4" />
                    </Button>

                    <Separator orientation="vertical" className="h-5 mx-1" />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Bullet List">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Numbered List">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    id="description"
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                    placeholder={`As a [user type], I want [functionality] so that [benefit/value]...
                                  Try keywords like "login", "cart", "dashboard", or "profile" to see different test case templates.`}
                    className="min-h-[140px] text-sm px-3 py-2 border-0 rounded-none focus:outline-none focus:ring-0 resize-none"
                  />
                </div>
              </div>

              {/* Priority Selection */}
              <div className="space-y-3">
                <Label htmlFor="priority">Default Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: TestCase["priority"]) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-gray-400" />
                        <span>Low Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                        <span>Medium Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="High">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-orange-400" />
                        <span>High Priority</span>
                      </div>
                    </SelectItem>

                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  This priority will be applied to all generated test cases
                </p>
              </div>

              {/* Attachments Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Attachments
                </Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                    <p className="text-xs text-gray-600">
                      Attach files for context
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateTestCases}
                disabled={
                  !userStory.trim() ||
                  !formData.priority ||
                  isGenerating
                }
                className="w-full text-base font-medium disabled:bg-gray-300">
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaRobot />
                    <span>Generate Test Cases</span>
                  </div>
                )}
              </Button>

              {/* Demo Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Demo Mode:</strong> Try keywords like "login", "cart",
                  "dashboard", or "profile" to see different test case
                  templates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Generated Test Cases */}
          <Card className="bg-white shadow-sm border-0 flex flex-col ">
            <CardHeader className="pb-4">
              {generatedTestCases.length > 0 && (
                <div className="flex items-center justify-between">
                  {/* Left: Selected count */}
                  <span className="text-sm text-gray-600">
                    {selectedCount} of {generatedTestCases.length} test cases
                    selected
                  </span>

                  {/* Right: Button and Badge */}
                  <div className="flex items-center gap-2">
                    <Button className="" size="sm" onClick={handleSelectAll}>
                      {generatedTestCases.every((tc) => tc.selected)
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Badge className="rounded-full">
                      {" "}
                      {generatedTestCases.length} total
                    </Badge>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-auto">
              {generatedTestCases.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    No test cases generated yet
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill out the form on the left and click generate to create
                    test cases
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generatedTestCases.map((testCase) => (
                    <TestCaseCard
                      key={testCase.id}
                      testCase={testCase}
                      onUpdate={updateTestCase}
                      onDelete={deleteTestCase}
                      onDuplicate={duplicateTestCase}
                    />
                  ))}
                </div>
              )}
              <CardFooter></CardFooter>
            </CardContent>

            {/* Add to Project Button */}
            {selectedCount > 0 && (
              <div className="p-4 border-t">
                <Button
                  onClick={handleAddToProject}
                  className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Add {selectedCount} Test Cases to Project
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
