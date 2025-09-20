"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/hooks/use-app-context";
import { getAffirmationAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import type { Mood, EnergyLevel } from "@/lib/types";

const FormSchema = z.object({
  mood: z.string({ required_error: "Please select your mood." }),
  energyLevel: z.string({ required_error: "Please select your energy level." }),
  significantEvents: z.string().optional(),
});

const moodOptions: { value: Mood; label: string; emoji: string }[] = [
  { value: "Happy", label: "Happy", emoji: "😊" },
  { value: "Calm", label: "Calm", emoji: "😌" },
  { value: "Neutral", label: "Neutral", emoji: "😐" },
  { value: "Anxious", label: "Anxious", emoji: "😟" },
  { value: "Sad", label: "Sad", emoji: "😢" },
];

const energyOptions: { value: EnergyLevel; label: string; emoji: string }[] = [
  { value: "High", label: "High", emoji: "⚡️" },
  { value: "Medium", label: "Medium", emoji: "🔋" },
  { value: "Low", label: "Low", emoji: "🔌" },
];

export default function CheckInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { addMoodRecord, setAffirmation } = useAppContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("mood", data.mood);
    formData.append("energyLevel", data.energyLevel);
    formData.append("significantEvents", data.significantEvents || "");

    const result = await getAffirmationAction(formData);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.data) {
      setAffirmation(result.data);
      addMoodRecord({
        ...data,
        mood: data.mood as Mood,
        energyLevel: data.energyLevel as EnergyLevel,
        timestamp: new Date(),
      });
      toast({
        title: "Affirmation Generated!",
        description: "Your personalized affirmation is ready.",
      });
      router.push("/affirmations");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Daily Check-in"
        description="How are you feeling today?"
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0">
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-headline">How is your mood?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                        >
                          {moodOptions.map((option) => (
                            <FormItem key={option.value}>
                              <FormControl>
                                <RadioGroupItem value={option.value} className="sr-only" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                                <span className="text-3xl mb-2">{option.emoji}</span>
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="energyLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-headline">What's your energy level?</FormLabel>
                       <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          {energyOptions.map((option) => (
                            <FormItem key={option.value}>
                              <FormControl>
                                <RadioGroupItem value={option.value} className="sr-only" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                                <span className="text-3xl mb-2">{option.emoji}</span>
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="significantEvents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-headline">Any significant events today?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little about your day..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate My Affirmation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
