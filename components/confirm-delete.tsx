import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ConfirmDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entryId?: number;
  onSuccess?: () => void;
}

export function ConfirmDelete({
  open,
  onOpenChange,
  entryId,
  onSuccess
}: ConfirmDeleteProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/calories/${entryId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      onSuccess?.();
    }
    // This forces a cache invalidation.
    router.refresh();
    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            entry from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onDelete()}
            variant="destructive"
            className="relative"
          >
            {isLoading && (
              <span className="absolute inset-0 w-full h-full flex justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            )}
            <span className={cn({ 'opacity-0': isLoading })}>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
