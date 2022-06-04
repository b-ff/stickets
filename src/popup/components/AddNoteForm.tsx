import React, {
  FC,
  FormEventHandler,
  ReactElement,
  Ref,
  useCallback,
  useRef,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { noop } from '../../common/utils';
import { SmartTextarea } from './SmartTextarea';
import { Note, NoteScope } from '../../common/graphql/__generated__/graphql';
import { IconCheckmark } from '../icons/IconCheckmark';
import { Button } from './Button';

const SCOPE_OPTIONS = {
  [NoteScope.Page]: 'This page',
  [NoteScope.Site]: 'This web-site',
  [NoteScope.Global]: 'Visible everywhere',
};

type AddNoteFormProps = {
  onSubmit: (note: Partial<Note>) => void;
};

export const AddNoteForm: FC<AddNoteFormProps> = ({ onSubmit = noop }): ReactElement => {
  const formRef: Ref<HTMLFormElement> = useRef(null);
  const textareaRef: Ref<HTMLParagraphElement> = useRef(null);
  const submitRef: Ref<HTMLButtonElement> = useRef(null);

  const location = useCurrentLocation();

  const [noteEmpty, setNoteEmpty] = useState(true);

  const handleReset = useCallback(() => {
    formRef.current?.reset();

    if (textareaRef.current) {
      textareaRef.current.innerHTML = '';
    }
  }, [formRef, textareaRef]);

  const handleSubmit: FormEventHandler = useCallback(
    (event) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement) as any,
      );
      onSubmit({
        ...formData,
        url: location?.href || '',
      });
      event.preventDefault();
      handleReset();
    },
    [onSubmit, handleReset],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      const isTextaeraEmpty = !(event.target as HTMLInputElement).value.length;

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === 'enter' &&
        !isTextaeraEmpty &&
        submitRef.current
      ) {
        submitRef.current.click();
      }

      setNoteEmpty(isTextaeraEmpty);
    },
    [submitRef, setNoteEmpty],
  );

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit}>
      <StyledSelect name="scope">
        {Object.entries(SCOPE_OPTIONS).map(([value, text]) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </StyledSelect>

      <StyledSmartTextarea
        isEditing
        name="note"
        placeholder="Your note..."
        onKeyUp={handleKeyUp}
        ref={textareaRef}
      ></StyledSmartTextarea>
      <StyledButton type="submit" ref={submitRef} disabled={noteEmpty}>
        <StyledIconCheckmark />
      </StyledButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: calc(var(--fontBigSize) / 2) 0 calc(var(--fontBigSize) * 1.5);
  border-top: 1px solid var(--controlPrimaryColor);
`;

const StyledSelect = styled.select`
  height: calc(var(--fontSmallText) * 3);
  line-height: calc(var(--fontSmallText) * 3);
  background-color: transparent;
  color: var(--fontPrimaryColor);
  font-size: var(--fontRegularSize);
  font-family: 'Helvetica';
  font-weight: normal;
  border: none;
  outline: none;
  padding: calc(var(--fontBigSize) / 2) calc(var(--fontRegularSize) - 1px);
  box-sizing: border-box;
`;

const StyledSmartTextarea = styled(SmartTextarea)`
  width: 100%;
  min-height: 75px;
  max-height: 200px;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;

  &[contenteditable='true'] {
    outline: none;
  }
`;

const StyledButton = styled<any>(Button)`
  &[type='submit'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 0;
    margin-left: auto;
    margin-right: var(--fontBigSize);
  }
`;

const StyledIconCheckmark = styled(IconCheckmark)`
  width: 16px;
  height: 11px;
`;
