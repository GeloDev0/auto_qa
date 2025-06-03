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
}

export const TestCaseSheet = ({
  testcase,
  isOpen,
  onOpenChange,
}: TestCaseSheetProps) => {
  // Prepare data for display
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
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
