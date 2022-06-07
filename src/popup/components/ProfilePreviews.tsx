import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement, useMemo } from 'react';
import { NoteUser } from '../../common/graphql/__generated__/graphql';
import { Avatar } from './Avatar';

type ProfilePreviewsProps = HTMLAttributes<HTMLUListElement> & {
  profiles: NoteUser[];
  limit?: number;
};

export const ProfilePreviews: FC<ProfilePreviewsProps> = ({
  profiles,
  limit = 0,
  className,
  ...props
}): ReactElement => {
  const profilesToShow = useMemo(
    () => (limit ? [...profiles].slice(0, limit) : profiles),
    [profiles, limit],
  );

  return (
    <StyledProfilesList
      className={['profile-previews', className].filter((c) => !!c).join(' ')}
      {...props}
    >
      {profilesToShow.map((profile) => (
        <StyledProfilesListItem
          key={profile._id}
          title={`${profile.name} | ${profile.email}`}
          className="profile-previews__item"
        >
          <Avatar src={profile.avatar as string} name={profile.name as string} />
        </StyledProfilesListItem>
      ))}
      {Boolean(limit) && profiles.length > limit && (
        <StyledCounter className="profile-previews__counter">
          +{profiles.length - limit}
        </StyledCounter>
      )}
    </StyledProfilesList>
  );
};

const StyledProfilesList = styled.ul`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledProfilesListItem = styled.li`
  min-width: var(--fontRegularSize);
  min-height: var(--fontRegularSize);
  width: var(--fontRegularSize);
  height: var(--fontRegularSize);
  font-size: var(--fontSmallSize);
  line-height: var(--fontRegularSize);
  margin-right: 4px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledCounter = styled.span`
  display: inline-block;
  min-width: var(--fontRegularSize);
  padding: 0 5px;
  margin-left: 4px;
  font-size: var(--fontSmallSize);
  line-height: var(--fontRegularSize);
  border-radius: calc(var(--fontRegularSize) / 2);
  color: var(--textSecondaryColor);
  background-color: var(--textTertiaryColor);
  box-sizing: border-box;
`;
