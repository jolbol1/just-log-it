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
import { QuickEntryForm } from './quick-entry';
import { EditEntry } from './edit-entry';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditEntryDialogProps {
  entryId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditEntryDialog({
  entryId,
  open,
  onOpenChange,
  onSuccess
}: EditEntryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Entry</DialogTitle>
          <DialogDescription>Edit data in the journal.</DialogDescription>
        </DialogHeader>
        <EditEntry
          entryId={entryId}
          onSuccess={onSuccess}
          setEditLoading={setIsLoading}
        />
        <DialogFooter>
          <Button
            type="submit"
            form="add-form"
            className="relative"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="absolute inset-0 w-full h-full flex justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            )}
            <span className={cn({ 'opacity-0': isLoading })}>Save Entry</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
