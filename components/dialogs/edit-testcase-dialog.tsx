// components/dialogs/edit-testcase-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { TestCase } from "../tables/testcase-table/test-case-details-sheets";

interface EditTestCaseDialogProps {
  testcase: TestCase;
  onEdit: (updatedTestCase: TestCase) => void;
  children: React.ReactNode;
}

export function EditTestCaseDialog({
  testcase,
  onEdit,
  children,
}: EditTestCaseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTestCase, setEditedTestCase] = useState(testcase);

  const handleSave = () => {
    onEdit(editedTestCase);
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Test Case</DialogTitle>
            <DialogDescription>
              Update the test case details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="testcase" className="text-right">
                Test Case
              </Label>
              <Input
                id="testcase"
                value={editedTestCase.testcase}
                onChange={(e) =>
                  setEditedTestCase({
                    ...editedTestCase,
                    testcase: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            {/* Add other fields similarly */}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
