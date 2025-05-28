// edit-project-dialog.tsx
"use client";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useEffect, useState } from "react";
import { ButtonLoader } from "../loader/Loader";
import { Divide } from "lucide-react";
import { useRouter } from 'next/navigation';

function capitalizeOnlyFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export type Member = {
  id: number;
  email: string;
  name: string;
  lname: string;
  imageUrl?: string;
};

// Shared schema
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["active", "inactive", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
  members: z.array(z.number()).optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema> & { id: number };

interface EditProjectDialogProps {
  project: {  
    id: number;
    title: string;
    description: string;
    status: "active" | "inactive" | "completed";
    priority: "high" | "medium" | "low";
    members?: Member[];
  };
  onEdit: (updatedProject: ProjectFormData) => void;
  children: React.ReactElement;
}

export function EditProjectDialog({
  project,
  onEdit,
  children,
}: EditProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Member[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
     status: project.status.toLowerCase() as "active" | "inactive" | "completed",
      priority: project.priority.toLowerCase() as "high" | "medium" | "low",
      members: project.members ? project.members.map((m) => m.id) : [],
    },
  });

  useEffect(() => {
    if (open) {
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
    }
  }, [open]);

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));

      console.log("Submitted values:", values);

      // 👇 Include the ID when calling onEdit
      onEdit({ ...values, id: project.id });

      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", {
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
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the project details below.
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
                    <Textarea placeholder="Project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
  control={form.control}
  name="status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status</FormLabel>
      <Select
        onValueChange={field.onChange}
        value={field.value?.toLowerCase()} // normalize if needed
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
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
        value={field.value?.toLowerCase()} // normalize if needed
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
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

<FormField
  control={form.control}
  name="members"
  render={() => {
    const selectedIds = form.watch("members") || [];
    const selectedUsers = users.filter((u) => selectedIds.includes(u.id));
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((user) =>
      `${user.name} ${user.lname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <FormItem>
        <FormLabel className="text-base font-semibold">Assigned Members</FormLabel>

        {/* Selected Users Display */}
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
            >
              <img
                src={user.imageUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{user.name} {user.lname}</span>
              <button
                type="button"
                onClick={() => {
                  const current = form.getValues("members") || [];
                  form.setValue(
                    "members",
                    current.filter((id) => id !== user.id)
                  );
                }}
                className="ml-1 text-red-500 hover:text-red-700"
              >
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
              checked={filteredUsers.every((user) => selectedIds.includes(user.id))}
              onChange={(e) => {
                const filteredIds = filteredUsers.map((u) => u.id);
                const newValues = e.target.checked
                  ? Array.from(new Set([...selectedIds, ...filteredIds]))
                  : selectedIds.filter((id) => !filteredIds.includes(id));
                form.setValue("members", newValues);
              }}
            />
            Select All
          </label>
        )}

        {/* Scrollable List */}
        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto rounded-md border p-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isChecked = selectedIds.includes(user.id);
              return (
                <label
                  key={user.id}
                  className="flex items-center gap-3 rounded-md px-2 py-1 transition hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={isChecked}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const current = form.getValues("members") || [];
                      form.setValue(
                        "members",
                        checked
                          ? [...current, user.id]
                          : current.filter((id) => id !== user.id)
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
            <span className="text-sm text-gray-500 italic">No users found.</span>
          )}
        </div>

        <FormMessage />
      </FormItem>
    );
  }}
/>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 min-w-[100px]"
              >
                {loading && <ButtonLoader />}
                {loading ? "Changing..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
