import React, {
  FC,
  FormEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { Note } from '../../common/graphql/__generated__/graphql';
import { IconSort } from '../icons/IconSort';
import { ContentCenter } from './ContentCenter';
import { SearchField } from './SearchField';
import { TitledColumn } from './TitledColumn';
import { NotesListItem } from './NotesListItem';
import { IconWithDropdown } from './IconWithDropdown';
import { NotesSortTypes } from '../enums/NotesSortTypes';
import { sortNotes } from '../../common/utils';

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
  const ref: Ref<HTMLInputElement> = useRef(null);
  const [displayNotes, setDisplayNotes] = useState(notes);
  const [currentSearch, setCurrentSearch] = useState('');
  const [sortType, setSortType] = useState(NotesSortTypes.Latest);

  const handleSearchChanges: FormEventHandler = useCallback(
    (event) => {
      const search = (event.target as HTMLInputElement).value;
      const filteredNotes = notes.filter(({ note, url, sharedWith }) => {
        const filterFields = [note, url];

        if (sharedWith) {
          sharedWith.forEach(({ name, email }: any) =>
            filterFields.concat([name, email]),
          );
        }

        return filterFields.find((field) =>
          field.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      });

      setDisplayNotes(filteredNotes);
      setCurrentSearch(search);
    },
    [notes],
  );

  const handleSortChanged = useCallback(
    ({ value }: any) => {
      setSortType(value);
    },
    [setSortType],
  );

  const notesToDisplay = useMemo(
    () => sortNotes(currentSearch.length ? displayNotes : notes, sortType),
    [currentSearch, displayNotes, notes, sortType],
  );

  const sortOptions = useMemo(
    () => [
      { label: 'Latest first', value: NotesSortTypes.Latest },
      { label: 'Oldest first', value: NotesSortTypes.Oldest },
      { label: 'A-Z by text', value: NotesSortTypes.AZText },
      { label: 'Z-A by text', value: NotesSortTypes.ZAText },
      // @todo uncomment once share feature will be implemented
      // { label: 'My notes first', value: NotesSortTypes.My },
      // { label: 'Shared with me first', value: NotesSortTypes.SharedWithMe },
      // { label: 'Shared by me first', value: NotesSortTypes.SharedByMe },
      // { label: 'Not Shared first', value: NotesSortTypes.NotShared },
    ],
    [],
  );

  const actions = useMemo(
    () => (
      <IconWithDropdown
        icon={<StyledIconSort />}
        options={sortOptions}
        onChange={handleSortChanged}
      />
    ),
    [],
  );

  return (
    <StyledNotesList {...props}>
      <TitledColumn columnTitle={`${title}`} actions={actions}>
        <SearchField ref={ref} placeholder="Search note" onChange={handleSearchChanges} />
        {Boolean(notesToDisplay.length) ? (
          <StyledNotesWrapper>
            {notesToDisplay.map((note) => (
              <StyledNotesListItem
                note={note}
                key={note._id}
                onClick={() => onSelect(note)}
                onDelete={onDelete}
              />
            ))}
          </StyledNotesWrapper>
        ) : (
          <ContentCenter {...props}>
            {notes.length ? (
              <StyledEmptyText>No notes found</StyledEmptyText>
            ) : (
              <StyledEmptyText>{emptyText}</StyledEmptyText>
            )}
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
  height: 100vh;
  padding: 0 var(--fontBigSize);
  box-sizing: border-box;
`;

const StyledIconSort = styled(IconSort)`
  width: 20px;
  height: 20px;
  stroke: var(--iconPrimaryColor);
`;

const StyledNotesWrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding: 0 0 calc(var(--fontBigSize) / 2);
  margin: calc(var(--fontBigSize) / 2) 0 40px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const StyledNotesListItem = styled(NotesListItem)`
  margin-bottom: calc(var(--fontBigSize) / 2);
  border-bottom: 1px solid var(--controlPrimaryColor);
`;

const StyledEmptyText = styled.span`
  color: var(--textTertiaryColor);
  font-size: var(--fontRegularSize);
`;
