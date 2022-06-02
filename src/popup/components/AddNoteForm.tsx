import React, {
  FC,
  LegacyRef,
  MutableRefObject,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import { styled } from "@linaria/react";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { NOTE_SCOPES } from "../../common/constants/note-scopes";
import { noop } from "../../common/utils";

const SCOPE_OPTIONS = {
  [NOTE_SCOPES.GLOBAL]: "All web-sites",
  [NOTE_SCOPES.SITE]: "This web-site {host}",
  [NOTE_SCOPES.PAGE]: "Current page only",
};

type AddNoteFormProps = {
  onSubmit: (note: Partial<INote>) => void;
};

export const AddNoteForm: FC<AddNoteFormProps> = ({
  onSubmit = noop,
}): ReactElement => {
  const submitRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const location = useCurrentLocation();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement) as any
      );
      onSubmit(formData);
      event.preventDefault();
      (event.target as HTMLFormElement).reset();
    },
    []
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "enter") {
        submitRef.current?.click();
      }
    },
    [submitRef]
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
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
        <StyledTextarea
          name="note"
          placeholder="Your note..."
          onKeyUp={handleKeyUp}
        ></StyledTextarea>
      </StyledFormRow>
      <StyledFormRow>
        <StyledButton type="reset">Reset</StyledButton>
        <StyledButton type="submit" ref={submitRef}>
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

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 70px;
  resize: none;
  color: var(--fontPrimaryColor);
  background-color: var(--inputPrimaryColor);
  border: 1px solid var(--borderPrimaryColor);
  border-radius: 3px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
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

  &[type="submit"] {
    background-color: var(--brandColor);
  }
`;
