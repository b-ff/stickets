import React, { FC, ReactElement } from "react";
import { noop } from "../../common/utils";
import { Note } from "./Note";
import { ContentCenter } from "./ContentCenter";
import { styled } from "@linaria/react";

type NotesListProps = {
  notes: INote[];
  onUpdate: (note: INote) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
};

export const NotesList: FC<NotesListProps> = ({
  notes = [],
  onUpdate = noop,
  onDelete = noop,
  isLoading = false,
  ...props
}): ReactElement => {
  return isLoading ? (
    <ContentCenter {...props}>Loading...</ContentCenter>
  ) : notes.length ? (
    <>
      {notes.map((note: INote) => (
        <Note
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
          key={note._id}
        />
      ))}
    </>
  ) : (
    <ContentCenter {...props}>
      <StyledHeading>You have no notes on this tab. Yet.</StyledHeading>
      <StyledText>Wanna add some?</StyledText>
    </ContentCenter>
  );
};

const StyledHeading = styled.h3`
  font-size: 15px;
`;

const StyledText = styled.span`
  opacity: 0.6;
`;
