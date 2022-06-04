import { NotFound } from '../common/containers/NotFound';
import { PAGE_QUERY_PARAM_NAME } from '../common/constants/page-query-param-name';
import { ROUTES } from './constants/routes';
import { PageSettings } from './pages/PageSettings';
import { PageNotes } from './pages/PageNotes';

export const PAGES = {
  [ROUTES.NOTES]: {
    title: 'Notes',
    component: PageNotes,
  },
  [ROUTES.SETTINGS]: {
    title: 'Settins',
    component: PageSettings,
  },
  [ROUTES.NOT_FOUND]: {
    title: 'Not Found',
    component: NotFound,
  },
};

export const calcCurrentPage = (urlSearchParams: URLSearchParams) => {
  const page = urlSearchParams.get(PAGE_QUERY_PARAM_NAME);

  if (!page) {
    return PAGES[ROUTES.DEFAULT];
  }

  return PAGES[page] || PAGES[ROUTES.NOT_FOUND];
};

export default PAGES;
