import React, { useCallback, useState } from "react";
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
import { RadioSwitch } from "../components/RadioSwitch";

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

  const [displayScope, setDisplayScope] = useState(NOTE_SCOPES.GLOBAL);

  const getAllNotesRequest = useQuery(GET_ALL_NOTES);
  const [addNote, addNoteRequest] = useMutation(CREATE_NOTE);
  const [deleteNote, deleteNoteRequest] = useMutation(DELETE_NOTE);

  const handleNoteEdit = useCallback(() => {}, []);

  const handleNoteDelete = useCallback(
    (id) => {
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

  const isOK =
    !getAllNotesRequest.loading &&
    !getAllNotesRequest.error &&
    getAllNotesRequest.data;

  const notes = isOK ? getAllNotesRequest.data.allNotes : [];

  const globalNotes = [];
  const siteNotes = [];
  const pageNotes = [];

  notes.forEach((note) => {
    if (note.scope === NOTE_SCOPES.GLOBAL) {
      globalNotes.push(note);
    }

    if (note.scope === NOTE_SCOPES.SITE && note.url.includes(location.origin)) {
      siteNotes.push(note);
    }

    if (note.scope === NOTE_SCOPES.PAGE && note.url === location.href) {
      pageNotes.push(note);
    }
  });

  const switchOptions = [
    {
      label: "All",
      value: NOTE_SCOPES.GLOBAL,
      count: globalNotes.length,
    },
    {
      label: "Site",
      value: NOTE_SCOPES.SITE,
      count: siteNotes.length,
    },
    {
      label: "Page",
      value: NOTE_SCOPES.PAGE,
      count: pageNotes.length,
    },
  ];

  const scopeToNotesMap = {
    [NOTE_SCOPES.GLOBAL]: globalNotes,
    [NOTE_SCOPES.SITE]: siteNotes,
    [NOTE_SCOPES.PAGE]: pageNotes,
  };

  return (
    <PopupLayout footer={footer}>
      <RadioSwitch
        name="notes-display"
        options={switchOptions}
        defaultValue={displayScope}
        onChange={setDisplayScope}
      />
      <StyledNotesContainer>
        {Boolean(getAllNotesRequest.loading) && <p>Loading...</p>}
        {Boolean(getAllNotesRequest.error) && (
          <p>Oops! Something went wrong!</p>
        )}
        {scopeToNotesMap[displayScope].map((note) => (
          <Note
            note={note}
            onEdit={handleNoteEdit}
            onDelete={handleNoteDelete}
            key={note._id}
          />
        ))}
        {!notes.length && <p>You don't have notes. Yet...</p>}
      </StyledNotesContainer>
    </PopupLayout>
  );
}

const StyledNotesContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 10px 15px;
  box-sizing: border-box;
  overflow-y: auto;
`;
