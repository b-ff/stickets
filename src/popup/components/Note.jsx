import { styled } from "@linaria/react";
import React, { useCallback, useRef, useState } from "react";

export function Note({ note, onUpdate, onDelete }) {
  const noteTextRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const displayedDate = Intl.DateTimeFormat().format(
    updated.getTime() > created.getTime() ? updated : created
  );

  const handleCancelEdit = useCallback(() => {
    noteTextRef.current.innerHTML = note.note;
    setIsEditing(false);
  }, [noteTextRef, setIsEditing]);

  const handleOnUpdate = useCallback(() => {
    onUpdate({
      ...note,
      note: noteTextRef.current.innerHTML.trim(),
    });
    setIsEditing(false);
  }, [noteTextRef, setIsEditing]);

  return (
    <StyledNoteContainer>
      <StyledNoteText ref={noteTextRef} contentEditable={isEditing}>
        {note.note}
      </StyledNoteText>
      <StyledNoteInfo>
        {!isEditing && (
          <>
            <span>{displayedDate}</span>
            <span>
              <StyledNoteAction onClick={() => setIsEditing(true)}>
                Edit
              </StyledNoteAction>
              <StyledNoteAction onClick={() => onDelete(note._id)} negative>
                Delete
              </StyledNoteAction>
            </span>
          </>
        )}
        {isEditing && (
          <span>
            <StyledNoteAction onClick={handleCancelEdit}>
              Cancel
            </StyledNoteAction>
            <StyledNoteAction onClick={handleOnUpdate} negative>
              Save
            </StyledNoteAction>
          </span>
        )}
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
  outline: none;
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
  background-color: ${({ negative }) =>
    negative ? "var(--brandColor)" : "var(--borderPrimaryColor)"};
  border-radius: 10px;
  cursor: pointer;
`;
