import { z } from "zod";

export const ServiceEnum = z.enum([
  "home",
  "construction",
  "pressure-washing",
  "tile",
  "bathroom",
  "doors",
  "other",
]);

export const ContactMethodEnum = z.enum(["call", "text", "whatsapp", "email"]);

export const QuoteSchema = z.object({
  service: ServiceEnum,
  details: z.string().min(10, "Tell us a bit more (10+ characters).").max(2000),
  name: z.string().min(2, "Please enter your name.").max(120),
  contact: z.string().min(5, "Phone number or email, please.").max(200),
  preferredMethod: ContactMethodEnum,
  zip: z.string().regex(/^\d{5}$/, "5-digit ZIP.").optional().or(z.literal("")),
  // honeypot — should always be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;
