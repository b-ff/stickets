import { styled } from '@linaria/react';
import React, {
  ChangeEventHandler,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useState,
  FC,
  FormEventHandler,
} from 'react';
import { Note, NoteUser } from '../../common/graphql/__generated__/graphql';
import { Button } from './Button';
import { applyStyleIfHasProperty } from '../../common/utils';
import { Profile } from './Profile';
import { IconClose } from '../icons/IconClose';

type SharePopupProps = HTMLAttributes<HTMLElement> & {
  note: Note | null;
  onShare: (id: string, email: string) => void;
  onDeshare: (id: string, email: string) => void;
  onClose: () => void;
};

type ElementWithIsShownProps = HTMLAttributes<HTMLElement> & {
  isShown: boolean;
};

export const SharePopup: FC<SharePopupProps> = ({
  note = null,
  onShare,
  onDeshare,
  onClose,
  ...props
}): ReactElement => {
  const [disabled, setDisabled] = useState(true);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const target = event.target as HTMLInputElement;
      const sanitizedValue = target.value.toLocaleLowerCase().trim();
      const existingEmails = (note?.sharedWith || []).map((profile) =>
        profile ? profile.email?.toLocaleLowerCase() : null,
      );
      const isExistingEmail = existingEmails.includes(sanitizedValue);

      setDisabled(!target.validity.valid || isExistingEmail);
    },
    [note, setDisabled],
  );

  const handleSubmit: FormEventHandler = useCallback(
    (event) => {
      const formData = Object.fromEntries(
        new FormData(event.target as HTMLFormElement) as any,
      );

      if (note) {
        onShare(note?._id, formData.email);
      }

      (event.target as HTMLFormElement).reset();
      event.preventDefault();
      event.stopPropagation();
    },
    [note, onShare],
  );

  const handleDeshare = useCallback(
    (email: string): void => {
      onDeshare(note?._id as string, email);
    },
    [note, onDeshare],
  );

  return (
    <>
      <StyledSharePopupOverlay isShown={!!note?._id} onClick={onClose} />
      <StyledSharePopup isShown={!!note?._id} {...props}>
        {Boolean(note?._id) && (
          <StyledControlRow onSubmit={handleSubmit}>
            <StyledInput
              type="email"
              name="email"
              placeholder="Add email"
              onChange={handleInputChange}
              required
            />
            <StyledButton type="submit" disabled={disabled}>
              Share
            </StyledButton>
          </StyledControlRow>
        )}
        {Boolean(note?.sharedWith?.length) && (
          <StyledProfilesList>
            {note?.sharedWith?.map((profile) => (
              <StyledProfilesListItem key={profile?._id}>
                <StyledProfile profile={profile as NoteUser} />
                <StyledIconClose
                  onClick={() => handleDeshare(profile?.email as string)}
                />
              </StyledProfilesListItem>
            ))}
          </StyledProfilesList>
        )}
      </StyledSharePopup>
    </>
  );
};

const StyledSharePopupOverlay = styled.section<ElementWithIsShownProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  background-color: var(--backgroundPrimaryColor);
  opacity: ${applyStyleIfHasProperty('isShown', '0.25', '0')};
  pointer-events: ${applyStyleIfHasProperty('isShown', 'initial', 'none')};
  transition: opacity 0.1s ease-in-out;
  z-index: 10;
`;

const StyledSharePopup = styled.section<ElementWithIsShownProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 455px;
  height: auto;
  padding: var(--fontBigSize);
  background-color: var(--backgroundPrimaryColor);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.45);
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: ${applyStyleIfHasProperty('isShown', '0', '-50px')};
  opacity: ${applyStyleIfHasProperty('isShown', '1', '0')};
  pointer-events: ${applyStyleIfHasProperty('isShown', 'initial', 'none')};
  transition: all 0.1s ease-in-out;
  z-index: 11;
`;

const StyledControlRow = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0 var(--fontBigSize);
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  line-height: 36px;
  color: var(--textPrimaryColor);
  background-color: var(--backgroundPrimaryColor);
  border: 1px solid var(--controlPrimaryColor);
  border-radius: calc(var(--fontBigSize) / 2) 0 0 calc(var(--fontBigSize) / 2);
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    font-family: 'Helvetica';
    font-size: var(--fontRegularSize);
    color: var(--textTertiaryColor);
  }
`;

const StyledButton = styled<any>(Button)`
  line-height: 36px;
  padding: 0 var(--fontBigSize);
  border-radius: 0 calc(var(--fontBigSize) / 2) calc(var(--fontBigSize) / 2) 0;
  border: 1px solid var(--controlPrimaryColor);
  border-left: none;
`;

const StyledProfilesList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: var(--fontBigSize) 0 0;
  list-style: none;
  box-sizing: border-box;
`;

const StyledProfilesListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledProfile = styled(Profile)`
  margin-bottom: 4px;

  & .profile__avatar {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  & .profile__info {
  }

  & .profile__name {
    font-size: var(--fontRegularSize);
  }

  & .profile__email {
    font-size: var(--fontSmallSize);
  }
`;

const StyledIconClose = styled(IconClose)`
  width: 20px;
  height: 20px;
  stroke: var(--textTertiaryColor);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    stroke: var(--iconPrimaryColor);
    transform: rotate(180deg);
  }
`;
