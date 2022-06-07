import { NotFound } from '../common/containers/NotFound';
import { PAGE_QUERY_PARAM_NAME } from '../common/constants/page-query-param-name';
import { Routes } from './enums/Routes';
import { PageSettings } from './pages/PageSettings';
import { PageNotes } from './pages/PageNotes';
import { FC } from 'react';

type CustomRoute = {
  title: string;
  component: FC<any>;
};

export const PAGES: { [key in Routes]: CustomRoute } = {
  [Routes.Notes]: {
    title: 'Notes',
    component: PageNotes,
  },
  [Routes.Settings]: {
    title: 'Settins',
    component: PageSettings,
  },
  [Routes.NotFound]: {
    title: 'Not Found',
    component: NotFound,
  },
};

export const calcCurrentPage = (urlSearchParams: URLSearchParams) => {
  const page = urlSearchParams.get(PAGE_QUERY_PARAM_NAME) as Routes;

  if (!page) {
    return PAGES[Routes.Default];
  }

  return PAGES[page] || PAGES[Routes.NotFound];
};

export default PAGES;
