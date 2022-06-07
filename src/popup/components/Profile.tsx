import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { NoteUser } from '../../common/graphql/__generated__/graphql';
import { Avatar } from './Avatar';

type ProfileProps = HTMLAttributes<HTMLElement> & {
  isLoading?: boolean;
  profile?: NoteUser;
};

export const Profile: FC<ProfileProps> = ({
  isLoading = false,
  profile = {},
  className,
  ...props
}): ReactElement => {
  const { name, email, avatar } = profile;

  return (
    <StyledProfileContainer
      className={['profile', className].filter((c) => !!c).join(' ')}
      {...props}
    >
      <StyledAvatar
        src={avatar as string}
        name={name as string}
        className="profile__avatar"
      />
      <StyledProfileInfo className="profile__info">
        <StyledProfileName className="profile__name">
          {isLoading ? 'Loading...' : name}
        </StyledProfileName>
        <StyledProfileEmail className="profile__email">{email}</StyledProfileEmail>
      </StyledProfileInfo>
    </StyledProfileContainer>
  );
};

const StyledProfileContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 56px;
  height: 56px;
  margin-right: var(--fontSmallSize);
  border: 1px solid var(--controlSecondaryColor);
`;

const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 20px;
`;

const StyledProfileName = styled.h3`
  font-size: var(--fontBigSize);
`;

const StyledProfileEmail = styled.p`
  color: var(--textSecondaryColor);
`;
