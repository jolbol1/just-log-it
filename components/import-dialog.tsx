'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';
import { caloriesImportSchema } from '@/lib/validations/calories';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

function csvToJson(csv: string) {
  const parsed = Papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  });
  return parsed.data; // Returns an array of objects
}

type csvType = z.infer<typeof caloriesImportSchema>;

export function ImportDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown[]>([]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([]);
    setError(null);
    setFileLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        const jsonData = csvToJson(text as string) as csvType;
        setFileLoading(false);
        setData(jsonData);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      setData([]);
      setFileLoading(false);
    }
  };

  const onSubmit = async () => {
    setSubmitLoading(true);
    const response = await fetch(`/api/calories/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setIsOpen(false);
    } else {
      setError('Something went wrong. Ensure CSV is correctly formatted.');
    }

    // This forces a cache invalidation.
    router.refresh();
    setSubmitLoading(false);
  };

  useEffect(() => {
    setData([]);
    setError(null);
    setFileLoading(false);
    setSubmitLoading(false);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8">
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Import data as a csv. The format should be: logDate, breakfast,
            lunch, dinner, snacks, weight.
            <span className="block mt-3 font-bold text-secondary-foreground">
              Please ensure dates are in the yyyy-MM-dd format
            </span>
            <span className="block mt-3 font-bold text-secondary-foreground">
              Imported data will overwrite existing days!
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
          <Label htmlFor="picture" className="mb-2">
            CSV File
          </Label>
          <Input
            id="picture"
            type="file"
            accept=".csv,text/csv"
            disabled={fileLoading}
            onChange={handleFormChange}
          />
        </div>
        <p className={cn('text-sm font-medium text-destructive')}>{error}</p>
        <DialogFooter>
          <Button
            className="relative"
            disabled={!data || data.length == 0}
            onClick={() => onSubmit()}
          >
            {submitLoading && (
              <span className="absolute inset-0 w-full h-full flex justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            )}
            <span className={cn({ 'opacity-0': submitLoading })}>
              Import Data
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
