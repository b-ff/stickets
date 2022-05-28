import { styled } from "@linaria/react";
import React from "react";

export function Note({ note, onEdit, onDelete }) {
  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const displayedDate = Intl.DateTimeFormat().format(
    updated.getTime() > created.getTime() ? updated : created
  );

  return (
    <StyledNoteContainer>
      <StyledNoteText>{note.note}</StyledNoteText>
      <StyledNoteInfo>
        <span>{displayedDate}</span>
        <span>
          <StyledNoteAction onClick={() => onEdit(note)} disabled>
            Edit
          </StyledNoteAction>
          <StyledNoteAction onClick={() => onDelete(note._id)}>
            Delete
          </StyledNoteAction>
        </span>
      </StyledNoteInfo>
    </StyledNoteContainer>
  );
}

const StyledNoteContainer = styled.article`
  padding: 10px;
  background-color: var(--inputPrimaryColor);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const StyledNoteText = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0 0 10px;
`;

const StyledNoteInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  opacity: 0.8;
`;

const StyledNoteAction = styled.button`
  padding: 4px 7px;
  margin: 0 0 0 5px;
  border: none;
  outline: none;
  font-size: 11px;
  color: var(--fontPrimaryColor);
  background-color: var(--borderPrimaryColor);
  border-radius: 10px;
  cursor: pointer;
`;
