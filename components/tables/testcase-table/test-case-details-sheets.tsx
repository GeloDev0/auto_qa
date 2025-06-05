// src/app/test-case-sheet.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Save, Plus, Trash2, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type TestCase = {
  id: string;
  testcase: string;
  description: string;
  module: string;
  priority: string;
  status: string;
  createdBy: string;
  preconditions: string[];
  steps: {
    action: string;
    expected: string;
  }[];
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700 ";
    case "medium":
      return "bg-yellow-50 text-yellow-700 ";
    case "low":
      return "bg-green-50 text-green-700 ";
    default:
      return "bg-gray-50 text-gray-700 ";
  }
};

interface TestCaseSheetProps {
  testcase: TestCase;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updatedTestCase: TestCase) => void;
  onDelete?: (id: string) => void;
}

export const TestCaseSheet = ({
  testcase,
  isOpen,
  onOpenChange,
  onSave,
  onDelete,
}: TestCaseSheetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<TestCase>({ ...testcase });

  // Reset edit values when testcase prop changes
  useEffect(() => {
    setEditValues({ ...testcase });
  }, [testcase]);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValues({ ...testcase }); // Reset to original values
  };

  const handleEditSave = () => {
    if (onSave) {
      onSave(editValues);
    }
    setIsEditing(false);
  };

  const addPrecondition = () => {
    setEditValues({
      ...editValues,
      preconditions: [...editValues.preconditions, ""],
    });
  };

  const updatePrecondition = (index: number, value: string) => {
    const newPreconditions = [...editValues.preconditions];
    newPreconditions[index] = value;
    setEditValues({
      ...editValues,
      preconditions: newPreconditions,
    });
  };

  const removePrecondition = (index: number) => {
    setEditValues({
      ...editValues,
      preconditions: editValues.preconditions.filter((_, i) => i !== index),
    });
  };

  const addStep = () => {
    setEditValues({
      ...editValues,
      steps: [...editValues.steps, { action: "", expected: "" }],
    });
  };

  const updateStep = (
    index: number,
    field: keyof TestCase["steps"][0],
    value: string
  ) => {
    const newSteps = [...editValues.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setEditValues({
      ...editValues,
      steps: newSteps,
    });
  };

  const removeStep = (index: number) => {
    setEditValues({
      ...editValues,
      steps: editValues.steps.filter((_, i) => i !== index),
    });
  };

  if (isEditing) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="w-[600px] sm:max-w-[600px] p-0">
          {/* Edit Mode Header */}
          <div className="flex items-center justify-between p-10 pl-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-50 text-blue-700 font-medium">
                {editValues.id}
              </Badge>
              {onDelete && (
                <Button
                  onClick={() => onDelete && onDelete(editValues.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleEditCancel} variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                onClick={handleEditSave}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Title
                </label>
                <Input
                  value={editValues.testcase}
                  onChange={(e) =>
                    setEditValues({ ...editValues, testcase: e.target.value })
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
                    setEditValues({
                      ...editValues,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[80px]"
                />
              </div>

              {/* Module */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Module
                </label>
                <Input
                  value={editValues.module}
                  onChange={(e) =>
                    setEditValues({ ...editValues, module: e.target.value })
                  }
                />
              </div>

              {/* Priority - Added for editing */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2 ">
                  Priority
                </label>
                <Select
                  value={editValues.priority.toLowerCase()}
                  onValueChange={(value) =>
                    setEditValues({
                      ...editValues,
                      priority: value,
                    })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preconditions */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Preconditions
                  </label>
                  <Button
                    onClick={addPrecondition}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {editValues.preconditions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-1">
                        <Textarea
                          value={item}
                          onChange={(e) =>
                            updatePrecondition(index, e.target.value)
                          }
                          className="min-h-[60px] text-sm"
                          placeholder={`Precondition ${index + 1}...`}
                        />
                      </div>
                      <Button
                        onClick={() => removePrecondition(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Steps
                  </label>
                  <Button
                    onClick={addStep}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                <div className="space-y-4">
                  {editValues.steps.map((step, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-medium">
                          Step {index + 1}
                        </div>
                        <Button
                          onClick={() => removeStep(index)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">
                            Action
                          </label>
                          <Textarea
                            value={step.action}
                            onChange={(e) =>
                              updateStep(index, "action", e.target.value)
                            }
                            className="min-h-[60px] text-sm"
                            placeholder={`Describe action ${index + 1}...`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">
                            Expected Result
                          </label>
                          <Textarea
                            value={step.expected}
                            onChange={(e) =>
                              updateStep(index, "expected", e.target.value)
                            }
                            className="min-h-[60px] text-sm"
                            placeholder={`Expected result ${index + 1}...`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information (Read-only) */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">
                      Created By
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {editValues.createdBy}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">
                      Status
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {editValues.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  // View Mode
  const stepActions = testcase.steps.map((step) => step.action);
  const expectedResults = testcase.steps.map((step) => step.expected);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px] p-0">
        <div className="p-6">
          <SheetHeader className="space-y-4 p-0">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-50 text-blue-700 font-medium">
                {testcase.id}
              </Badge>
              <Badge
                className={`font-medium ${getPriorityColor(testcase.priority)}`}
              >
                {testcase.priority.charAt(0).toUpperCase() +
                  testcase.priority.slice(1)}
              </Badge>

              {/* Edit button moved to the left */}
              {onSave && (
                <Button onClick={handleEditStart} variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="mt-6">
            <SheetTitle className="text-xl font-medium text-gray-900 leading-relaxed">
              {testcase.testcase}
            </SheetTitle>
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-auto px-6">
          <div className="space-y-6 pb-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {testcase.description}
              </p>
            </div>

            {/* Preconditions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Preconditions
              </h3>
              <ul className="space-y-1 list-disc pl-5">
                {testcase.preconditions.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Module */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Module</h3>
              <p className="text-sm text-gray-700">{testcase.module}</p>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Steps</h3>
              <ol className="space-y-2">
                {stepActions.map((action, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="text-gray-500 font-medium flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Expected Results */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Expected Results
              </h3>
              <ol className="space-y-2">
                {expectedResults.map((result, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="text-gray-500 font-medium flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Additional Information */}
            <div className="pt-4  border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Additional Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">
                    Created By
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {testcase.createdBy}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">
                    Status
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {testcase.status}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">
                    Created By
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {testcase.createdBy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
