export interface TestStep {
  id: string;
  action: string;
  expectedResult: string;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "PASS" | "FAIL";
  module: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "Functional" | "Negative" | "Edge Case" | "Performance" | "Security";
  steps: {
    id: string;
    action: string;
    expectedResult: string;
  }[];
  createdBy: string;
  createdAt: Date;
  selected: boolean;
  preconditions: string[];
  testSteps: TestStep[];
}
