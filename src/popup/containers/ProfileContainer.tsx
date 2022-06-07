import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { NoteUser, useGetProfileQuery } from '../../common/graphql/__generated__/graphql';
import { throwIfError } from '../../common/utils';
import { Profile } from '../components/Profile';

export const ProfileContainer: FC<HTMLAttributes<HTMLElement>> = (
  props,
): ReactElement => {
  const { data, loading, error } = useGetProfileQuery();
  throwIfError(error);
  return <StyledProfile isLoading={loading} profile={data?.profile as NoteUser} />;
};

const StyledProfile = styled(Profile)`
  padding: var(--fontBigSize);
  padding-top: calc(var(--fontBigSize) * 2);
`;
