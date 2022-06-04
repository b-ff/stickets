import React, { FC, ReactElement } from 'react';
import { styled } from '@linaria/react';
import { Note } from '../../common/graphql/__generated__/graphql';

type NoteDetailsProps = {
  note: Note;
  onChange: (note: Note) => void;
  onBack: () => void;
};

export const NoteDetails: FC<NoteDetailsProps> = ({
  note,
  onChange,
  onBack,
  ...props
}): ReactElement => {
  return <StyledNote {...props}>NoteDetails</StyledNote>;
};

const StyledNote = styled.article``;
