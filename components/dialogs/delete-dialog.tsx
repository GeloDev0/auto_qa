"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import { toast } from "sonner";
import { ButtonLoader } from "../loading/Loader";

interface DeleteDialogProps {
  projectTitle?: string; // Optional, for better UX
  onDelete: () => Promise<void>;
  children: React.ReactElement;
}

export function DeleteDialog({ onDelete, children }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => setOpen(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Simulated delay for prototype
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await onDelete(); // Your mock logic (or real logic later)

      toast.success("Project has been successfully deleted", {
        description: new Date().toLocaleString(),
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation(); // Prevent dropdown menu from closing on trigger click
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-xl px-6 py-8">
        <DialogHeader className="flex flex-col items-center text-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm">
            <FaQuestionCircle className="w-8 h-8" />
          </div>
          <DialogTitle asChild>
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this project?
            </h3>
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <div className="w-full flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="min-w-[100px]"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="min-w-[100px] bg-red-500 hover:bg-red-600"
              disabled={loading}
            >
              {loading && <ButtonLoader />}
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
