import React, { useCallback, useState } from 'react';
import { styled } from '@linaria/react';
import { groupNotesByScope } from '../../common/utils';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { PopupLayout } from '../components/PopupLayout';
import { AddNoteForm } from '../components/AddNoteForm';
import { RadioSwitch } from '../components/RadioSwitch';
import { NotesList } from '../components/NotesList';
import { ContentCenter } from '../components/ContentCenter';

import {
  useGetAllNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  Note,
  NoteScope,
} from '../../common/graphql/__generated__/graphql';

const refetchGetAllNotes = { refetchQueries: ['GetAllNotes'] };

export function NotesContainer() {
  const location: URL | null = useCurrentLocation();

  const [displayScope, setDisplayScope] = useState(NoteScope.Page);

  const getAllNotesRequest = useGetAllNotesQuery();
  const [addNote] = useCreateNoteMutation(refetchGetAllNotes);
  const [updateNote] = useUpdateNoteMutation(refetchGetAllNotes);
  const [deleteNote] = useDeleteNoteMutation(refetchGetAllNotes);

  const handleNoteUpdate = useCallback(({ _id: updateId, note }: Note) => {
    updateNote({
      variables: {
        updateId,
        note,
      },
    });
    getAllNotesRequest.refetch();
  }, []);

  const handleNoteDelete = useCallback(
    (deleteId: string) => {
      deleteNote({
        variables: {
          deleteId,
        },
      });
      getAllNotesRequest.refetch();
    },
    [deleteNote],
  );

  const handleNoteAdd = useCallback(
    ({ note = '', scope = NoteScope.Global }: Partial<Note>) => {
      let url = scope !== NoteScope.Global && location ? location.href : '';

      addNote({
        variables: {
          scope,
          note,
          url,
        },
      });
      getAllNotesRequest.refetch();
    },
    [location, addNote],
  );

  const footer = Boolean(location) && <AddNoteForm onSubmit={handleNoteAdd} />;

  const isOK = !getAllNotesRequest.loading && !getAllNotesRequest.error && getAllNotesRequest.data;

  const notes = isOK ? getAllNotesRequest.data?.allNotes : [];
  const groupedNotes = groupNotesByScope(notes as Note[], location);

  const switchOptions = [
    {
      label: 'Page',
      value: NoteScope.Page,
      count: groupedNotes[NoteScope.Page].length,
    },
    {
      label: 'Site',
      value: NoteScope.Site,
      count: groupedNotes[NoteScope.Site].length,
    },
    {
      label: 'All sites',
      value: NoteScope.Global,
      count: groupedNotes[NoteScope.Global].length,
    },
  ];

  return (
    <PopupLayout footer={footer}>
      <RadioSwitch
        name="notes-display"
        options={switchOptions}
        defaultValue={displayScope}
        onChange={(value) => setDisplayScope(value as NoteScope)}
      />
      <StyledNotesContainer>
        {Boolean(getAllNotesRequest.error) ? (
          <ContentCenter>Oops! Something went wrong!</ContentCenter>
        ) : (
          <NotesList
            isLoading={getAllNotesRequest.loading}
            notes={groupedNotes[displayScope]}
            onUpdate={handleNoteUpdate}
            onDelete={handleNoteDelete}
          />
        )}
      </StyledNotesContainer>
    </PopupLayout>
  );
}

const StyledNotesContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 10px 25px;
  box-sizing: border-box;
  overflow-y: auto;
`;
