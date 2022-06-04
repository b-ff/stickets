import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { AppLink } from '../../common/components/AppLink';
import { ContentCenter } from '../components/ContentCenter';
import { ROUTES } from '../constants/routes';

export const PageSettings: FC<HTMLAttributes<HTMLElement>> = (props): ReactElement => (
  <ContentCenter {...props}>
    <p>Settings Page</p>
    <br />
    <AppLink to={ROUTES.NOTES}>Back</AppLink>
  </ContentCenter>
);
