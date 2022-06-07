import React, {
  FC,
  FormEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
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

  const notesToDisplay = currentSearch.length ? displayNotes : notes;

  return (
    <StyledNotesList {...props}>
      <TitledColumn columnTitle={`${title}`} actions={<StyledIconSort />}>
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
