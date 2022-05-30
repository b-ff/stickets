import React, { useCallback } from "react";
import { styled } from "@linaria/react";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { NOTE_SCOPES } from "../../common/constants/note-scopes";
import { noop } from "../../common/utils";

const SCOPE_OPTIONS = {
  [NOTE_SCOPES.GLOBAL]: "All web-sites",
  [NOTE_SCOPES.SITE]: "This web-site {host}",
  [NOTE_SCOPES.PAGE]: "Current page only",
};

export function AddNoteForm({ onSubmit = noop }) {
  const location = useCurrentLocation();

  const handleSubmit = useCallback((event) => {
    const formData = Object.fromEntries(new FormData(event.target));
    onSubmit(formData);
    event.preventDefault();
    event.target.reset();
  }, []);

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
        <StyledTextarea name="note" placeholder="Your note..."></StyledTextarea>
      </StyledFormRow>
      <StyledFormRow>
        <StyledButton type="reset">Reset</StyledButton>
        <StyledButton type="submit">Add note</StyledButton>
      </StyledFormRow>
    </StyledForm>
  );
}

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
