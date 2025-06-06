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
import { X, Save, Plus, Edit3, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

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

const priorityColors = {
  High: "bg-red-100 text-red-700 ",
  Medium: "bg-yellow-100 text-yellow-700 ",
  Low: "bg-green-100 text-green-700 ",
};

const statusColors = {
  Passed: "bg-green-100 text-green-700 ",
  Failed: "bg-red-100 text-red-700 ",
  Pending: "bg-yellow-100 text-yellow-700 ",
};

interface TestCaseSheetProps {
  testcase: TestCase;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updatedTestCase: TestCase) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (testCase: TestCase) => void;
}

export const TestCaseSheet = ({
  testcase,
  isOpen,
  onOpenChange,
  onSave,
  onDelete,
  onDuplicate,
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
    setEditValues({ ...testcase });
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
          <div className="flex items-center justify-between p-4 pt-10  border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm  text-blue-600 font-medium">
                {editValues.id}
              </span>
            </div>
            <div className="flex items-center gap-2 ">
              <Button onClick={handleEditCancel} variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                onClick={handleEditSave}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="p-6 pt-0 pb-10 space-y-6">
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
                  className="text-base w-full"
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
                  className="min-h-[80px] w-full resize-none"
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
                  className="w-full"
                />
              </div>

              {/* Priority and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Priority
                  </label>
                  <Select
                    value={editValues.priority}
                    onValueChange={(value) =>
                      setEditValues({
                        ...editValues,
                        priority: value,
                      })
                    }>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Status
                  </label>
                  <Select
                    value={editValues.status}
                    onValueChange={(value) =>
                      setEditValues({
                        ...editValues,
                        status: value,
                      })
                    }>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Passed">Passed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preconditions */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Preconditions
                </label>
                <div className="space-y-2">
                  {editValues.preconditions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 w-full">
                      <div className="flex-1">
                        <Textarea
                          value={item}
                          onChange={(e) =>
                            updatePrecondition(index, e.target.value)
                          }
                          className="min-h-[60px] w-full resize-none text-sm"
                          placeholder={`Precondition ${index + 1}...`}
                        />
                      </div>
                      <div className="flex items-center gap-1 pt-2">
                        <Button
                          onClick={() => removePrecondition(index)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-600">
                          <HiTrash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addPrecondition}
                  size="sm"
                  className="mt-5 w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Precondition
                </Button>
              </div>

              {/* Steps */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Steps
                </label>
                <div className="space-y-2">
                  {editValues.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2 w-full">
                      <div className="flex-1">
                        <Textarea
                          value={step.action}
                          onChange={(e) =>
                            updateStep(index, "action", e.target.value)
                          }
                          className="min-h-[60px] w-full resize-none text-sm"
                          placeholder={`Step ${index + 1} action...`}
                        />
                      </div>
                      <div className="flex items-center gap-1 pt-2">
                        <Button
                          onClick={() => removeStep(index)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-600">
                          <HiTrash className="h-3 w-3" />
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
                  {editValues.steps.map((step, index) => (
                    <div
                      key={`result-${index}`}
                      className="flex items-start gap-2 w-full">
                      <div className="flex-1">
                        <Textarea
                          value={step.expected}
                          onChange={(e) =>
                            updateStep(index, "expected", e.target.value)
                          }
                          className="min-h-[60px] w-full resize-none text-sm"
                          placeholder={`Expected result ${index + 1}...`}
                        />
                      </div>
                      <div className="flex items-center gap-1 pt-2">
                        <Button
                          onClick={() => removeStep(index)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-600">
                          <HiTrash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Step Button */}
              <Button onClick={addStep} size="sm" className="w-full mb-10">
                <Plus className="h-4 w-4 mr-2" />
                Add Step and Expected Result
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  // View Mode
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px] p-0">
        <div className="p-6">
          <SheetHeader className="space-y-4 p-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-500">
                  {testcase.id}
                </Badge>

                <Badge
                  className={`${
                    priorityColors[
                      testcase.priority as keyof typeof priorityColors
                    ]
                  }`}>
                  {testcase.priority}
                </Badge>
                <Badge
                  className={`${
                    statusColors[testcase.status as keyof typeof statusColors]
                  }`}>
                  {testcase.status}
                </Badge>
                <div className="flex items-center gap-2">
                  {onSave && (
                    <Button
                      onClick={handleEditStart}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                      <HiMiniPencilSquare className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6">
            <SheetTitle className="text-lg font-semibold text-gray-900 leading-tight">
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
              <p className="text-sm text-gray-600 leading-relaxed">
                {testcase.description || (
                  <span className="text-gray-400 italic">No description</span>
                )}
              </p>
            </div>

            {/* Module */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Module</h3>
              <p className="text-sm text-gray-600">
                {testcase.module || (
                  <span className="text-gray-400 italic">
                    No module specified
                  </span>
                )}
              </p>
            </div>

            {/* Preconditions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Preconditions
              </h3>
              {testcase.preconditions.length > 0 ? (
                <ul className="space-y-1 list-disc pl-5 text-sm text-gray-600">
                  {testcase.preconditions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No preconditions defined
                </p>
              )}
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Steps</h3>
              <ol className="space-y-2">
                {testcase.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{index + 1}.</span>{" "}
                    {step.action || (
                      <span className="text-gray-400 italic">
                        No action defined
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Expected Results */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Expected Results
              </h3>
              <ol className="space-y-2">
                {testcase.steps.map((step, index) => (
                  <li key={`result-${index}`} className="text-sm text-gray-600">
                    <span className="font-medium">{index + 1}.</span>{" "}
                    {step.expected || (
                      <span className="text-gray-400 italic">
                        No expected result defined
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
