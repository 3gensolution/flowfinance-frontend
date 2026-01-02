"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Is my collateral safe?",
      answer:
        "Yes. FlowFinance smart contracts are audited by top-tier security firms. All collateral is held in non-custodial vaults that only you can access upon repayment.",
    },
    {
      question: "What happens if the value of my collateral drops?",
      answer:
        "If your collateral value falls below the liquidation threshold, a portion of it will be sold to repay the loan. We recommend maintaining a healthy Loan-to-Value (LTV) ratio to avoid this.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees. We charge a small protocol origination fee of 0.5% which is added to the loan amount. Network gas fees apply for transactions.",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        backgroundColor: "rgba(26, 36, 48, 0.3)",
      }}
    >
      <Box
        sx={{
          padding: {
            sm: '0 24px',
            md: '0 48px',
            lg: '0 64px',
            xl: '0 96px',
          },
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {/* Header */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2rem" },
            fontWeight: 700,
            textAlign: "center",
            mb: 6,
          }}
        >
          Frequently Asked Questions
        </Typography>

        {/* FAQs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              sx={{
                backgroundColor: "#1a2430",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&.Mui-expanded": {
                  borderColor: "rgba(43, 140, 238, 0.5)",
                },
                "&::before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  py: 2,
                  px: 3,
                  "& .MuiAccordionSummary-content": {
                    my: 0,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  py: 2,
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                }}
              >
                {faq.answer}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
