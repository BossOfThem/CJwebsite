import Link from "next/link";
import { Phone, MessageCircle, MessageSquare, Mail } from "lucide-react";
import {
  BUSINESS,
  buildMailtoLink,
  buildSmsLink,
  buildWhatsAppLink,
  prefillForService,
  type ServiceKey,
} from "@/lib/config";
import { cn } from "@/lib/utils";

type Variant = "stack" | "row" | "hero";
type Surface = "light" | "dark";

type Props = {
  service?: ServiceKey;
  variant?: Variant;
  surface?: Surface;
  className?: string;
  showLabels?: boolean;
};

export function ContactMethods({
  service,
  variant = "row",
  surface = "light",
  className,
  showLabels = true,
}: Props) {
  const msg = prefillForService(service);
  const subject = service ? `Quote request: ${service}` : "Quote request";

  const layout =
    variant === "stack"
      ? "flex flex-col gap-3 w-full max-w-md"
      : variant === "hero"
      ? "flex flex-col sm:flex-row sm:flex-wrap gap-3"
      : "flex flex-wrap gap-3";

  const stretch = variant === "stack" ? "w-full" : "";
  const ghost = surface === "dark" ? "btn-ghost-light" : "btn-ghost";

  return (
    <div className={cn(layout, className)} role="group" aria-label="Contact options">
      <Link
        href={`tel:${BUSINESS.phone.raw}`}
        className={cn("btn btn-primary", stretch)}
        aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phone.display}`}
      >
        <Phone className="size-[18px] shrink-0" aria-hidden />
        {showLabels && <span>Call {BUSINESS.phone.display}</span>}
      </Link>

      <Link
        href={buildWhatsAppLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("btn", ghost, stretch)}
        aria-label="Message us on WhatsApp"
      >
        <MessageCircle className="size-[18px] shrink-0" aria-hidden />
        {showLabels && <span>WhatsApp a photo</span>}
      </Link>

      <Link
        href={buildSmsLink(msg)}
        className={cn("btn", ghost, stretch)}
        aria-label={`Text ${BUSINESS.name}`}
      >
        <MessageSquare className="size-[18px] shrink-0" aria-hidden />
        {showLabels && <span>Text us</span>}
      </Link>

      <Link
        href={buildMailtoLink(subject, msg)}
        className={cn("btn", ghost, stretch)}
        aria-label={`Email ${BUSINESS.name}`}
      >
        <Mail className="size-[18px] shrink-0" aria-hidden />
        {showLabels && <span>Email</span>}
      </Link>
    </div>
  );
}
