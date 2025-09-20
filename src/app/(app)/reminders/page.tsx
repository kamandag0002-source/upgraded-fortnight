"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, Clock, Trash2 } from "lucide-react";
import type { Reminder } from "@/lib/types";

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminderText, setNewReminderText] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("");
  const { toast } = useToast();
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          toast({ title: "Notifications enabled!", description: "You can now set reminders." });
        } else {
          toast({ title: "Notifications denied", description: "Reminders will not be shown as notifications.", variant: "destructive" });
        }
      });
    }

    return () => {
      // Clear all timeouts on component unmount
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [toast]);

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderText || !newReminderTime) {
      toast({ title: "Missing fields", description: "Please provide text and time for the reminder.", variant: "destructive" });
      return;
    }

    const reminderTime = new Date();
    const [hours, minutes] = newReminderTime.split(":").map(Number);
    reminderTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (reminderTime <= now) {
      toast({ title: "Invalid time", description: "Please select a future time.", variant: "destructive" });
      return;
    }

    const id = Date.now();
    const newReminder: Reminder = { id, text: newReminderText, time: newReminderTime };

    const timeoutId = setTimeout(() => {
      new Notification("Mindful Moments Reminder", {
        body: newReminder.text,
        icon: "/logo.svg", // Assuming you have a logo
      });
      timeoutsRef.current.delete(id);
    }, reminderTime.getTime() - now.getTime());

    timeoutsRef.current.set(id, timeoutId);
    setReminders(prev => [...prev, newReminder]);
    setNewReminderText("");
    setNewReminderTime("");
    toast({ title: "Reminder set!", description: `We'll remind you at ${newReminderTime}.` });
  };

  const deleteReminder = (id: number) => {
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({ title: "Reminder removed." });
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Scheduled Reminders"
        description="Set aside time for what matters most."
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addReminder} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., Meditate for 10 minutes"
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                className="flex-grow"
              />
              <Input
                type="time"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
              />
              <Button type="submit">
                <Bell className="mr-2" /> Set Reminder
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-headline">Your Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-muted-foreground">You have no reminders set.</p>
          ) : (
            reminders
              .sort((a,b) => a.time.localeCompare(b.time))
              .map(reminder => (
              <Card key={reminder.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{reminder.text}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock size={14}/> {reminder.time}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)} aria-label="Delete reminder">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
