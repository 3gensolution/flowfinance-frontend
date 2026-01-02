"use client";

import { Box } from "@mui/material";
import { LandingNavbar } from "@/ui/modules/components/LandingNavbar";
import { HeroSection } from "@/ui/modules/components/HeroSection";
import { StatsSection } from "@/ui/modules/components/StatsSection";
import { AssetsSection } from "@/ui/modules/components/AssetsSection";
import { HowItWorksSection } from "@/ui/modules/components/HowItWorksSection";
import { LoanFeedSection } from "@/ui/modules/components/LoanFeedSection";
import { FAQSection } from "@/ui/modules/components/FAQSection";
import { CTASection, FooterSection } from "@/ui/modules/components/CTAAndFooter";

export const Landing = () => {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <Box component="main" sx={{ position: "relative", pt: 10 }}>
        {/* Hero */}
        <HeroSection />

        {/* Stats */}
        <StatsSection />

        {/* Assets */}
        <AssetsSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Loan Feed */}
        <LoanFeedSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <CTASection />
      </Box>

      {/* Footer */}
      <FooterSection />
    </Box>
  );
};
