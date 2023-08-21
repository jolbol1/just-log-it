import { createContext } from 'react';

const initialContext = {
  entryId: 0,
  confirmOpen: false,
  editOpen: false,
  setEntryId: (id: number) => {},
  setConfirmOpen: (open: boolean) => {},
  setEditOpen: (open: boolean) => {}
};

export const EntryTableContext = createContext(initialContext);
