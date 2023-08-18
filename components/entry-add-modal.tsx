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

export function EntryAddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Entry</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Entry</DialogTitle>
          <DialogDescription>
            Log your calories for the day. Dont worry, you can always edit this
            later in the table.
          </DialogDescription>
        </DialogHeader>
        <QuickEntryForm />
        <DialogFooter>
          <Button type="submit" form="add-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
