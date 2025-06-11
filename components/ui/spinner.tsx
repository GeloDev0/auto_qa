// components/ui/spinner.tsx
import { TbLoader2 } from "react-icons/tb";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <TbLoader2 className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  );
}
