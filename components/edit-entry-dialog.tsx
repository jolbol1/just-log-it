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

interface EditEntryDialogProps {
  entryId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditEntryDialog({
  entryId,
  open,
  onOpenChange
}: EditEntryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Entry</DialogTitle>
          <DialogDescription>Edit data in the journal.</DialogDescription>
        </DialogHeader>
        <EditEntry entryId={entryId} />
        <DialogFooter>
          <Button type="submit" form="add-form">
            Save Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
