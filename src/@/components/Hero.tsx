import { Button } from "./ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center h-[100vh] py-20">
      <div className="text-left lg:text-left space-y-6 lg:justify-self-center">
        <div className="text-3xl md:text-7xl font-bold dark:text-white">
          Go 0 to 1 at an insane pace!
        </div>
        <div className="font-extralight text-base md:text-4xl text-gray-500 pb-2">
          Coming Soon, the only thing. Coming Soon deliverables online, seamless!
        </div>
        <Link href="/signup">
          <Button className="mt-4">
            Get Your Own Spike Now!
          </Button>
        </Link>
      </div>
      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
