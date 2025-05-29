"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { TestCase } from "@/types/test-case";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Paperclip,
  Sparkles,
  Loader2,
  ArrowLeft,
  FileText,
  CheckCircle2,
  Plus,
} from "lucide-react";
import NextLink from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestCaseCard } from "@/components/testcase/test-case-card";
import { FaRobot } from "react-icons/fa";

// Dummy test case templates based on common scenarios
const testCaseTemplates = {
  login: [
    {
      title: "Valid User Login with Correct Credentials",
      description:
        "Verify that users can successfully log in with valid email and password",
      module: "Authentication",
      type: "Functional",
      priority: "High",
      steps: [
        {
          action: "Navigate to the login page",
          expectedResult:
            "Login form is displayed with email and password fields",
        },
        {
          action: "Enter valid email address in the email field",
          expectedResult:
            "Email is accepted and field shows no validation errors",
        },
        {
          action: "Enter correct password in the password field",
          expectedResult: "Password is masked and field accepts input",
        },
        {
          action: "Click the 'Login' button",
          expectedResult:
            "User is successfully authenticated and redirected to dashboard",
        },
      ],
    },
    {
      title: "Login Attempt with Invalid Credentials",
      description:
        "Verify that system handles invalid login attempts appropriately",
      module: "Authentication",
      type: "Negative",
      priority: "High",
      steps: [
        {
          action: "Navigate to the login page",
          expectedResult: "Login form is displayed",
        },
        {
          action: "Enter invalid email or password",
          expectedResult: "Credentials are entered in respective fields",
        },
        {
          action: "Click the 'Login' button",
          expectedResult:
            "Error message is displayed and user remains on login page",
        },
      ],
    },
    {
      title: "Login with Empty Credentials",
      description: "Verify that system validates required fields",
      module: "Authentication",
      type: "Edge Case",
      priority: "Medium",
      steps: [
        {
          action: "Navigate to the login page",
          expectedResult: "Login form is displayed",
        },
        {
          action: "Leave email and password fields empty",
          expectedResult: "Fields remain empty",
        },
        {
          action: "Click the 'Login' button",
          expectedResult: "Validation errors are shown for required fields",
        },
      ],
    },
    {
      title: "Password Reset Functionality",
      description: "Verify that users can request password reset",
      module: "Authentication",
      type: "Functional",
      priority: "Medium",
      steps: [
        {
          action: "Click 'Forgot Password' link on login page",
          expectedResult: "Password reset form is displayed",
        },
        {
          action: "Enter registered email address",
          expectedResult: "Email is accepted and form is ready for submission",
        },
        {
          action: "Click 'Send Reset Link' button",
          expectedResult: "Success message is displayed",
        },
      ],
    },
  ],
  ecommerce: [
    {
      title: "Add Product to Shopping Cart",
      description: "Verify that users can add products to their shopping cart",
      module: "Shopping Cart",
      type: "Functional",
      priority: "High",
      steps: [
        {
          action: "Navigate to a product page",
          expectedResult:
            "Product details and 'Add to Cart' button are visible",
        },
        {
          action: "Select product options (size, color, quantity)",
          expectedResult: "Options are selected and price updates accordingly",
        },
        {
          action: "Click 'Add to Cart' button",
          expectedResult: "Product is added to cart and cart counter updates",
        },
      ],
    },
    {
      title: "Remove Product from Cart",
      description: "Verify that users can remove products from their cart",
      module: "Shopping Cart",
      type: "Functional",
      priority: "Medium",
      steps: [
        {
          action: "Navigate to shopping cart with items",
          expectedResult: "Cart displays added products",
        },
        {
          action: "Click 'Remove' button for a product",
          expectedResult: "Product is removed and total is updated",
        },
      ],
    },
    {
      title: "Checkout Process with Valid Payment",
      description: "Verify successful checkout with valid payment information",
      module: "Checkout",
      type: "Functional",
      priority: "Critical",
      steps: [
        {
          action: "Proceed to checkout with items in cart",
          expectedResult: "Checkout form is displayed with order summary",
        },
        {
          action: "Enter valid shipping and billing information",
          expectedResult: "Information is accepted and validated",
        },
        {
          action: "Enter valid payment details",
          expectedResult: "Payment form accepts the information",
        },
        {
          action: "Click 'Place Order' button",
          expectedResult: "Order is processed and confirmation page is shown",
        },
      ],
    },
  ],
  dashboard: [
    {
      title: "Dashboard Data Loading",
      description: "Verify that dashboard loads user data correctly",
      module: "Dashboard",
      type: "Functional",
      priority: "High",
      steps: [
        {
          action: "Log in and navigate to dashboard",
          expectedResult: "Dashboard page loads with user-specific data",
        },
        {
          action: "Verify all widgets and charts are displayed",
          expectedResult: "All dashboard components render correctly",
        },
      ],
    },
    {
      title: "Dashboard Performance with Large Dataset",
      description: "Verify dashboard performance with large amounts of data",
      module: "Dashboard",
      type: "Performance",
      priority: "Medium",
      steps: [
        {
          action: "Load dashboard with large dataset",
          expectedResult: "Dashboard loads within acceptable time limits",
        },
        {
          action: "Interact with dashboard elements",
          expectedResult: "UI remains responsive during interactions",
        },
      ],
    },
  ],
  profile: [
    {
      title: "Update User Profile Information",
      description: "Verify that users can update their profile information",
      module: "User Profile",
      type: "Functional",
      priority: "Medium",
      steps: [
        {
          action: "Navigate to profile settings page",
          expectedResult: "Profile form is displayed with current information",
        },
        {
          action: "Update profile fields (name, email, etc.)",
          expectedResult: "Changes are reflected in the form",
        },
        {
          action: "Click 'Save Changes' button",
          expectedResult: "Profile is updated and success message is shown",
        },
      ],
    },
    {
      title: "Profile Picture Upload",
      description:
        "Verify that users can upload and update their profile picture",
      module: "User Profile",
      type: "Functional",
      priority: "Low",
      steps: [
        {
          action: "Click on profile picture upload area",
          expectedResult: "File selection dialog opens",
        },
        {
          action: "Select a valid image file",
          expectedResult: "Image preview is shown",
        },
        {
          action: "Confirm the upload",
          expectedResult: "Profile picture is updated across the application",
        },
      ],
    },
  ],
};

export default function GenerateTestCasePage() {
  const [userStoryTitle, setUserStoryTitle] = useState("");
  const [userStoryDescription, setUserStoryDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [formData, setFormData] = useState<{ priority: TestCase["priority"] }>({
    priority: "Medium",
  });

  const generateTestCases = async () => {
    if (
      !userStoryTitle.trim() ||
      !userStoryDescription.trim() ||
      !formData.priority
    ) {
      return;
    }

    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const testCases = generateDummyTestCases(
        userStoryTitle,
        userStoryDescription,
        formData.priority
      );
      setGeneratedTestCases(testCases);
    } catch (error) {
      console.error("Error generating test cases:", error);
      alert("Failed to generate test cases. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDummyTestCases = (
    title: string,
    description: string,
    priority: TestCase["priority"]
  ): TestCase[] => {
    // Determine which template to use based on the title/description content
    let selectedTemplate = testCaseTemplates.login; // default

    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();

    if (
      titleLower.includes("login") ||
      titleLower.includes("auth") ||
      descriptionLower.includes("login")
    ) {
      selectedTemplate = testCaseTemplates.login;
    } else if (
      titleLower.includes("cart") ||
      titleLower.includes("shop") ||
      titleLower.includes("ecommerce") ||
      descriptionLower.includes("cart") ||
      descriptionLower.includes("shop")
    ) {
      selectedTemplate = testCaseTemplates.ecommerce;
    } else if (
      titleLower.includes("dashboard") ||
      titleLower.includes("analytics") ||
      descriptionLower.includes("dashboard")
    ) {
      selectedTemplate = testCaseTemplates.dashboard;
    } else if (
      titleLower.includes("profile") ||
      titleLower.includes("user") ||
      descriptionLower.includes("profile")
    ) {
      selectedTemplate = testCaseTemplates.profile;
    }

    // Convert to our TestCase format with the selected priority
    return selectedTemplate.map((tc, index) => {
      const id = `TC-${String(index + 1).padStart(3, "0")}`;
      const steps = tc.steps.map((step, stepIndex) => ({
        id: `step-${Date.now()}-${stepIndex}`,
        action: step.action,
        expectedResult: step.expectedResult,
      }));

      return {
        id,
        title: tc.title,
        description: tc.description,
        module: tc.module,
        priority: priority, // Use the selected priority
        type: tc.type as
          | "Functional"
          | "Negative"
          | "Edge Case"
          | "Performance"
          | "Security",
        steps,
        selected: true,
      };
    });
  };

  const updateTestCase = (updatedTestCase: TestCase) => {
    setGeneratedTestCases((prev) =>
      prev.map((tc) => (tc.id === updatedTestCase.id ? updatedTestCase : tc))
    );
  };

  const deleteTestCase = (id: string) => {
    setGeneratedTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const duplicateTestCase = (testCase: TestCase) => {
    const newTestCase = {
      ...testCase,
      id: `TC-${String(generatedTestCases.length + 1).padStart(3, "0")}`,
      title: `${testCase.title} (Copy)`,
      selected: true,
    };
    setGeneratedTestCases((prev) => [...prev, newTestCase]);
  };

  const selectedCount = generatedTestCases.filter((tc) => tc.selected).length;

  const handleSelectAll = () => {
    const allSelected = generatedTestCases.every((tc) => tc.selected);
    setGeneratedTestCases((prev) =>
      prev.map((tc) => ({ ...tc, selected: !allSelected }))
    );
  };

  const handleAddToProject = () => {
    const selectedTestCases = generatedTestCases.filter((tc) => tc.selected);
    console.log("Adding to project:", selectedTestCases);
    alert(`Added ${selectedTestCases.length} test cases to project!`);
  };

  // Group test cases by module
  const groupedTestCases = generatedTestCases.reduce((groups, testCase) => {
    const module = testCase.module || "General";
    if (!groups[module]) {
      groups[module] = [];
    }
    groups[module].push(testCase);
    return groups;
  }, {} as Record<string, TestCase[]>);

  return (
    <div className="min-h-screen">
      {/* Header */}

      {/* Two Panel Layout */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
          {/* Left Panel - Generator */}
          <Card className="bg-white shadow-sm border-0 flex flex-col">
            <CardContent className="flex-1 overflow-auto space-y-6">
              {/* User Story Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  User Story Title
                </Label>
                <Input
                  id="title"
                  value={userStoryTitle}
                  onChange={(e) => setUserStoryTitle(e.target.value)}
                  placeholder="e.g., User Login Authentication, Shopping Cart Management"
                  className="text-base border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>

              {/* User Story Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-800"
                >
                  User Story Description
                </Label>

                <div className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden">
                  {/* Rich Text Toolbar */}
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>

                    <Separator orientation="vertical" className="h-5 mx-1" />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label="Numbered List"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    id="description"
                    value={userStoryDescription}
                    onChange={(e) => setUserStoryDescription(e.target.value)}
                    placeholder={`As a [user type], I want [functionality] so that [benefit/value]...

💡 Try keywords like "login", "cart", "dashboard", or "profile" to see different test case templates.`}
                    className="min-h-[140px] text-sm px-3 py-2 border-0 rounded-none focus:outline-none focus:ring-0 resize-none"
                  />
                </div>
              </div>

              {/* Priority Selection */}
              <div className="space-y-3">
                <Label htmlFor="priority">Default Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: TestCase["priority"]) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-gray-400" />
                        <span>Low Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                        <span>Medium Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="High">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-orange-400" />
                        <span>High Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Critical">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-red-400" />
                        <span>Critical Priority</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  This priority will be applied to all generated test cases
                </p>
              </div>

              {/* Attachments Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Attachments
                </Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                    <p className="text-xs text-gray-600">
                      Attach files for context
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateTestCases}
                disabled={
                  !userStoryTitle.trim() ||
                  !userStoryDescription.trim() ||
                  !formData.priority ||
                  isGenerating
                }
                className="w-full text-base font-medium disabled:bg-gray-300"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaRobot />
                    <span>Generate Test Cases</span>
                  </div>
                )}
              </Button>

              {/* Demo Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Demo Mode:</strong> Try keywords like "login", "cart",
                  "dashboard", or "profile" to see different test case
                  templates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Generated Test Cases */}
          <Card className="bg-white shadow-sm border-0 flex flex-col ">
            <CardHeader className="pb-4">
              {generatedTestCases.length > 0 && (
                <div className="flex items-center justify-between">
                  {/* Left: Selected count */}
                  <span className="text-sm text-gray-600">
                    {selectedCount} of {generatedTestCases.length} test cases
                    selected
                  </span>

                  {/* Right: Button and Badge */}
                  <div className="flex items-center gap-2">
                    <Button className="" size="sm" onClick={handleSelectAll}>
                      {generatedTestCases.every((tc) => tc.selected)
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Badge className="rounded-full">
                      {" "}
                      {generatedTestCases.length} total
                    </Badge>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-auto">
              {generatedTestCases.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    No test cases generated yet
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill out the form on the left and click generate to create
                    test cases
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedTestCases).map(([module, cases]) => (
                    <div key={module} className="space-y-3">
                      <div className="flex items-center gap-2"></div>
                      <div className="space-y-3">
                        {cases.map((testCase) => (
                          <TestCaseCard
                            key={testCase.id}
                            testCase={testCase}
                            onUpdate={updateTestCase}
                            onDelete={deleteTestCase}
                            onDuplicate={duplicateTestCase}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <CardFooter></CardFooter>
            </CardContent>

            {/* Add to Project Button */}
            {selectedCount > 0 && (
              <div className="p-4 border-t">
                <Button
                  onClick={handleAddToProject}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Add {selectedCount} Test Cases to Project
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
