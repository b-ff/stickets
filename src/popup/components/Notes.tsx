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
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(SLIDES.LIST);

  const handleSelect = useCallback(
    (note: Note): void => {
      setSelectedNoteId(note._id);
      setSelectedSlide(SLIDES.DETAILS);
    },
    [setSelectedNoteId, setSelectedSlide],
  );

  const handleGoBack = useCallback(() => {
    setSelectedNoteId(null);
    setSelectedSlide(SLIDES.LIST);
  }, [setSelectedNoteId, setSelectedSlide]);

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

  const noteDetails = useMemo(() => {
    const selectedNote = selectedNoteId && notes.find((n) => n._id === selectedNoteId);
    return (
      selectedNote && (
        <NoteDetails note={selectedNote} onChange={onUpdate} onBack={handleGoBack} />
      )
    );
  }, [notes, selectedNoteId, onUpdate, handleGoBack]);

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
