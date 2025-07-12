"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Download, BotMessageSquare, Sparkles } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { transformText } from '@/ai/flows/transform-text';
import { customStyleText } from '@/ai/flows/custom-style-text';
import { useToast } from '@/hooks/use-toast';

const styles = ['Journalistic', 'Shakespearean', 'Modernist', 'Poetic', 'Custom'];
const initialInputText = "In the heart of the city, a new story unfolds. The sun rises, casting long shadows across the bustling streets. People from all walks of life begin their day, each with a unique purpose and a dream to chase. It's a symphony of ambition, a canvas of human endeavor.";

export default function TextCanvas() {
  const [inputText, setInputText] = useState<string>(initialInputText);
  const [transformedText, setTransformedText] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>(styles[0]);
  const [customStyle, setCustomStyle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { toast } = useToast();

  const debouncedInputText = useDebounce(inputText, 500);
  const debouncedCustomStyle = useDebounce(customStyle, 500);

  const isCustomStyle = useMemo(() => selectedStyle === 'Custom', [selectedStyle]);

  const handleTransformation = useCallback(async () => {
    if (!debouncedInputText.trim()) {
      setTransformedText('');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      let result;
      if (isCustomStyle) {
        if (!debouncedCustomStyle.trim()) {
          setTransformedText('');
          setIsLoading(false);
          return;
        }
        result = await customStyleText({ text: debouncedInputText, customStyle: debouncedCustomStyle });
      } else {
        result = await transformText({ text: debouncedInputText, style: selectedStyle });
      }
      setTransformedText(result.transformedText);
    } catch (error) {
      console.error('Transformation failed:', error);
      toast({
        variant: "destructive",
        title: "Transformation Error",
        description: "Failed to transform text. Please try again later.",
      });
      setTransformedText('Error: Could not transform text.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedInputText, selectedStyle, debouncedCustomStyle, isCustomStyle, toast]);
  
  useEffect(() => {
    handleTransformation();
  }, [handleTransformation]);

  const handleExport = (format: 'txt' | 'docx' | 'pdf') => {
    if (format === 'txt') {
      const blob = new Blob([transformedText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transformed-text.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
       toast({
        title: "Feature not available",
        description: `Exporting to .${format} is not yet supported.`,
      })
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <BotMessageSquare className="h-6 w-6" />
            Your Canvas
          </CardTitle>
          <CardDescription>Enter your text and choose a style to begin the transformation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] resize-y text-base"
            aria-label="Input text"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="style-select">Transformation Style</Label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger id="style-select" className="w-full" aria-label="Select transformation style">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {styles.map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isCustomStyle && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="custom-style-input">Custom Style Prompt</Label>
              <Input
                id="custom-style-input"
                placeholder="e.g., 'like a pirate's sea shanty'"
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                aria-label="Custom style input"
              />
            </div>
          )}
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Morphed Text
          </CardTitle>
          <CardDescription>Witness the AI-powered transformation in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/5" />
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-foreground dark:prose-invert">
              {transformedText ? <p className="whitespace-pre-wrap">{transformedText}</p> : <p className="text-muted-foreground">The transformed text will appear here...</p>}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={() => handleExport('txt')} disabled={!transformedText || isLoading}>
            <Download className="mr-2 h-4 w-4" />
            .txt
          </Button>
          <Button variant="outline" onClick={() => handleExport('docx')} disabled={!transformedText || isLoading}>
            <Download className="mr-2 h-4 w-4" />
            .docx
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} disabled={!transformedText || isLoading}>
            <Download className="mr-2 h-4 w-4" />
            .pdf
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
