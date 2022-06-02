import React, {
  FC,
  LegacyRef,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "@linaria/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  applyStyleIfHasProperty,
  noop,
  stripTags,
  urlify,
} from "../../common/utils";
import { NOTE_SCOPES } from "../../common/constants/note-scopes";
import { SmartTextarea } from "./SmartTextarea";

type NoteProps = {
  note: INote;
  onUpdate: (note: INote) => void;
  onDelete: (id: string) => void;
};

export const Note: FC<NoteProps> = ({
  note,
  onUpdate = noop,
  onDelete = noop,
}): ReactElement => {
  const noteTextRef: LegacyRef<HTMLParagraphElement | undefined> = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [noteEmpty, setNoteEmpty] = useState(!note.note.length);

  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const latestDate = updated.getTime() > created.getTime() ? updated : created;
  const displayedDate = formatDistanceToNow(latestDate, {
    addSuffix: true,
    includeSeconds: true,
  });

  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => noteTextRef.current?.focus());
  }, [noteTextRef, setIsEditing]);

  const handleNoteTextChange = useCallback(
    (event) => {
      if (isEditing) {
        const isEmpty = !event.target.innerHTML.length;
        setNoteEmpty(isEmpty);
      }
    },
    [isEditing, setNoteEmpty]
  );

  const handleCancelEdit = useCallback(() => {
    if (noteTextRef.current) {
      noteTextRef.current.innerHTML = note.note;
    }
    setIsEditing(false);
  }, [note, noteTextRef, setIsEditing]);

  const handleOnUpdate = useCallback(() => {
    onUpdate({
      ...note,
      note: noteTextRef.current
        ? stripTags(noteTextRef.current.innerHTML.trim())
        : note.note,
    });
    setIsEditing(false);
  }, [note, noteTextRef, setIsEditing]);

  const handleOpenNoteURL = useCallback(() => {
    if (note.url) {
      window.open(note.url);
    }
  }, [note]);

  return (
    <StyledNoteContainer>
      <SmartTextarea
        ref={noteTextRef}
        contentEditable={isEditing}
        onDoubleClick={handleStartEditing}
        onKeyUp={handleNoteTextChange}
        placeholder="Your note..."
        style={{ maxHeight: isEditing ? "200px" : "auto" }}
      >
        {urlify(note.note)}
      </SmartTextarea>
      <StyledNoteInfo>
        {!isEditing && (
          <>
            <span>{displayedDate}</span>
            <span>
              {note.scope !== NOTE_SCOPES.PAGE && note.url && (
                <StyledNoteAction title={note.url} onClick={handleOpenNoteURL}>
                  Open URL
                </StyledNoteAction>
              )}
              <StyledNoteAction onClick={handleStartEditing}>
                Edit
              </StyledNoteAction>
              <StyledNoteAction onClick={() => onDelete(note._id)}>
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
            <StyledNoteAction
              onClick={handleOnUpdate}
              disabled={noteEmpty}
              negative
            >
              Save
            </StyledNoteAction>
          </span>
        )}
      </StyledNoteInfo>
    </StyledNoteContainer>
  );
};

const StyledNoteContainer = styled.article`
  padding: 5px;
  background-color: var(--inputPrimaryColor);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const StyledNoteText = styled.p`
  font-size: 14px;
  padding: 5px;
  margin: 0 0 5px;
  box-sizing: border-box;
  border-radius: 2px;

  &[contenteditable="true"] {
    outline: 1px solid var(--borderPrimaryColor);
  }
`;

const StyledNoteInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  padding: 5px;
  opacity: 0.8;
`;

const StyledNoteAction = styled.button`
  padding: 4px 7px;
  margin: 0 0 0 5px;
  border: none;
  outline: none;
  font-size: 11px;
  color: var(--fontPrimaryColor);
  background-color: ${applyStyleIfHasProperty(
    "negative",
    "var(--brandColor)",
    "var(--borderPrimaryColor)"
  )};
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
