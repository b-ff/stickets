import React, {
  FC,
  ReactElement,
  Ref,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "@linaria/react";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { noop } from "../../common/utils";
import { SmartTextarea } from "./SmartTextarea";

const SCOPE_OPTIONS = {
  [Scope.Global]: "All web-sites",
  [Scope.Site]: "This web-site {host}",
  [Scope.Page]: "Current page only",
};

type AddNoteFormProps = {
  onSubmit: (note: Partial<INote>) => void;
};

export const AddNoteForm: FC<AddNoteFormProps> = ({
  onSubmit = noop,
}): ReactElement => {
  const formRef: Ref<HTMLFormElement> = useRef(null);
  const textareaRef: Ref<HTMLParagraphElement> = useRef(null);
  const submitRef: Ref<HTMLButtonElement> = useRef(null);

  const location = useCurrentLocation();

  const [noteEmpty, setNoteEmpty] = useState(true);

  const handleReset = useCallback(() => {
    formRef.current?.reset();

    if (textareaRef.current) {
      textareaRef.current.innerHTML = "";
    }
  }, [formRef, textareaRef]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement) as any
      );
      onSubmit(formData);
      event.preventDefault();
      handleReset();
    },
    [onSubmit, handleReset]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      const isTextaeraEmpty = !(event.target as HTMLInputElement).value.length;

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "enter" &&
        !isTextaeraEmpty &&
        submitRef.current
      ) {
        submitRef.current.click();
      }

      setNoteEmpty(isTextaeraEmpty);
    },
    [submitRef, setNoteEmpty]
  );

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit}>
      <StyledFormRow>
        <StyledSelect name="scope">
          {Object.entries(SCOPE_OPTIONS).map(([value, text]) => (
            <option value={value} key={value}>
              {text.replace("{host}", location ? `(${location.host})` : "")}
            </option>
          ))}
        </StyledSelect>
      </StyledFormRow>
      <StyledFormRow>
        <StyledSmartTextarea
          isEditing
          name="note"
          placeholder="Your note..."
          onKeyUp={handleKeyUp}
          ref={textareaRef}
        ></StyledSmartTextarea>
      </StyledFormRow>
      <StyledFormRow>
        <StyledButton type="reset" onClick={handleReset} disabled={noteEmpty}>
          Reset
        </StyledButton>
        <StyledButton type="submit" ref={submitRef} disabled={noteEmpty}>
          Add note
        </StyledButton>
      </StyledFormRow>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }

  & > *:last-of-type {
    margin-right: 0;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  color: var(--fontPrimaryColor);
  background-color: var(--inputPrimaryColor);
  border: 1px solid var(--borderPrimaryColor);
  border-radius: 3px;
  padding: 5px 10px;
  box-sizing: border-box;
  outline: none;
`;

const StyledSmartTextarea = styled(SmartTextarea)`
  width: 100%;
  min-height: 70px;
  max-height: 200px;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;

  &[contenteditable="true"] {
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  resize: none;
  color: var(--fontPrimaryColor);
  background-color: var(--inputPrimaryColor);
  border: 1px solid var(--borderPrimaryColor);
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &[type="submit"] {
    background-color: var(--brandColor);
  }
`;
