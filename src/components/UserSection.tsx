import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const clients = [
  { name: "Tata Motors", logo: "/logos/tata-motors.jpg" },
  { name: "Mapsor Experiential Weddings", logo: "/logos/mapsor.jpg" },
  { name: "Meghaa Modi Design Studio", logo: "/logos/meghaa-modi.png" },
  { name: "Zapp Loans", logo: "/logos/zapp-loans.webp" },
  { name: "Readiprint Fashions", logo: "/logos/readiprint.svg" },
  { name: "Heritage Food Diary", logo: "/logos/heritage-food-diary.jpg" },
];

const UserSection = () => {
  const marqueeClients = [...clients, ...clients];
  const [api, setApi] = useState<CarouselApi>();

  // Auto-slide on mobile carousel
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 2500);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section
      className="overflow-hidden bg-background py-16 md:py-20"
      aria-labelledby="clients-heading"
      title="Clients who trust ConverseAI"
    >
      <div className="container-tight">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Trusted by
          </p>
          <h2 id="clients-heading" className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Our Clients
          </h2>
        </div>
      </div>

      {/* Desktop / tablet: continuous marquee */}
      <div
        className="relative hidden w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:block"
        aria-label="Client brand logos moving from left to right"
      >
        <ul className="brands-marquee flex w-max items-center gap-6 md:gap-8" role="list">
          {marqueeClients.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              className="flex h-24 w-56 shrink-0 items-center justify-center rounded-3xl border border-border/70 bg-white px-8 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft md:h-28 md:w-64"
              aria-hidden={index >= clients.length}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="max-h-16 max-w-full object-contain md:max-h-20"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: single centered logo, auto-slide + arrows */}
      <div className="px-8 md:hidden">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "center" }}
          className="mx-auto w-full max-w-xs"
          aria-label="Client brand logos carousel"
        >
          <CarouselContent>
            {clients.map((client) => (
              <CarouselItem key={client.name} className="basis-full">
                <div className="flex h-28 items-center justify-center rounded-3xl border border-border/70 bg-white px-8 shadow-card">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3" />
          <CarouselNext className="-right-3" />
        </Carousel>
      </div>
    </section>
  );
};

export default UserSection;
