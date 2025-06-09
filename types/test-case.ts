export interface TestStep {
  id: string;
  action: string;
  expectedResult: string;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  module: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  type: "Functional" | "Negative" | "Edge Case" | "Performance" | "Security";
  steps: {
    id: string;
    action: string;
    expectedResult: string;
  }[];
  selected: boolean;
  preconditions?: string; // Make optional
  expectedResults?: string[]; // Make optional
}
