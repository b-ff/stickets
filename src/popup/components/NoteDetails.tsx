import React, { FC, ReactElement } from 'react';
import { styled } from '@linaria/react';
import { Note } from '../../common/graphql/__generated__/graphql';
import { TitledColumn } from './TitledColumn';
import { BackButton } from './BackButton';
import { AddNoteForm } from './AddNoteForm';

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
  return (
    <StyledNote {...props}>
      <TitledColumn columnTitle={<BackButton type="button" onClick={onBack} />}>
        NoteDetails
        <AddNoteForm onSubmit={onChange} />
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
