import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface DeleteDialogProps {
  onDelete: () => void;
  children: React.ReactElement;
}

export function DeleteDialog({ onDelete, children }: DeleteDialogProps) {
  const [open, setOpen] = React.useState(false); // 👈 Manage open state

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(); // Run the deletion logic
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-medium">Confirm Deletion</h3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
