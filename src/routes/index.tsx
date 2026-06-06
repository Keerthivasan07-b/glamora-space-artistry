import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { HeroVideo } from "@/components/HeroVideo";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingConsultation } from "@/components/FloatingConsultation";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import { ChatButton } from "@/components/ChatButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GLAMORA — Transforming Spaces. Elevating Lifestyles." },
      {
        name: "description",
        content:
          "GLAMORA is a luxury interior design and wall styling atelier — crafting residences, offices and hospitality interiors with quiet, lived-in elegance.",
      },
      { property: "og:title", content: "GLAMORA — Luxury Interior & Wall Atelier" },
      {
        property: "og:description",
        content:
          "Premium wall solutions, interior design and consultation. Transforming spaces with cinematic craft.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground font-sans">
      <CustomCursor />
      <Navigation />
      <HeroVideo />
      <Manifesto />
      <Portfolio />
      <Services />
      <Stats />
      <Process />
      <Testimonials />
      <ContactFooter />

      {/* Floating UI */}
      <FloatingConsultation />
      <WhatsAppBubble />
      <ChatButton />
    </main>
  );
}
