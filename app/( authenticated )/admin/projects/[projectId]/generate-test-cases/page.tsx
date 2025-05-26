"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  MoreVertical,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";

const initialTestCases = [
  {
    id: "TC-AUTO-001",
    title: "User should be able to login with valid credentials",
    steps: [
      "Navigate to login page",
      "Enter valid username and password",
      "Click login",
    ],
    expected: "User is logged in and redirected to dashboard",
    priority: "High",
  },
  {
    id: "TC-AUTO-002",
    title: "Password reset email should be sent to registered user",
    steps: [
      "Go to 'Forgot Password'",
      "Enter registered email",
      "Click Submit",
    ],
    expected: "Reset email is sent",
    priority: "Medium",
  },
];

export default function GenerateTestCasesPage() {
  const [input, setInput] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [testCases, setTestCases] = useState(initialTestCases);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === testCases.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(testCases.map((tc) => tc.id));
    }
  };

  const updateTestCase = (id: string, updatedData: any) => {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, ...updatedData } : tc))
    );
  };

  const deleteTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
    setSelectedIds((prev) => prev.filter((tcId) => tcId !== id));
  };

  return (
    <div className="flex h-full min-h-screen p-6 gap-6 max-w-7xl mx-auto">
      <div className="w-1/2 space-y-4">
        <Card className="p-6 space-y-4 shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-800">User Story</h2>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            placeholder="Paste user story, requirement, or acceptance criteria here..."
            className="resize-none"
          />
          <Button className="w-full" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Generate Test Cases
          </Button>
        </Card>
      </div>

      <div className="w-1/2 space-y-4">
        <Card className="p-6 shadow-xl h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-blue-800">
                Preview Generated Test Cases
              </h2>
              <Button variant="ghost" size="sm" onClick={selectAll}>
                {selectedIds.length === testCases.length
                  ? "Clear All"
                  : "Select All"}
              </Button>
            </div>

            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {testCases.map((tc) => {
                const isChecked = selectedIds.includes(tc.id);
                const isEditing = editingId === tc.id;
                return (
                  <div
                    key={tc.id}
                    className={`border rounded-xl p-4 transition-all bg-white shadow-sm hover:shadow-md relative ${
                      isChecked ? "border-blue-500 ring-2 ring-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleSelect(tc.id)}
                      />
                      <div className="flex-1 space-y-2">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={tc.title}
                              onChange={(e) =>
                                updateTestCase(tc.id, { title: e.target.value })
                              }
                              className="text-lg font-medium text-gray-800"
                            />
                            <div className="space-y-1">
                              {tc.steps.map((step, i) => (
                                <Input
                                  key={i}
                                  value={step}
                                  onChange={(e) => {
                                    const newSteps = [...tc.steps];
                                    newSteps[i] = e.target.value;
                                    updateTestCase(tc.id, { steps: newSteps });
                                  }}
                                />
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateTestCase(tc.id, {
                                    steps: [...tc.steps, "New Step"],
                                  })
                                }
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Step
                              </Button>
                            </div>
                            <Input
                              value={tc.expected}
                              onChange={(e) =>
                                updateTestCase(tc.id, {
                                  expected: e.target.value,
                                })
                              }
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setEditingId(null)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-lg text-gray-800">
                                {tc.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => setEditingId(tc.id)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => deleteTestCase(tc.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ID: {tc.id}
                            </p>
                            <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                              {tc.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                            <p className="text-sm">
                              <span className="font-medium text-gray-600">
                                Expected:
                              </span>{" "}
                              {tc.expected}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t mt-6">
            <Button
              className="w-full"
              disabled={selectedIds.length === 0}
              variant={selectedIds.length ? "default" : "secondary"}
              size="lg"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Add {selectedIds.length || ""} Selected Test Case
              {selectedIds.length > 1 ? "s" : ""}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
