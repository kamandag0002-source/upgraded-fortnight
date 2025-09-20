import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreathingExercise } from "@/components/breathing-exercise";

const pmrSteps = [
    "Find a comfortable position, either sitting or lying down.",
    "Take a few deep, slow breaths to begin.",
    "Tense the muscles in your feet for 5 seconds, then release for 10 seconds. Notice the difference.",
    "Move to your lower legs. Tense, hold for 5 seconds, then release. Feel the tension leaving.",
    "Continue this pattern up your body: thighs, abdomen, chest, back.",
    "Tense your hands and arms. Hold, then release. Let them feel heavy and relaxed.",
    "Move to your neck and shoulders. Tense, hold, then release completely.",
    "Finally, tense the muscles in your face and jaw. Hold, then let go. Feel your face soften.",
    "Enjoy the feeling of total body relaxation for a few moments.",
    "When you are ready, slowly bring your awareness back to the room.",
]

export default function RelaxationPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Relaxation Techniques"
        description="Tools to help you unwind and find peace."
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0">
        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breathing">Guided Breathing</TabsTrigger>
            <TabsTrigger value="pmr">Progressive Muscle Relaxation</TabsTrigger>
          </TabsList>
          <TabsContent value="breathing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-primary">Box Breathing</CardTitle>
              </CardHeader>
              <CardContent className="h-[450px]">
                <BreathingExercise />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pmr" className="mt-6">
            <Card>
               <CardHeader>
                <CardTitle className="font-headline text-primary">Progressive Muscle Relaxation (PMR)</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  {pmrSteps.map((step, index) => (
                    <li key={index} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
