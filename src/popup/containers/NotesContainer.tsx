import React, { useCallback, useState } from "react";
import { styled } from "@linaria/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { groupNotesByScope } from "../../common/utils";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { PopupLayout } from "../components/PopupLayout";
import { AddNoteForm } from "../components/AddNoteForm";
import { RadioSwitch } from "../components/RadioSwitch";
import { NotesList } from "../components/NotesList";
import { ContentCenter } from "../components/ContentCenter";
import { Scope } from "../../common/enums/Scope";

import GetAllNotes from "../../common/queries/GetAllNotes.graphql";
import CreateNoteMutation from "../../common/queries/CreateNote.graphql";
import UpdateNoteMutation from "../../common/queries/UpdateNote.graphql";
import DeleteNoteMutation from "../../common/queries/DeleteNote.graphql";

const GET_ALL_NOTES = gql`
  ${GetAllNotes}
`;

const CREATE_NOTE = gql`
  ${CreateNoteMutation}
`;

const UPDATE_NOTE = gql`
  ${UpdateNoteMutation}
`;

const DELETE_NOTE = gql`
  ${DeleteNoteMutation}
`;

const refetchGetAllNotes = { refetchQueries: [GET_ALL_NOTES] };

export function NotesContainer() {
  const location: URL | null = useCurrentLocation();

  const [displayScope, setDisplayScope] = useState(Scope.Page);

  const getAllNotesRequest = useQuery(GET_ALL_NOTES);
  const [addNote, addNoteRequest] = useMutation(
    CREATE_NOTE,
    refetchGetAllNotes
  );
  const [updateNote, updateNoteRequest] = useMutation(
    UPDATE_NOTE,
    refetchGetAllNotes
  );
  const [deleteNote, deleteNoteRequest] = useMutation(
    DELETE_NOTE,
    refetchGetAllNotes
  );

  const handleNoteUpdate = useCallback(({ _id: updateId, note }: INote) => {
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
    [deleteNote]
  );

  const handleNoteAdd = useCallback(
    ({ note, scope }: Partial<INote>) => {
      let url = scope !== Scope.Global && location ? location.href : "";

      addNote({
        variables: {
          scope,
          note,
          url,
        },
      });
      getAllNotesRequest.refetch();
    },
    [location, addNote]
  );

  const footer = Boolean(location) && <AddNoteForm onSubmit={handleNoteAdd} />;

  const isOK =
    !getAllNotesRequest.loading &&
    !getAllNotesRequest.error &&
    getAllNotesRequest.data;

  const notes = isOK ? getAllNotesRequest.data.allNotes : [];
  const groupedNotes = groupNotesByScope(notes, location);

  const switchOptions = [
    {
      label: "Page",
      value: Scope.Page,
      count: groupedNotes[Scope.Page].length,
    },
    {
      label: "Site",
      value: Scope.Site,
      count: groupedNotes[Scope.Site].length,
    },
    {
      label: "All sites",
      value: Scope.Global,
      count: groupedNotes[Scope.Global].length,
    },
  ];

  return (
    <PopupLayout footer={footer}>
      <RadioSwitch
        name="notes-display"
        options={switchOptions}
        defaultValue={displayScope}
        onChange={(value) => setDisplayScope(value as Scope)}
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
