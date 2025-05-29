// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { PlusIcon } from "lucide-react";

// // Form schema
// const projectFormSchema = z.object({
//   title: z.string().min(2, {
//     message: "Title must be at least 12 characters.",
//   }),
//   description: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   status: z.enum(["active", "inactive", "completed"]),
// });

// export function CreateProject() {
//   // Form definition
//   const form = useForm<z.infer<typeof projectFormSchema>>({
//     resolver: zodResolver(projectFormSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       status: "active",
//     },
//   });

//   // Form submit handler
//   function onSubmit(values: z.infer<typeof projectFormSchema>) {
//     console.log(values);
//     // Here you would typically call your API to create the project
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>
//           <PlusIcon />
//           New Project
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Create New Project</DialogTitle>
//           <DialogDescription>
//             Fill in the details below to create a new project.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Project title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe the project..."
//                       className="min-h-[100px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-2">
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="active">Active</SelectItem>
//                         <SelectItem value="inactive">Inactive</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Priority</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="active">High</SelectItem>
//                         <SelectItem value="inactive">Medium</SelectItem>
//                         <SelectItem value="completed">Low</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter>
//               <Button type="submit">Create Project</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { PlusIcon } from "lucide-react";
// import { useState } from "react";

// // Match API schema
// const projectFormSchema = z.object({
//   title: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   description: z.string().optional(),
//   status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
//   priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
// });

// export function CreateProject() {
//   const [loading, setLoading] = useState(false);

//   const form = useForm<z.infer<typeof projectFormSchema>>({
//     resolver: zodResolver(projectFormSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       status: "ACTIVE",
//       priority: "MEDIUM",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof projectFormSchema>) {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/admin/projects", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("API Error:", errorData);
//         return;
//       }

//       const data = await res.json();
//       console.log("Project created:", data);
//       form.reset(); // Reset after success
//     } catch (error) {
//       console.error("Unexpected error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>
//           <PlusIcon className="mr-2 h-4 w-4" />
//           New Project
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Create New Project</DialogTitle>
//           <DialogDescription>
//             Fill in the details below to create a new project.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Project name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe the project..."
//                       className="min-h-[100px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-2">
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="ACTIVE">Active</SelectItem>
//                         <SelectItem value="INACTIVE">Inactive</SelectItem>
//                         <SelectItem value="COMPLETED">Completed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="priority"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Priority</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select priority" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="HIGH">High</SelectItem>
//                         <SelectItem value="MEDIUM">Medium</SelectItem>
//                         <SelectItem value="LOW">Low</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter>
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Creating..." : "Create Project"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { PlusIcon } from "lucide-react";
import { ButtonLoader } from "../loader/Loader";

// Schema matching API
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
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
      setOpen(false); // ✅ Close the dialog
      router.refresh(); // ✅ Refresh the project list
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                      defaultValue={field.value}
                    >
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
                          className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                        >
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
                          checked={filteredUsers.every((user) =>
                            selectedIds.includes(user.id)
                          )}
                          onChange={(e) => {
                            const filteredIds = filteredUsers.map((u) => u.id);
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
                                  const current =
                                    form.getValues("members") || [];
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
                        <span className="text-sm text-gray-500 italic">
                          No users found.
                        </span>
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
                className="flex items-center justify-center gap-2 min-w-[140px]"
              >
                {loading && <ButtonLoader />}
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
