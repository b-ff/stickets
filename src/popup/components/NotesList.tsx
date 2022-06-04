import React, {
  FC,
  FormEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { Note } from '../../common/graphql/__generated__/graphql';
import { IconSort } from '../icons/IconSort';
import { ContentCenter } from './ContentCenter';
import { SearchField } from './SearchField';
import { NoteUser } from '../../common/graphql/__generated__';
import { TitledColumn } from './TitledColumn';

type NotesListProps = {
  title: ReactNode;
  emptyText: ReactNode;
  notes: Note[];
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
};

export const NotesList: FC<NotesListProps> = ({
  title,
  emptyText,
  notes,
  onSelect,
  onDelete,
  ...props
}): ReactElement => {
  const [displayNotes, setDisplayNotes] = useState(notes);

  console.log(131, title);

  const handleSearchChanges: FormEventHandler = useCallback(
    (event) => {
      const search = (event.target as HTMLInputElement).value.toLocaleLowerCase();
      const filteredNotes = notes.filter(({ note, url, sharedWith }) => {
        const filterFields = [note, url];

        if (sharedWith) {
          sharedWith.forEach(({ name, email }: any) =>
            filterFields.concat([name, email]),
          );
        }

        console.log(132, { filterFields });
      });

      console.log(133, search);
    },
    [notes],
  );

  return (
    <StyledNotesList {...props}>
      <TitledColumn title={`${title}`} actions={<StyledIconSort />}>
        <SearchField
          placeholder="Search note"
          onChange={handleSearchChanges}
          defaultValue={' '}
        />
        {notes.length ? (
          <span>NotesList</span>
        ) : (
          <ContentCenter {...props}>
            <StyledEmptyText>{emptyText}</StyledEmptyText>
          </ContentCenter>
        )}
      </TitledColumn>
    </StyledNotesList>
  );
};

const StyledNotesList = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 var(--fontBigSize);
  box-sizing: border-box;
`;

const StyledToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--fontBigSize) * 2) 0 calc(var(--fontBigSize) * 1.5);
`;

const StyledTitle = styled.h1`
  font-size: var(--fontBigSize);
`;

const StyledIconSort = styled(IconSort)`
  width: 20px;
  height: 20px;
  stroke: var(--iconPrimaryColor);
`;

const StyledEmptyText = styled.span`
  color: var(--textTertiaryColor);
  font-size: var(--fontRegularSize);
`;
