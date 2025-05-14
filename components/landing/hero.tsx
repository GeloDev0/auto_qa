import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-(--breakpoint-xl) w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
        <div className="max-w-xl">
          <h1 className="max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.2] tracking-tight bg-clip-text">
            <span className="bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              Revolutionize Testing
            </span>{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text dark:from-orange-400 dark:to-orange-300">
              with AI-Powered QA
            </span>
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg ">
            AutoQA streamlines test case creation, execution, and bug tracking —
            all powered by intelligent automation.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base"
            >
              Get Started <ArrowUpRight className="h-5! w-5!" />
            </Button>
          </div>
        </div>
        <div className="relative lg:max-w-lg xl:max-w-xl w-full  rounded-xl aspect-square">
          <video
            src="/quality-assurance.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-scale-down rounded-xl w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
