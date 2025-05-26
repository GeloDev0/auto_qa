"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TestCase {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  priority: string;
}

export default function PreviewGeneratedPage() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const router = useRouter();

  useEffect(() => {
    // In real-world, you'd generate test cases via AI API here
    const input = sessionStorage.getItem("generatorInput");
    if (!input) {
      router.push("./generate-test-cases");
      return;
    }

    const { storyTitle, criteria } = JSON.parse(input);

    // Simulate dummy generation
    const generated: TestCase[] = [
      {
        id: "TC-AUTO-001",
        title: "User should be able to login with valid credentials",
        steps: [
          "Navigate to login page",
          "Enter valid username",
          "Enter valid password",
          "Click login button",
        ],
        expected: "User is successfully logged in and redirected to dashboard",
        priority: "High",
      },
      {
        id: "TC-AUTO-002",
        title: "Password reset email should be sent",
        steps: [
          "Navigate to login page",
          "Click 'Forgot Password'",
          "Enter registered email address",
          "Submit request",
        ],
        expected: "System confirms that password reset email has been sent",
        priority: "Medium",
      },
    ];

    setTestCases(generated);
  }, []);

  const handleAddToProject = () => {
    // You could store this into your project context / state
    router.push("../"); // go back to the project page
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Generated Test Cases</h2>
        <Button onClick={handleAddToProject}>Add Selected Test Cases</Button>
      </div>
      {testCases.map((tc) => (
        <Card key={tc.id}>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium">{tc.title}</h3>
            <p className="text-sm text-muted-foreground">
              Priority: {tc.priority}
            </p>
            <div>
              <strong>Steps:</strong>
              <ol className="list-decimal list-inside pl-4">
                {tc.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <strong>Expected Result:</strong> {tc.expected}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
