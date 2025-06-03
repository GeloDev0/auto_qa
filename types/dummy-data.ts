// src/app/dummy-data.ts

import { TestCase } from "@/components/tables/testcase-table/test-case-details-sheets";

export const testCases: TestCase[] = [
  {
    id: "TC-001",
    testcase: "Login Functionality",
    description: "Verify user can login with valid credentials",
    module: "Authentication",
    priority: "High",
    status: "Active",
    createdBy: "John Doe",
    preconditions: [
      "User must be registered",
      "Test environment must be accessible",
      "Browser must be up to date",
    ],
    steps: [
      {
        action: "Navigate to login page",
        expected: "Login form is displayed",
      },
      {
        action: "Enter valid username and password",
        expected: "Credentials are accepted",
      },
      {
        action: "Click Login button",
        expected: "User is redirected to dashboard",
      },
    ],
  },
  {
    id: "TC-002",
    testcase: "Password Reset",
    description: "Verify user can reset forgotten password",
    module: "Authentication",
    priority: "Medium",
    status: "Active",
    createdBy: "Jane Smith",
    preconditions: [
      "User must have a valid email registered",
      "Email service must be running",
    ],
    steps: [
      {
        action: "Click 'Forgot Password' link",
        expected: "Password reset form appears",
      },
      {
        action: "Enter registered email address",
        expected: "Email is recognized",
      },
      {
        action: "Check email and follow reset link",
        expected: "Password reset page loads",
      },
    ],
  },
  {
    id: "TC-003",
    testcase: "User Logout",
    description: "Verify user can successfully logout",
    module: "Authentication",
    priority: "Low",
    status: "Active",
    createdBy: "Alice Brown",
    preconditions: ["User must be logged in"],
    steps: [
      {
        action: "Click on profile icon",
        expected: "Dropdown menu is shown",
      },
      {
        action: "Click 'Logout'",
        expected: "User is redirected to login screen",
      },
    ],
  },
  {
    id: "TC-004",
    testcase: "Create New Project",
    description: "Ensure users can create a new project",
    module: "Projects",
    priority: "High",
    status: "Active",
    createdBy: "Mark Green",
    preconditions: ["User must be logged in"],
    steps: [
      {
        action: "Navigate to Projects page",
        expected: "Project list is displayed",
      },
      {
        action: "Click 'New Project'",
        expected: "Project form is displayed",
      },
      {
        action: "Fill in project details and submit",
        expected: "Project is added to the list",
      },
    ],
  },
  {
    id: "TC-005",
    testcase: "Edit Project",
    description: "Check if project details can be edited",
    module: "Projects",
    priority: "Medium",
    status: "Active",
    createdBy: "Olivia Grey",
    preconditions: ["At least one project must exist"],
    steps: [
      {
        action: "Open project details",
        expected: "Project info is shown",
      },
      {
        action: "Click 'Edit'",
        expected: "Editable form appears",
      },
      {
        action: "Update project name and save",
        expected: "Changes are reflected in the list",
      },
    ],
  },
  {
    id: "TC-006",
    testcase: "Delete Project",
    description: "Verify that a project can be deleted",
    module: "Projects",
    priority: "High",
    status: "Inactive",
    createdBy: "Liam White",
    preconditions: ["User must have delete permissions"],
    steps: [
      {
        action: "Open project options",
        expected: "Delete option is visible",
      },
      {
        action: "Click 'Delete' and confirm",
        expected: "Project is removed from the list",
      },
    ],
  },
  {
    id: "TC-007",
    testcase: "Add Team Member",
    description: "Ensure a user can invite new team members",
    module: "Teams",
    priority: "Medium",
    status: "Active",
    createdBy: "Nina Blue",
    preconditions: ["User must have admin rights"],
    steps: [
      {
        action: "Go to Team settings",
        expected: "Team management page opens",
      },
      {
        action: "Click 'Invite Member'",
        expected: "Invite form appears",
      },
      {
        action: "Enter email and submit",
        expected: "Invitation is sent",
      },
    ],
  },
  {
    id: "TC-008",
    testcase: "Search Functionality",
    description: "Verify search returns correct results",
    module: "Dashboard",
    priority: "Low",
    status: "Active",
    createdBy: "Ethan Red",
    preconditions: ["Dashboard must contain data"],
    steps: [
      {
        action: "Enter query in search bar",
        expected: "Matching results appear",
      },
      {
        action: "Click a result",
        expected: "User is navigated to the relevant page",
      },
    ],
  },
  {
    id: "TC-009",
    testcase: "Form Validation",
    description: "Check client-side validation for required fields",
    module: "Forms",
    priority: "High",
    status: "Active",
    createdBy: "Sophia Black",
    preconditions: ["User must be on a form page"],
    steps: [
      {
        action: "Submit form without filling required fields",
        expected: "Error messages are displayed",
      },
    ],
  },
  {
    id: "TC-010",
    testcase: "File Upload",
    description: "Ensure users can upload supported files",
    module: "Documents",
    priority: "Medium",
    status: "Active",
    createdBy: "Daniel Gray",
    preconditions: ["User must be logged in"],
    steps: [
      {
        action: "Click 'Upload File'",
        expected: "File picker opens",
      },
      {
        action: "Select valid file",
        expected: "File is uploaded successfully",
      },
    ],
  },
];

export const getTestCaseById = (id: string) =>
  testCases.find((tc) => tc.id === id) || testCases[0];
