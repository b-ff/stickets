import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { styled } from '@linaria/react';
import { Note } from '../../common/graphql/__generated__/graphql';
import { TitledColumn } from './TitledColumn';
import { BackButton } from './BackButton';
import { AddNoteForm } from './AddNoteForm';
import { IconEdit } from '../icons/IconEdit';

type NoteDetailsProps = {
  note: Note;
  onChange: (note: Partial<Note>) => void;
  onBack: () => void;
};

export const NoteDetails: FC<NoteDetailsProps> = ({
  note,
  onChange,
  onBack,
  ...props
}): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => setIsEditing(true), [setIsEditing]);
  const handleCancelEdit = useCallback(() => setIsEditing(false), [setIsEditing]);
  const handleUpdate = useCallback(
    (data: Partial<Note>) => {
      onChange(data);
      handleCancelEdit();
    },
    [onChange, handleCancelEdit],
  );

  const backButton = useMemo(
    () => <BackButton type="button" onClick={onBack} />,
    [onBack],
  );

  const noteActions = useMemo(
    () => (
      <StyledNoteActions>
        {Boolean(isEditing) && (
          <StyledCancelButton type="button" onClick={handleCancelEdit}>
            Cancel
          </StyledCancelButton>
        )}
        {!isEditing && !note.shared && <StyledIconEdit onClick={handleEdit} />}
      </StyledNoteActions>
    ),
    [isEditing, note, handleEdit],
  );

  return (
    <StyledNote {...props}>
      <TitledColumn columnTitle={backButton} actions={noteActions}>
        <StyledAddNoteForm
          note={note}
          onSubmit={handleUpdate}
          readonly={!isEditing}
          fullSize
        />
      </TitledColumn>
    </StyledNote>
  );
};

const StyledNote = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 var(--fontBigSize);
  box-sizing: border-box;
`;

const StyledAddNoteForm = styled<any>(AddNoteForm)`
  height: 100%;
  margin-left: calc(0px - var(--fontBigSize));
  margin-right: calc(0px - var(--fontBigSize));
`;

const StyledNoteActions = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-left: calc(var(--fontBigSize) / 2);
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledIconEdit = styled(IconEdit)`
  stroke: var(--iconPrimaryColor);
  cursor: pointer;
`;

const StyledCancelButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  line-height: 20px;
  color: var(--iconPrimaryColor);
  cursor: pointer;
`;
