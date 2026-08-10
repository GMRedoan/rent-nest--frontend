import HeroBanner from "@/components/home/homepage/Banner";
import AboutSection from "./about/page";
import FeaturedProperties from "@/components/home/homepage/FeaturedProperties";
import { getProperties } from "@/server/properties/properties.service";
import HowItWorksSection from "@/components/home/homepage/HowItWorks";
import WhyChooseSection from "@/components/home/homepage/WhyChooseSection";
import FAQSection from "@/components/home/homepage/FaqSection";
import ContactSection from "@/components/home/homepage/ContactUs";
import Services from "@/components/home/homepage/Service";

const page = async () => {
    const result = await getProperties();
    const properties = result?.data
  return (
    <div>
      <HeroBanner/>
      <AboutSection/>
      <HowItWorksSection/>
      <FeaturedProperties properties={properties ?? []}/>
      <WhyChooseSection/>
      <Services/>
      <FAQSection/>
      <ContactSection/>
    </div>
  );
};

export default page;