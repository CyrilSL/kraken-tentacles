import { Statistics } from "./Statistics";
import pilot from "../../assets/pilot.png";
import Image from "next/image";

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <div className="bg-white border rounded-lg py-12 shadow-lg"> {/* Add the shadow-lg class here */}
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            {/* <Statistics /> */}
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {/* <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span> */}
                Pricing
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};