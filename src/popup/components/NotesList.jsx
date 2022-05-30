import React from "react";
import { noop } from "../../common/utils";
import { Note } from "./Note";
import { ContentCenter } from "./ContentCenter";
import { styled } from "@linaria/react";

export function NotesList({
  notes = [],
  onUpdate = noop,
  onDelete = noop,
  isLoading = false,
  ...props
}) {
  return isLoading ? (
    <ContentCenter {...props}>Loading...</ContentCenter>
  ) : notes.length ? (
    notes.map((note) => (
      <Note
        note={note}
        onUpdate={onUpdate}
        onDelete={onDelete}
        key={note._id}
      />
    ))
  ) : (
    <ContentCenter {...props}>
      <StyledHeading>You have no notes on this tab. Yet.</StyledHeading>
      <StyledText>Wanna add some?</StyledText>
    </ContentCenter>
  );
}

const StyledHeading = styled.h3`
  font-size: 15px;
`;

const StyledText = styled.span`
  opacity: 0.6;
`;
