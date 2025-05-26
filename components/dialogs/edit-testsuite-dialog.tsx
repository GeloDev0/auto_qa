"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLoader } from "../loader/Loader";

// Form schema
const testSuiteSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  assignedTester: z.string().min(1, { message: "Please select a tester." }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority.",
  }),
});

interface EditTestSuiteDialogProps {
  testSuite: {
    title: string;
    description: string;
    assignedTester?: string;
    priority: string;
  };
  onEdit: (updatedValues: z.infer<typeof testSuiteSchema>) => void;
  children: React.ReactElement;
}

export function EditTestSuiteDialog({
  testSuite,
  onEdit,
  children,
}: EditTestSuiteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof testSuiteSchema>>({
    resolver: zodResolver(testSuiteSchema),
    defaultValues: {
      title: testSuite.title,
      description: testSuite.description,
      assignedTester: testSuite.assignedTester ?? "", // fallback to empty string
    },
  });

  async function onSubmit(values: z.infer<typeof testSuiteSchema>) {
    setLoading(true);
    try {
      // Simulate async API
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Test suite updated successfully", {
        description: new Date().toLocaleString(),
      });

      onEdit(values);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update test suite", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Test Suite</DialogTitle>
          <DialogDescription>
            Update the test suite details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Test suite title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the test suite..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assignedTester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Tester</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tester1">Tester 1</SelectItem>
                        <SelectItem value="tester2">Tester 2</SelectItem>
                        <SelectItem value="tester3">Tester 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 min-w-[120px]"
              >
                {loading && <ButtonLoader />}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
