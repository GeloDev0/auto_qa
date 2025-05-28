"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface GroupingControlsProps {
  groupBy: "none" | "component" | "priority" | "status"
  onGroupByChange: (groupBy: "none" | "component" | "priority" | "status") => void
}

export function GroupingControls({ groupBy, onGroupByChange }: GroupingControlsProps) {
  return (
    <div className="flex items-center gap-2 bg-white p-4 rounded-lg border">
      <Label htmlFor="group-by" className="text-sm font-medium whitespace-nowrap">
        Group by:
      </Label>
      <Select value={groupBy} onValueChange={onGroupByChange}>
        <SelectTrigger className="w-[140px]" id="group-by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Grouping</SelectItem>
          <SelectItem value="component">Component</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
