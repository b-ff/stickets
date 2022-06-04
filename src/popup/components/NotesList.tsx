import React, {
  FC,
  FormEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useLayoutEffect,
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

  useLayoutEffect(() => {
    const searchInputElement = ref.current as HTMLInputElement;

    if (searchInputElement.value !== currentSearch) {
      const pseudoEvent: any = { target: searchInputElement };
      handleSearchChanges(pseudoEvent);
    }
  }, [ref, handleSearchChanges]);

  const notesToDisplay = currentSearch.length ? displayNotes : notes;

  return (
    <StyledNotesList {...props}>
      <TitledColumn columnTitle={`${title}`} actions={<StyledIconSort />}>
        <SearchField ref={ref} placeholder="Search note" onChange={handleSearchChanges} />
        {Boolean(notesToDisplay.length) ? (
          notesToDisplay.map((note) => (
            <NotesListItem
              note={note}
              key={note._id}
              onClick={() => onSelect(note)}
              onDelete={onDelete}
            />
          ))
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
  height: 100%;
  padding: 0 var(--fontBigSize);
  box-sizing: border-box;
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
