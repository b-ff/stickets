import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { ContentCenter } from '../components/ContentCenter';

export const NotesContainer: FC<HTMLAttributes<HTMLElement>> = (props): ReactElement => {
  console.log('NotesContainer');

  return <ContentCenter {...props}>Notes Container</ContentCenter>;
};
