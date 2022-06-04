import React, { FC, HTMLAttributes, ReactElement, useMemo } from 'react';
import { ColumnTabs } from '../components/ColumnTabs';

export const PageNotes: FC<HTMLAttributes<HTMLElement>> = (): ReactElement => {
  const tabs = useMemo(
    () => [
      {
        title: 'Notes on this page',
        badge: <span>1</span>,
        tab: <section>Notes on this page</section>,
      },
      {
        title: 'Notes on this website',
        badge: <span>4</span>,
        tab: <section>Notes on this website</section>,
      },
      {
        title: 'Notes visisble everywhere',
        badge: <span>12</span>,
        tab: <section>Notes visisble everywhere</section>,
      },
      {
        title: 'All notes',
        badge: <span>17</span>,
        tab: <section>All notes</section>,
      },
    ],
    [],
  );
  return <ColumnTabs header="header" footer="footer" tabs={tabs} />;
};
