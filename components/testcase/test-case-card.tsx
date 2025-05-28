"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TestCase } from "@/types/test-case";
import {
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Edit3,
  Copy,
  Trash2,
  Flag,
  Plus,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
  X,
} from "lucide-react";

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

const typeColors = {
  Functional: "bg-blue-50 text-blue-600 border-blue-200",
  Negative: "bg-purple-50 text-purple-600 border-purple-200",
  "Edge Case": "bg-indigo-50 text-indigo-600 border-indigo-200",
  Performance: "bg-green-50 text-green-600 border-green-200",
  Security: "bg-red-50 text-red-600 border-red-200",
  Integration: "bg-cyan-50 text-cyan-600 border-cyan-200",
};

export function TestCaseCard({
  testCase,
  onUpdate,
  onDelete,
  onDuplicate,
}: TestCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: testCase.title,
    description: testCase.description,
    module: testCase.module,
  });

  const updateField = (field: keyof TestCase, value: any) => {
    onUpdate({ ...testCase, [field]: value });
  };

  const updateStep = (
    stepIndex: number,
    field: "action" | "expectedResult",
    value: string
  ) => {
    const updatedSteps = testCase.steps.map((step, index) =>
      index === stepIndex ? { ...step, [field]: value } : step
    );
    updateField("steps", updatedSteps);
  };

  const addStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      action: "",
      expectedResult: "",
    };
    updateField("steps", [...testCase.steps, newStep]);
  };

  const removeStep = (stepIndex: number) => {
    const updatedSteps = testCase.steps.filter(
      (_, index) => index !== stepIndex
    );
    updateField("steps", updatedSteps);
  };

  const moveStep = (stepIndex: number, direction: "up" | "down") => {
    const newSteps = [...testCase.steps];
    const targetIndex = direction === "up" ? stepIndex - 1 : stepIndex + 1;

    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    [newSteps[stepIndex], newSteps[targetIndex]] = [
      newSteps[targetIndex],
      newSteps[stepIndex],
    ];
    updateField("steps", newSteps);
  };

  const handleEditStart = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
    });
    setIsEditing(true);
  };

  const handleEditSave = () => {
    onUpdate({
      ...testCase,
      title: editValues.title,
      description: editValues.description,
      module: editValues.module,
    });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValues({
      title: testCase.title,
      description: testCase.description,
      module: testCase.module,
    });
    setIsEditing(false);
  };

  return (
    <TooltipProvider>
      <Card
        className={`transition-all duration-200 hover:shadow-md border pt-0 pb-0 ${
          testCase.selected
            ? "border-blue-200 bg-blue-50/30 shadow-sm"
            : "border-gray-200/60 bg-white hover:border-gray-300/80 shadow-sm"
        }`}
      >
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
                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 font-medium">
                    {testCase.id}
                  </span>

                  {/* Editable Priority */}
                  <Select
                    value={testCase.priority}
                    onValueChange={(value: TestCase["priority"]) =>
                      updateField("priority", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-7 text-xs border ${
                        priorityColors[testCase.priority]
                      } hover:opacity-80 transition-opacity`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Flag className="h-3 w-3" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Editable Type */}
                  <Select
                    value={testCase.type}
                    onValueChange={(value: TestCase["type"]) =>
                      updateField("type", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-7 text-xs border ${
                        typeColors[testCase.type]
                      } hover:opacity-80 transition-opacity`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Functional">Functional</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                      <SelectItem value="Edge Case">Edge Case</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions Dropdown */}
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More actions</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <Edit3 className="h-4 w-4 mr-3" />
                      {isExpanded ? "Collapse Details" : "Expand Details"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={addStep}>
                      <Plus className="h-4 w-4 mr-3" />
                      Add Test Step
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDuplicate(testCase)}>
                      <Copy className="h-4 w-4 mr-3" />
                      Duplicate Test Case
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(testCase.id)}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete Test Case
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Editable Fields Section */}
              {isEditing ? (
                <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Edit Test Case
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleEditSave}
                        size="sm"
                        className="h-7 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        onClick={handleEditCancel}
                        variant="outline"
                        size="sm"
                        className="h-7"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-2">
                      Title
                    </label>
                    <Input
                      value={editValues.title}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="text-sm"
                      placeholder="Test case title..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-2">
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
                      className="text-sm min-h-[80px]"
                      placeholder="Test case description..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-2">
                      Module
                    </label>
                    <Input
                      value={editValues.module}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          module: e.target.value,
                        }))
                      }
                      className="text-sm"
                      placeholder="Module name..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Title Display */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {testCase.title}
                    </h3>
                    <Button
                      onClick={handleEditStart}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Description Display */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {testCase.description || (
                      <span className="text-gray-400 italic">
                        No description
                      </span>
                    )}
                  </p>

                  {/* Module and Steps Info - Aligned */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Module:</span>
                      <span className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md font-medium">
                        {testCase.module || "No module"}
                      </span>
                    </div>

                    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3 mr-1.5" />
                          ) : (
                            <ChevronRight className="h-3 w-3 mr-1.5" />
                          )}
                          {testCase.steps.length}{" "}
                          {testCase.steps.length === 1 ? "step" : "steps"}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent>
            <CardContent className="pt-0 px-6 pb-6">
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Test Steps
                  </h4>
                  <Button
                    onClick={addStep}
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1.5" />
                    Add Step
                  </Button>
                </div>

                {testCase.steps.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-sm mb-3">No test steps defined yet.</p>
                    <Button onClick={addStep} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testCase.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="bg-gray-50/80 rounded-lg p-5 space-y-4 group border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-move">
                                  <GripVertical className="h-4 w-4 text-gray-400" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Drag to reorder</p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-md border border-gray-200">
                              Step {index + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => moveStep(index, "up")}
                                  disabled={index === 0}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Move up</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => moveStep(index, "down")}
                                  disabled={index === testCase.steps.length - 1}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Move down</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => removeStep(index)}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete step</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-gray-600 block mb-2">
                            Action
                          </label>
                          <Textarea
                            value={step.action}
                            onChange={(e) =>
                              updateStep(index, "action", e.target.value)
                            }
                            className="text-sm text-gray-900 leading-relaxed min-h-[60px]"
                            placeholder="Describe the action to perform..."
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-gray-600 block mb-2">
                            Expected Result
                          </label>
                          <Textarea
                            value={step.expectedResult}
                            onChange={(e) =>
                              updateStep(
                                index,
                                "expectedResult",
                                e.target.value
                              )
                            }
                            className="text-sm text-gray-700 leading-relaxed min-h-[60px]"
                            placeholder="Describe the expected outcome..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </TooltipProvider>
  );
}
