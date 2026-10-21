import { JsonLd } from "@/components/seo/json-ld";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <WhyUs />
      <Work />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
