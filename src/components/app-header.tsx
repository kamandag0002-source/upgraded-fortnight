import { SidebarTrigger } from "@/components/ui/sidebar";

type AppHeaderProps = {
  title: string;
  description?: string;
};

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 p-4 sm:p-6">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-3xl md:text-4xl font-headline text-primary">
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
    </header>
  );
}
