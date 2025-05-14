import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/Vector.svg"
        alt="AutoQA Logo"
        width={140}
        height={40}
        priority
      />
    </Link>
  );
};
