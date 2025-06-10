import {
  FolderIcon,
  TestTubeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldIcon,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-3 @3xl/main:grid-cols-4 @5xl/main:grid-cols-5 lg:px-6">
      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-r from-sky-100 via-sky-100 to-sky-200 text-slate-700 shadow-lg">
        <CardHeader className="relative pb-4">
          <CardDescription className="text-sky-600 font-medium">Projects</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            1500
          </CardTitle>
          <div className="absolute right-4 top-4 rounded-full bg-white/60 p-2">
            <FolderIcon className="h-5 w-5 text-sky-600 font-medium" />
          </div>
        </CardHeader>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-200 text-slate-700 shadow-lg">
        <CardHeader className="relative pb-4 ">
          <CardDescription className="text-blue-600 font-medium">
            Test Cases
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4 rounded-full bg-white/60 p-2">
            <TestTubeIcon className="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-r from-emerald-100 via-emerald-100 to-emerald-200 text-slate-700 shadow-lg">
        <CardHeader className="relative pb-4">
          <CardDescription className="text-emerald-600 font-medium">Passed</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            45,678
          </CardTitle>
          <div className="absolute right-4 top-4 rounded-full bg-white/60 p-2">
            <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
          </div>
        </CardHeader>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-r from-rose-100 via-rose-100 to-rose-200 text-slate-700 shadow-lg">
        <CardHeader className="relative pb-4">
          <CardDescription className="text-rose-600 font-medium ">Failed</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4 rounded-full bg-white/60 p-2">
            <XCircleIcon className="h-5 w-5 text-rose-600" />
          </div>
        </CardHeader>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-r from-yellow-100 via-yellow-100 to-yellow-200 text-slate-700 shadow-lg">
        <CardHeader className="relative pb-4">
          <CardDescription className="text-yellow-600 font-medium">Pending</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4 rounded-full bg-white/60 p-2">
            <ShieldIcon className="h-5 w-5 text-yellow-600" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
