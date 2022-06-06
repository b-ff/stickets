import React, {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { noop } from '../../common/utils';
import { ContentCenter } from './ContentCenter';
import { Note } from '../../common/graphql/__generated__/graphql';
import { NotesList } from './NotesList';
import { SliderColumn } from './SliderColumn';
import { NoteDetails } from './NoteDetails';

const SLIDES = {
  LIST: 0,
  DETAILS: 1,
};

type NotesProps = {
  notes: Note[];
  onUpdate: (note: Partial<Note>) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  title?: ReactNode;
  emptyText?: ReactNode;
};

export const Notes: FC<NotesProps> = ({
  notes = [],
  onUpdate = noop,
  onDelete = noop,
  isLoading = false,
  title = null,
  emptyText = null,
  ...props
}): ReactElement => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(SLIDES.LIST);

  useEffect(() => () => console.log('notes bang'), []);

  const handleSelect = useCallback(
    (note: Note): void => {
      setSelectedNote(note);
      setSelectedSlide(SLIDES.DETAILS);
    },
    [setSelectedNote, setSelectedSlide],
  );

  const handleGoBack = useCallback(() => {
    setSelectedNote(null);
    setSelectedSlide(SLIDES.LIST);
  }, [setSelectedNote, setSelectedSlide]);

  const handleUpdate = useCallback(
    (data: Partial<Note>) => {
      onUpdate(data);
      handleGoBack();
    },
    [onUpdate, handleGoBack],
  );

  const loading = useMemo(
    () => <ContentCenter {...props}>Loading...</ContentCenter>,
    [props],
  );

  const notesList = useMemo(
    () => (
      <NotesList
        title={title}
        emptyText={emptyText}
        notes={notes}
        onSelect={handleSelect}
        onDelete={onDelete}
      />
    ),
    [title, notes, handleSelect, onDelete],
  );

  const noteDetails = useMemo(
    () =>
      selectedNote && (
        <NoteDetails note={selectedNote} onChange={handleUpdate} onBack={handleGoBack} />
      ),
    [selectedNote, onUpdate, handleGoBack],
  );

  return isLoading ? (
    loading
  ) : (
    <SliderColumn
      slides={[notesList, noteDetails]}
      currentSlideIndex={selectedSlide}
      {...props}
    />
  );
};
