import React, { useCallback } from "react";
import { styled } from "@linaria/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Note } from "../components/Note";
import { PopupLayout } from "../components/PopupLayout";
import { AddNoteForm } from "../components/AddNoteForm";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { NOTE_SCOPES } from "../constants/note-scopes";

import GetAllNotes from "../queries/GetAllNotes.graphql";
import CreateNoteMutation from "../queries/CreateNote.graphql";
import DeleteNoteMutation from "../queries/DeleteNote.graphql";

const GET_ALL_NOTES = gql`
  ${GetAllNotes}
`;

const CREATE_NOTE = gql`
  ${CreateNoteMutation}
`;

const DELETE_NOTE = gql`
  ${DeleteNoteMutation}
`;

export function NotesContainer() {
  const location = useCurrentLocation();

  const getAllNotesRequest = useQuery(GET_ALL_NOTES);
  const [addNote, addNoteRequest] = useMutation(CREATE_NOTE);
  const [deleteNote, deleteNoteRequest] = useMutation(DELETE_NOTE);

  const handleNoteEdit = useCallback(() => {}, []);

  const handleNoteDelete = useCallback(
    (id) => {
      console.log("handleNoteDelete");
      deleteNote({
        variables: {
          deleteId: id,
        },
      });
      getAllNotesRequest.refetch();
    },
    [deleteNote]
  );

  const handleNoteAdd = useCallback(
    ({ note, scope }) => {
      let url = "";

      console.log("submit!", { note, url, location });

      switch (scope) {
        case NOTE_SCOPES.GLOBAL:
          url = "";
          break;
        case NOTE_SCOPES.SITE:
          url = location.origin;
          break;
        case NOTE_SCOPES.PAGE:
          url = location.href;
          break;
        default:
          url = "";
          break;
      }

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

  return (
    <PopupLayout footer={footer}>
      <StyledNotesContainer>
        {Boolean(getAllNotesRequest.loading) && <p>Loading...</p>}
        {Boolean(getAllNotesRequest.error) && (
          <p>Oops! Something went wrong!</p>
        )}
        {!getAllNotesRequest.loading &&
          !getAllNotesRequest.error &&
          getAllNotesRequest.data &&
          getAllNotesRequest.data.allNotes.map((note) => (
            <Note
              note={note}
              onEdit={handleNoteEdit}
              onDelete={handleNoteDelete}
              key={note._id}
            />
          ))}
      </StyledNotesContainer>
    </PopupLayout>
  );
}

const StyledNotesContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
`;
