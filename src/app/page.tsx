import TextCanvas from '@/components/text-canvas';
import { PenSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <PenSquare className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary">
              Text Canvas
            </h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <TextCanvas />
      </main>
    </div>
  );
}
