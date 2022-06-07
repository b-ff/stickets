import React, {
  FC,
  FormEventHandler,
  HTMLAttributes,
  ReactElement,
  Ref,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import {
  applyStyleIfHasProperty,
  noop,
  setEndOfContenteditable,
} from '../../common/utils';
import { SmartTextarea } from './SmartTextarea';
import { Note, NoteScope } from '../../common/graphql/__generated__/graphql';
import { IconCheckmark } from '../icons/IconCheckmark';
import { Button } from './Button';
import { CustomSelect } from './CustomSelect';

const SCOPE_OPTIONS = {
  [NoteScope.Page]: 'This page',
  [NoteScope.Site]: 'This web-site',
  [NoteScope.Global]: 'Visible everywhere',
};

type AddNoteFormProps = {
  note?: Note;
  textareaProps?: HTMLAttributes<HTMLParagraphElement>;
  readonly?: boolean;
  fullSize?: boolean;
  onSubmit: (note: Partial<Note>) => void;
};

export const AddNoteForm: FC<AddNoteFormProps> = ({
  note = {},
  textareaProps = {},
  readonly = false,
  fullSize = false,
  onSubmit = noop,
  ...props
}): ReactElement => {
  const formRef: Ref<HTMLFormElement> = useRef(null);
  const scopeRef: Ref<HTMLInputElement> = useRef(null);
  const textareaRef: Ref<HTMLParagraphElement> = useRef(null);
  const submitRef: Ref<HTMLButtonElement> = useRef(null);

  const location = useCurrentLocation();

  const [noteEmpty, setNoteEmpty] = useState(!note.note);

  useLayoutEffect(() => {
    if (fullSize && textareaRef.current) {
      const textarea = textareaRef.current;
      const html = textarea.innerHTML;

      textarea.style.maxHeight = '100%';
      textarea.style.height = '100%';
      textarea.innerHTML = '';

      const { height } = textarea.getBoundingClientRect();

      textarea.style.height = '';
      textarea.style.maxHeight = `${height}px`;
      textarea.innerHTML = html;
    }

    if (!readonly && textareaRef.current) {
      const textarea = textareaRef.current as HTMLParagraphElement &
        HTMLTextAreaElement & { createTextRange: () => any };

      textarea.focus();
      setEndOfContenteditable(textarea);
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [readonly, fullSize, textareaRef]);

  const handleScopeChange = useCallback(
    ({ value }: any) => {
      if (scopeRef.current) {
        scopeRef.current.value = value;
      }
    },
    [scopeRef],
  );

  const handleSubmit: FormEventHandler = useCallback(
    (event) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement) as any,
      );

      onSubmit({
        ...note,
        ...formData,
        url: location?.href || '',
      });
      event.preventDefault();
    },
    [note, onSubmit],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      const isTextaeraEmpty = !(event.target as HTMLParagraphElement).innerHTML.length;

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
    [readonly, submitRef.current, setNoteEmpty],
  );

  const options = Object.entries(SCOPE_OPTIONS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit} {...props}>
      {!note.scope && (
        <>
          <input
            type="hidden"
            name="scope"
            ref={scopeRef}
            defaultValue={options[0].value}
          />
          <CustomSelect
            options={options}
            defaultValue={options[0]}
            onChange={handleScopeChange}
          />
          {/* <StyledSelect name="scope">
            {Object.entries(SCOPE_OPTIONS).map(([value, text]) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))}
          </StyledSelect> */}
        </>
      )}

      <StyledSmartTextarea
        isEditing={!readonly}
        name="note"
        placeholder="Your note..."
        onKeyUp={handleKeyUp}
        ref={textareaRef}
        fullSize={fullSize}
        {...textareaProps}
      >
        {note.note || null}
      </StyledSmartTextarea>
      {!readonly && (
        <StyledButton type="submit" ref={submitRef} disabled={noteEmpty}>
          <StyledIconCheckmark />
        </StyledButton>
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: calc(var(--fontBigSize) / 2) 0 calc(var(--fontBigSize) * 1.5);
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
  border: 1px solid #ccc;
`;

const StyledSmartTextarea = styled<any>(SmartTextarea)`
  width: 100%;
  min-height: calc(75px - var(--fontBigSize));
  height: ${applyStyleIfHasProperty('fullSize', '100%', '')};
  max-height: ${applyStyleIfHasProperty('fullSize', '100%', '200px')};
  margin: 0 0 var(--fontBigSize);
  box-sizing: border-box;
  outline: none;
  overflow-y: auto;

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
    min-height: 32px;
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
