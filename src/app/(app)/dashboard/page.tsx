import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/app-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const featureCards = [
  {
    title: "Daily Check-in",
    description: "Track your mood and energy.",
    href: "/check-in",
    imageId: "dashboard-check-in",
  },
  {
    title: "Affirmations",
    description: "Get your personalized boost.",
    href: "/affirmations",
    imageId: "dashboard-affirmations",
  },
  {
    title: "Reminders",
    description: "Set time for self-care.",
    href: "/reminders",
    imageId: "dashboard-reminders",
  },
  {
    title: "Relaxation",
    description: "Find your calm.",
    href: "/relaxation",
    imageId: "dashboard-relaxation",
  },
   {
    title: "Mood Tracking",
    description: "Visualize your journey.",
    href: "/mood-tracking",
    imageId: "dashboard-mood",
  },
];

export default function DashboardPage() {
  const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Welcome Back"
        description="Your space for mindfulness and self-care."
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => {
            const image = getImage(card.imageId);
            return (
              <Link href={card.href} key={card.title}>
                <Card className="group h-full flex flex-col hover:border-primary transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex justify-center items-center relative aspect-video">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover rounded-b-lg"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 rounded-b-lg group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 bg-background p-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
