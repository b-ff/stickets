import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import {
  Note,
  NoteScope,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useDeShareMutation,
  useGetAllNotesQuery,
  useShareMutation,
  useUpdateNoteMutation,
} from '../../common/graphql/__generated__/graphql';
import { groupNotesByScope, throwIfError } from '../../common/utils';
import { AddNoteForm } from '../components/AddNoteForm';
import { Badge } from '../components/Badge';
import { ColumnTabs } from '../components/ColumnTabs';
import { Notes } from '../components/Notes';
import { SharePopup } from '../components/SharePopup';
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
  onUpdate: (note: Partial<Note>) => void,
  onDelete: (id: string) => void,
  onShare: (note: Note) => void,
  title?: string,
  emptyText?: string,
) => (
  <Notes
    isLoading={loading}
    notes={notes}
    onUpdate={onUpdate}
    onDelete={onDelete}
    onShare={onShare}
    title={title}
    emptyText={emptyText}
  />
);

export const PageNotes: FC<HTMLAttributes<HTMLElement>> = (): ReactElement => {
  const location = useCurrentLocation();

  const [noteToShare, setNoteToShare] = useState<Note | null>(null); // @todo set to false

  const { data, loading, error } = useGetAllNotesQuery();
  const [addNote, createNoteMutation] = useCreateNoteMutation(refetchGetAllNotes);
  const [updateNote, updateNoteMutation] = useUpdateNoteMutation(refetchGetAllNotes);
  const [deleteNote, deleteNoteMutation] = useDeleteNoteMutation(refetchGetAllNotes);
  const [shareNote, shareNoteMutation] = useShareMutation(refetchGetAllNotes);
  const [deshareNote, deshareNoteMutation] = useDeShareMutation(refetchGetAllNotes);

  throwIfError(
    error,
    createNoteMutation.error,
    updateNoteMutation.error,
    deleteNoteMutation.error,
    shareNoteMutation.error,
    deshareNoteMutation.error,
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
    ({ _id: updateId, note }: Partial<Note>) => {
      updateNote({
        variables: {
          updateId,
          note,
        } as { updateId: string; note: string },
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

  const handleNoteShare = useCallback(
    (shareId: string, email: string): void => {
      shareNote({
        variables: {
          shareId,
          email,
        },
      });
    },
    [shareNote],
  );

  const initShareDialog = useCallback(
    (note: Note): void => {
      setNoteToShare(note);
    },
    [setNoteToShare],
  );

  const handleNoteDeshare = useCallback(
    (deshareId: string, email: string): void => {
      deshareNote({
        variables: {
          deshareId,
          email,
        },
      });
    },
    [deshareNote],
  );

  const notes = (data?.allNotes || []) as Note[];
  const groupedNotes = groupNotesByScope(notes, location);

  if (noteToShare) {
    const updatedNote = notes.find((n) => n._id === noteToShare._id);

    if (updatedNote && JSON.stringify(noteToShare) !== JSON.stringify(updatedNote)) {
      setNoteToShare(updatedNote as Note);
    }
  }

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
          initShareDialog,
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
          initShareDialog,
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
          initShareDialog,
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
          initShareDialog,
          TAB_TEXTS.ALL.title,
          TAB_TEXTS.ALL.placeholder,
        ),
      },
    ],
    [loading, notes, groupedNotes, handleNoteUpdate, handleNoteDelete, initShareDialog],
  );

  const footer = useMemo(
    () => <StyledAddNotesForm onSubmit={handleNoteAdd} />,
    [handleNoteAdd],
  );

  return (
    <>
      <ColumnTabs header={header} footer={footer} tabs={tabs} />;
      <SharePopup
        note={noteToShare}
        onShare={handleNoteShare}
        onDeshare={handleNoteDeshare}
        onClose={() => setNoteToShare(null)}
      />
    </>
  );
};

const StyledAddNotesForm = styled<any>(AddNoteForm)`
  border-top: 1px solid var(--controlPrimaryColor);
`;
