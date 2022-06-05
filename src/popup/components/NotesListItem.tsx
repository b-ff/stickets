import React, { FC, HTMLAttributes, ReactElement, useCallback } from 'react';
import { styled } from '@linaria/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { noop, urlify } from '../../common/utils';
import { Note } from '../../common/graphql/__generated__/graphql';
import { IconDots } from '../icons/IconDots';

type NotesListItemProps = HTMLAttributes<HTMLElement> & {
  note: Note;
  onUpdate?: (note: Note) => void;
  onDelete?: (id: string) => void;
};

export const NotesListItem: FC<NotesListItemProps> = ({
  note,
  onUpdate = noop,
  onDelete = noop,
  ...props
}): ReactElement => {
  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const latestDate = updated.getTime() > created.getTime() ? updated : created;
  const displayedDate = formatDistanceToNow(latestDate, {
    addSuffix: true,
    includeSeconds: true,
  });

  const handleOpenNoteURL = useCallback(() => {
    if (note.url) {
      window.open(note.url);
    }
  }, [note]);

  return (
    <StyledNoteContainer {...props}>
      <StyledNoteMain>
        <StyledNoteTextWrapper>
          <StyledNoteText>{note.note}</StyledNoteText>
        </StyledNoteTextWrapper>
        <StyledNoteInfo>
          <span>
            {displayedDate}
            {Boolean(note.shared && note.creator) ? ` by ${note.creator?.name}` : null}
          </span>
        </StyledNoteInfo>
      </StyledNoteMain>
      <StyledNoteActions />
    </StyledNoteContainer>
  );
};

const StyledNoteContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  padding: calc(var(--fontBigSize) / 2) 0;
  box-sizing: border-box;

  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledNoteMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 var(--fontBigSize) 0 calc(var(--fontBigSize) / 2);
`;

const StyledNoteTextWrapper = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const StyledNoteText = styled.p`
  display: table-cell;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 20px;
  overflow: hidden;
`;

const StyledNoteInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fontSmallSize);
  line-height: 20px;
  color: var(--textSecondaryColor);
`;

const StyledNoteActions = styled(IconDots)`
  width: 20px;
  height: 20px;
  fill: var(--textTertiaryColor);
  cursor: pointer;
`;
