"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { TestCase } from "@/types/test-case";
import {
  Edit3,
  Trash2,
  Flag,
  Plus,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Copy,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";

interface TestCaseCardProps {
  testCase: TestCase;
  onUpdate: (testCase: TestCase) => void;
  onDelete: (id: string) => void;
  onDuplicate: (testCase: TestCase) => void;
}

const priorityColors = {
  Low: "bg-gray-50 text-gray-600 border-gray-200",
  Medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
  High: "bg-orange-50 text-orange-600 border-orange-200",
  Critical: "bg-red-50 text-red-600 border-red-200",
};

export function TestCaseCard({
  testCase,
  onUpdate,
  onDelete,
  onDuplicate,
}: TestCaseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editValues, setEditValues] = useState({
    title: testCase.title,
    description: testCase.description,
    module: testCase.module,
    testSteps: testCase.testSteps.map((step) => ({ ...step })),
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const updateField = (field: keyof TestCase, value: any) => {
    onUpdate({ ...testCase, [field]: value });
  };

  const addStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      action: "",
      expectedResult: "",
    };
    setEditValues((prev) => ({
      ...prev,
      testSteps: [...prev.testSteps, newStep],
    }));
  };

  const removeStep = (stepIndex: number) => {
    setEditValues((prev) => ({
      ...prev,
      testSteps: prev.testSteps.filter((_, index) => index !== stepIndex),
    }));
  };

  const updateEditStep = (
    stepIndex: number,
    field: "action" | "expectedResult",
    value: string
  ) => {
    setEditValues((prev) => ({
      ...prev,
      testSteps: prev.testSteps.map((step, index) =>
        index === stepIndex ? { ...step, [field]: value } : step
      ),
    }));
  };

  const handleEditStart = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
      testSteps: testCase.testSteps.map((step) => ({ ...step })),
    });
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    setIsSaving(true);

    try {
      // Show loading state for a minimum time (better UX)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success toast before state changes
      toast.success("Test case saved successfully", {
        description: "Your changes have been applied.",
        duration: 3000,
      });

      // Update parent component
      onUpdate({
        ...testCase,
        title: editValues.title,
        description: editValues.description,
        module: editValues.module,
        steps: editValues.steps,
      });

      // Close edit mode after toast appears
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save test case", {
        description: "There was an error while saving your changes.",
        action: {
          label: "Retry",
          onClick: handleEditSave,
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCancel = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
      testSteps: testCase.testSteps.map((step) => ({ ...step })),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="border border-gray-200 bg-white shadow-sm pb-0 pt-0">
        {/* Edit Mode Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-blue-600 font-medium">
              {testCase.id}
            </span>
            <Button
              onClick={() => {
                toast("Are you sure you want to delete this test case?", {
                  action: {
                    label: "Delete",
                    onClick: () => onDelete(testCase.id),
                  },
                });
              }}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleEditCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleEditSave}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Title
            </label>
            <Input
              value={editValues.title}
              onChange={(e) =>
                setEditValues((prev) => ({ ...prev, title: e.target.value }))
              }
              className="text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Description
            </label>
            <Textarea
              value={editValues.description}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Preconditions */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Preconditions
            </label>
            <Textarea
              value={editValues.module}
              onChange={(e) =>
                setEditValues((prev) => ({ ...prev, module: e.target.value }))
              }
              className="min-h-[60px] resize-none"
              placeholder="System is operational and ready to accept requirement inputs."
            />
          </div>

          {/* Steps */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Steps
            </label>
            <div className="space-y-2">
              {editValues.testSteps.map((testSteps, index) => (
                <div key={testSteps.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <Textarea
                      value={testSteps.action}
                      onChange={(e) =>
                        updateEditStep(index, "action", e.target.value)
                      }
                      className="min-h-[60px] resize-none text-sm"
                      placeholder={`Step ${index + 1} action...`}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => removeStep(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Results */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Expected Results
            </label>
            <div className="space-y-2">
              {editValues.testSteps.map((testSteps, index) => (
                <div
                  key={`result-${testSteps.id}`}
                  className="flex items-start gap-2"
                >
                  <div className="flex-1">
                    <Textarea
                      value={testSteps.expectedResult}
                      onChange={(e) =>
                        updateEditStep(index, "expectedResult", e.target.value)
                      }
                      className="min-h-[60px] resize-none text-sm"
                      placeholder={`Expected result ${index + 1}...`}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => removeStep(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Step Button */}
          <Button
            onClick={addStep}
            variant="outline"
            size="sm"
            className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Step and Expected Result
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md border pb-0 pt-0 ${
        testCase.selected
          ? "border-blue-200 bg-blue-50/30 shadow-sm"
          : "border-gray-200/60 bg-white hover:border-gray-300/80 shadow-sm"
      }`}>
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={testCase.selected}
            onCheckedChange={(checked) => updateField("selected", checked)}
            className="mt-1.5"
          />

          <div className="flex-1 min-w-0">
            {/* Header Row with ID and Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1.5  rounded-md border border-blue-200 font-medium">
                  {testCase.id}
                </span>

                {/* Editable Priority */}
                <Select
                  value={testCase.priority}
                  onValueChange={(value: TestCase["priority"]) =>
                    updateField("priority", value)
                  }>
                  <SelectTrigger
                    className={`h-auto px-3 text-xs border ${
                      priorityColors[testCase.priority]
                    } hover:opacity-80 transition-opacity`}>
                    <div className="flex items-center gap-1.5">
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    onDuplicate(testCase);
                    toast.success("Test case duplicated", {
                      description: "A copy has been created successfully.",
                    });
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleEditStart}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {/* Title Display */}
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {testCase.title}
              </h3>

              {/* Description Display */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {testCase.description || (
                    <span className="text-gray-400 italic">No description</span>
                  )}
                </p>
              </div>

              {/* Preconditions Display */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Preconditions
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {testCase.module || (
                    <span className="text-gray-400 italic">
                      No preconditions defined
                    </span>
                  )}
                </p>
              </div>

              {/* Steps Collapsible */}
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span>Steps</span>
                      <span className="text-xs text-gray-500">
                        ({testCase.testSteps.length})
                      </span>
                    </div>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-4 space-y-4">
                    {/* Steps Display */}
                    <div>
                      <ol className="space-y-2">
                        {testCase.testSteps.map((testSteps, index) => (
                          <li key={testSteps.id} className="text-sm text-gray-700">
                            <span className="font-medium">{index + 1}.</span>{" "}
                            {testSteps.action || (
                              <span className="text-gray-400 italic">
                                No action defined
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expected Results Display */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Expected Results
                      </h4>
                      <ol className="space-y-2">
                        {testCase.testSteps.map((testSteps, index) => (
                          <li
                            key={`result-${testSteps.id}`}
                            className="text-sm text-gray-700"
                          >
                            <span className="font-medium">{index + 1}.</span>{" "}
                            {testSteps.expectedResult || (
                              <span className="text-gray-400 italic">
                                No expected result defined
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
