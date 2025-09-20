"use client";

import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/hooks/use-app-context";
import { Sparkles } from "lucide-react";

export default function AffirmationsPage() {
  const { affirmation } = useAppContext();

  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Your Daily Affirmation"
        description="A positive thought to guide your day."
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0 flex items-center justify-center">
        <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
          <CardContent className="p-8 text-center flex flex-col items-center gap-6">
            {affirmation ? (
              <>
                <Sparkles className="h-12 w-12 text-accent" />
                <p className="text-3xl font-headline leading-relaxed">
                  &ldquo;{affirmation}&rdquo;
                </p>
              </>
            ) : (
              <>
                <p className="text-muted-foreground text-lg">
                  Your affirmation is waiting for you.
                </p>
                <p>
                  Complete your daily check-in to generate a personalized affirmation.
                </p>
                <Button asChild>
                  <Link href="/check-in">Go to Check-in</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
