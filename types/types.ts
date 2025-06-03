export type TestCase = {
  id: string;
  title: string;
  description: string;
  module: string;
  priority: "low" | "medium" | "high" | "critical";
  type: string;
  status: string;
  createdBy: string;
  preconditions: string[];
  steps: string[];
  expectedResults: string[];
};
