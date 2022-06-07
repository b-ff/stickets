import React, { FC, HTMLAttributes, ReactElement, useCallback, useMemo } from 'react';
import { styled } from '@linaria/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { noop } from '../../common/utils';
import { Note, NoteUser } from '../../common/graphql/__generated__/graphql';
import { IconDots } from '../icons/IconDots';
import { IconWithDropdown } from './IconWithDropdown';
import { ProfilePreviews } from './ProfilePreviews';

const enum NoteActions {
  Edit = 'edit',
  Share = 'share',
  GoToWebsite = 'website',
  Delete = 'delete',
}

type NoteActionOption = {
  label: string;
  value: NoteActions;
  negative?: boolean;
};

type NotesListItemProps = HTMLAttributes<HTMLElement> & {
  note: Note;
  onClick?: (note: Note) => void;
  onDelete: (id: string) => void;
  onShare: (note: Note) => void;
};

export const NotesListItem: FC<NotesListItemProps> = ({
  note,
  onClick = noop,
  onDelete,
  onShare,
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

  const handleActionSelected = useCallback(
    ({ value: action }: any) => {
      if (action === NoteActions.Edit) {
        onClick(note);
      }

      if (action === NoteActions.Share) {
        onShare(note);
      }

      if (action === NoteActions.GoToWebsite) {
        handleOpenNoteURL();
      }

      if (action === NoteActions.Delete) {
        onDelete(note._id);
      }
    },
    [onClick, handleOpenNoteURL, onDelete],
  );

  const noteActions = useMemo(() => {
    const actions: NoteActionOption[] = [
      {
        label: note.shared ? 'View' : 'Edit',
        value: NoteActions.Edit,
      },
    ];

    if (!note.shared) {
      actions.push({
        label: 'Share',
        value: NoteActions.Share,
      });
    }

    if (note.url) {
      actions.push({
        label: 'Go to website',
        value: NoteActions.GoToWebsite,
      });
    }

    actions.push({
      label: 'Delete',
      value: NoteActions.Delete,
      negative: true,
    });

    return actions;
  }, [note]);

  return (
    <StyledNoteContainer {...props}>
      <StyledNoteMain onClick={onClick}>
        <StyledNoteTextWrapper>
          <StyledNoteText>{note.note}</StyledNoteText>
        </StyledNoteTextWrapper>
        <StyledNoteInfo>
          <span>
            {displayedDate}
            {Boolean(note.shared && note.creator) && ` by ${note.creator?.name}`}
            {Boolean(!note.shared && note.sharedWith?.length) && (
              <StyledProfilePreviews profiles={note.sharedWith as NoteUser[]} limit={3} />
            )}
          </span>
        </StyledNoteInfo>
      </StyledNoteMain>
      <div>
        <IconWithDropdown
          icon={<StyledNoteActions />}
          options={noteActions}
          onChange={handleActionSelected}
        />
      </div>
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
  padding-top: 4px;
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

const StyledProfilePreviews = styled(ProfilePreviews)`
  &.profile-previews {
    margin: 0 calc(var(--fontBigSize) / 2);
  }
`;
