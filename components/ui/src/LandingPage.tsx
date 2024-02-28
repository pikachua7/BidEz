import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import LogoCollection from "./components/LogoCollection";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        {/* <Pricing /> */}
        <Divider />
        <FAQ />
        <Divider />
      </Box>
    </>
  );
}
