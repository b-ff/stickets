import React, { useCallback, useState } from 'react';
import { styled } from '@linaria/react';
import { groupNotesByScope } from '../../common/utils';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
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

export function OldNotesContainer() {
  const location: URL | null = useCurrentLocation();

  const [displayScope, setDisplayScope] = useState(NoteScope.Page);

  const getRequest = useGetAllNotesQuery();
  const [addNote] = useCreateNoteMutation(refetchGetAllNotes);
  const [updateNote] = useUpdateNoteMutation(refetchGetAllNotes);
  const [deleteNote] = useDeleteNoteMutation(refetchGetAllNotes);

  const handleNoteUpdate = useCallback(
    ({ _id: updateId, note }: Note) => {
      updateNote({
        variables: {
          updateId,
          note,
        },
      });
      getRequest.refetch();
    },
    [updateNote, getRequest],
  );

  const handleNoteDelete = useCallback(
    (deleteId: string) => {
      deleteNote({
        variables: {
          deleteId,
        },
      });
      getRequest.refetch();
    },
    [deleteNote, getRequest],
  );

  const handleNoteAdd = useCallback(
    ({ note = '', scope = NoteScope.Global }: Partial<Note>) => {
      const url = scope !== NoteScope.Global && location ? location.href : '';

      addNote({
        variables: {
          scope,
          note,
          url,
        },
      });
      getRequest.refetch();
    },
    [location, addNote, getRequest],
  );

  const isOK = !getRequest.loading && !getRequest.error && getRequest.data;

  const notes = isOK ? getRequest.data?.allNotes : [];
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
    <>
      <RadioSwitch
        name="notes-display"
        options={switchOptions}
        defaultValue={displayScope}
        onChange={(value) => setDisplayScope(value as NoteScope)}
      />
      <StyledNotesContainer>
        {getRequest.error ? (
          <ContentCenter>Oops! Something went wrong!</ContentCenter>
        ) : (
          <NotesList
            isLoading={getRequest.loading}
            notes={groupedNotes[displayScope]}
            onUpdate={handleNoteUpdate}
            onDelete={handleNoteDelete}
          />
        )}
      </StyledNotesContainer>
      {Boolean(location) && <AddNoteForm onSubmit={handleNoteAdd} />}
    </>
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
