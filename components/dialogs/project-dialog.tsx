"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { ButtonLoader } from "../loader/Loader";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Updated schema with date fields
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  dateCreated: z.date({
    required_error: "Date created is required.",
  }),
  deadline: z.date().optional(),
  members: z.array(z.number()).optional(),
});

type User = {
  id: number;
  name: string;
  lname: string;
  imageUrl?: string;
};

export function CreateProject() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "ACTIVE",
      priority: "MEDIUM",
      dateCreated: new Date(),
      members: [],
    },
  });

  const [users, setUsers] = useState<User[]>([]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.lname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    fetchUsers();
  }, []);

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Project creation failed", {
          description: errorData?.message || "Something went wrong.",
        });
        return;
      }

      toast.success("Project has been successfully created", {
        description: new Date().toLocaleString(),
      });

      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <ScrollArea className="h-[80vh]  pr-4">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
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
                        placeholder="Describe the project..."
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="LOW">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateCreated"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Created</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="members"
                render={() => {
                  const selectedIds = form.watch("members") || [];
                  const selectedUsers = users.filter((u) =>
                    selectedIds.includes(u.id)
                  );

                  return (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Assign Members
                      </FormLabel>

                      {/* Selected Users Display */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                            <img
                              src={user.imageUrl || "/default-avatar.png"}
                              alt={user.name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span>
                              {user.name} {user.lname}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = form.getValues("members") || [];
                                form.setValue(
                                  "members",
                                  current.filter((id) => id !== user.id)
                                );
                              }}
                              className="ml-1 text-red-500 hover:text-red-700">
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Search Input */}
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-3 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
                      />

                      {/* Select All */}
                      {filteredUsers.length > 0 && (
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={filteredUsers.every((user) =>
                              selectedIds.includes(user.id)
                            )}
                            onChange={(e) => {
                              const filteredIds = filteredUsers.map(
                                (u) => u.id
                              );
                              const newValues = e.target.checked
                                ? Array.from(
                                    new Set([...selectedIds, ...filteredIds])
                                  )
                                : selectedIds.filter(
                                    (id) => !filteredIds.includes(id)
                                  );
                              form.setValue("members", newValues);
                            }}
                          />
                          Select All
                        </label>
                      )}

                      {/* Scrollable User List */}
                      <ScrollArea className="h-[180px] rounded-md border">
                        <div className="p-2 space-y-2">
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => {
                              const isChecked = selectedIds.includes(user.id);
                              return (
                                <label
                                  key={user.id}
                                  className="flex items-center gap-3 rounded-md px-2 py-1 transition hover:bg-gray-50">
                                  <input
                                    type="checkbox"
                                    value={user.id}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const current =
                                        form.getValues("members") || [];
                                      form.setValue(
                                        "members",
                                        checked
                                          ? [...current, user.id]
                                          : current.filter(
                                              (id) => id !== user.id
                                            )
                                      );
                                    }}
                                  />
                                  <img
                                    src={user.imageUrl || "/default-avatar.png"}
                                    alt={`${user.name} ${user.lname}`}
                                    className="w-7 h-7 rounded-full object-cover"
                                  />
                                  <span className="text-sm font-medium text-gray-800">
                                    {user.name} {user.lname}
                                  </span>
                                </label>
                              );
                            })
                          ) : (
                            <span className="text-sm text-gray-500 italic">
                              No users found.
                            </span>
                          )}
                        </div>
                      </ScrollArea>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 min-w-[140px]">
                  {loading && <ButtonLoader />}
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
