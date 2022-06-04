import React, { FC, HTMLAttributes, ReactElement, useCallback, useMemo } from 'react';
import {
  Note,
  NoteScope,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetAllNotesQuery,
  useUpdateNoteMutation,
} from '../../common/graphql/__generated__/graphql';
import { groupNotesByScope, throwIfError } from '../../common/utils';
import { AddNoteForm } from '../components/AddNoteForm';
import { Badge } from '../components/Badge';
import { ColumnTabs } from '../components/ColumnTabs';
import { Notes } from '../components/Notes';
import { ProfileContainer } from '../containers/ProfileContainer';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const header = <ProfileContainer />;

const refetchGetAllNotes = { refetchQueries: ['GetAllNotes'] };

const TAB_TEXTS = {
  PAGE: {
    title: 'Notes on this page',
    placeholder: 'You have no notes on this page',
  },
  SITE: {
    title: 'Notes on this website',
    placeholder: 'You have no notes on this website',
  },
  GLOBAL: {
    title: 'Notes visisble everywhere',
    placeholder: 'You have no notes visible everywhere',
  },
  ALL: {
    title: 'All notes',
    placeholder: 'You have no notes',
  },
};

const getNotesTab = (
  loading: boolean,
  notes: Note[],
  onUpdate: (note: Note) => void,
  onDelete: (id: string) => void,
  title?: string,
  emptyText?: string,
) => (
  <Notes
    isLoading={loading}
    notes={notes}
    onUpdate={onUpdate}
    onDelete={onDelete}
    title={title}
    emptyText={emptyText}
  />
);

export const PageNotes: FC<HTMLAttributes<HTMLElement>> = (): ReactElement => {
  const location = useCurrentLocation();

  const { data, loading, error } = useGetAllNotesQuery();
  const [addNote, createNoteMutation] = useCreateNoteMutation(refetchGetAllNotes);
  const [updateNote, updateNoteMutation] = useUpdateNoteMutation(refetchGetAllNotes);
  const [deleteNote, deleteNoteMutation] = useDeleteNoteMutation(refetchGetAllNotes);

  throwIfError(
    error,
    createNoteMutation.error,
    updateNoteMutation.error,
    deleteNoteMutation.error,
  );

  const handleNoteAdd = useCallback(
    ({ note = '', scope = NoteScope.Global }: Partial<Note>) => {
      const url = location?.href || '';

      addNote({
        variables: {
          scope,
          note,
          url,
        },
      });
    },
    [location, addNote],
  );

  const handleNoteUpdate = useCallback(
    ({ _id: updateId, note }: Note) => {
      updateNote({
        variables: {
          updateId,
          note,
        },
      });
    },
    [updateNote],
  );

  const handleNoteDelete = useCallback(
    (deleteId: string) => {
      deleteNote({
        variables: {
          deleteId,
        },
      });
    },
    [deleteNote],
  );

  const notes = (data?.allNotes || []) as Note[];
  const groupedNotes = groupNotesByScope(notes, location);

  const tabs = useMemo(
    () => [
      {
        title: TAB_TEXTS.PAGE.title,
        badge: !loading && <Badge>{groupedNotes[NoteScope.Page].length}</Badge>,
        tab: getNotesTab(
          loading,
          groupedNotes[NoteScope.Page],
          handleNoteUpdate,
          handleNoteDelete,
          TAB_TEXTS.PAGE.title,
          TAB_TEXTS.PAGE.placeholder,
        ),
      },
      {
        title: TAB_TEXTS.SITE.title,
        badge: !loading && <Badge>{groupedNotes[NoteScope.Site].length}</Badge>,
        tab: getNotesTab(
          loading,
          groupedNotes[NoteScope.Site],
          handleNoteUpdate,
          handleNoteDelete,
          TAB_TEXTS.SITE.title,
          TAB_TEXTS.SITE.placeholder,
        ),
      },
      {
        title: TAB_TEXTS.GLOBAL.title,
        badge: !loading && <Badge>{groupedNotes[NoteScope.Global].length}</Badge>,
        tab: getNotesTab(
          loading,
          groupedNotes[NoteScope.Global],
          handleNoteUpdate,
          handleNoteDelete,
          TAB_TEXTS.GLOBAL.title,
          TAB_TEXTS.GLOBAL.placeholder,
        ),
      },
      {
        title: TAB_TEXTS.ALL.title,
        badge: !loading && <Badge>{notes.length}</Badge>,
        tab: getNotesTab(
          loading,
          notes,
          handleNoteUpdate,
          handleNoteDelete,
          TAB_TEXTS.ALL.title,
          TAB_TEXTS.ALL.placeholder,
        ),
      },
    ],
    [loading, notes, groupedNotes, handleNoteUpdate, handleNoteDelete],
  );

  const footer = useMemo(() => <AddNoteForm onSubmit={handleNoteAdd} />, [handleNoteAdd]);

  return <ColumnTabs header={header} footer={footer} tabs={tabs} />;
};
