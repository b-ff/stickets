import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { AppLink } from '../../common/components/AppLink';
import { ContentCenter } from '../components/ContentCenter';
import { Routes } from '../enums/Routes';

export const PageSettings: FC<HTMLAttributes<HTMLElement>> = (props): ReactElement => (
  <ContentCenter {...props}>
    <p>Sorry. Settings page is currently under development.</p>
    <br />
    <AppLink to={Routes.Notes}>Back</AppLink>
  </ContentCenter>
);
