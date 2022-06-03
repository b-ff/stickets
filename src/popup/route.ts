import { NotesContainer } from './containers/NotesContainer';
import { NotFound } from '../common/containers/NotFound.jsx';
import { PAGE_QUERY_PARAM_NAME } from '../common/constants/page-query-param-name';
import { ROUTES } from './constants/routes';

export const PAGES = {
  [ROUTES.NOTES]: {
    title: 'Notes',
    component: NotesContainer,
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
