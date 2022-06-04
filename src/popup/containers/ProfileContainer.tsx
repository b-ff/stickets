import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { useGetProfileQuery } from '../../common/graphql/__generated__/graphql';
import { throwIfError } from '../../common/utils';
import { Avatar } from '../components/Avatar';

export const ProfileContainer: FC<HTMLAttributes<HTMLElement>> = (
  props,
): ReactElement => {
  const { data, loading, error } = useGetProfileQuery();
  const { avatar, name, email } = data?.profile || {};

  throwIfError(error);

  return (
    <StyledProfileContainer {...props}>
      <StyledAvatar src={avatar as string} name={name} />
      <StyledProfileInfo>
        <StyledProfileName>{loading ? 'Loading...' : name}</StyledProfileName>
        <StyledProfileEmail>{email}</StyledProfileEmail>
      </StyledProfileInfo>
    </StyledProfileContainer>
  );
};

const StyledProfileContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--fontBigSize);
  padding-top: calc(var(--fontBigSize) * 2);
`;

const StyledAvatar = styled(Avatar)`
  width: 56px;
  height: 56px;
  margin-right: var(--fontSmallSize);
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
