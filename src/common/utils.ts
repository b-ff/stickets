import { ApolloError } from '@apollo/client';
import DOMPurify from 'dompurify';
import { NotesSortTypes } from '../popup/enums/NotesSortTypes';
import { PAGE_QUERY_PARAM_NAME } from './constants/page-query-param-name';
import { Note, NoteScope } from './graphql/__generated__/graphql';

declare type TNotesGroupedByScope = {
  [key in NoteScope]: Note[];
};

export const noop = (): void => {};

/* eslint-disable */
export const applyStyleIfHasProperty =
  <T>(propertyName: keyof T, css: string, otherwise = 'inherit') =>
  (props: T): string =>
    props[propertyName] ? css : otherwise;
/* eslint-enable */

export const makeHrefToPage = (
  urlSearchParams: URLSearchParams,
  page: string,
  params?: { [key: string]: string },
): string => {
  const p = new URLSearchParams(urlSearchParams);
  p.set(PAGE_QUERY_PARAM_NAME, page);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      p.set(key, value);
    });
  }

  return `${window.location.pathname}?${p.toString()}`;
};

export const groupNotesByScope = (
  notes: Note[],
  location?: URL | null,
): TNotesGroupedByScope => {
  const groupedNotes: TNotesGroupedByScope = {
    [NoteScope.Global]: [],
    [NoteScope.Site]: [],
    [NoteScope.Page]: [],
  };

  notes.forEach((note) => {
    if (note.scope === NoteScope.Global) {
      groupedNotes[NoteScope.Global].push(note);
    }

    if (note.scope === NoteScope.Site && location && note.url.includes(location.origin)) {
      groupedNotes[NoteScope.Site].push(note);
    }

    if (note.scope === NoteScope.Page && location && note.url === location.href) {
      groupedNotes[NoteScope.Page].push(note);
    }
  });

  return groupedNotes;
};

export const stripTags = (html: string, allowed: string[] = []): string => {
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const openingTag = /<([a-z][a-z0-9]*)\b[^>]*>/gi;

  const blockTextTags = ['br', 'div', 'p'];

  return html.replace(tags, (tag, tagName) => {
    const isOpeningTag = openingTag.test(tag);
    const isAllowed = allowed.includes(tagName.toLowerCase());

    if (isAllowed) {
      return tag;
    }
    if (isOpeningTag && blockTextTags.includes(tagName)) {
      return '\n';
    }

    return '';
  });
};

/* eslint-disable */
export const urlify = (text: string): string => {
  const urlRegex =
    /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  const html = text.replace(urlRegex, (url: string) => {
    const hasProtocol = /\:\/{2}/gi.test(url);
    const safeUrl = hasProtocol ? url : `http://${url}`;
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'],
  });
};
/* eslint-enable */

export const getCSSVariablesDefinitionFromTheme = (themeColors: IThemeColors): string => {
  const colorEntries = Object.entries(themeColors) as [keyof IThemeColors, string][];

  return colorEntries
    .map(([name, value]: [keyof IThemeColors, string]): string => `--${name}: ${value};`)
    .join(' ');
};

export const throwIfError = (...errors: Array<Error | ApolloError | undefined>): void => {
  errors.map((error) => {
    if (error) {
      throw error;
    }
  });
};

export const setEndOfContenteditable = (contentEditableElement: HTMLElement) => {
  let range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection?.removeAllRanges(); //remove any selections already made
    selection?.addRange(range); //make the range you have just created the visible selection
  } else if ((document as Document & { selection: any }).selection) {
    //IE 8 and lower
    range = (
      document.body as HTMLElement & { createTextRange: () => any }
    ).createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
};

export const sortNotes = (notes: Note[], sortType: NotesSortTypes): Note[] => {
  return notes.sort((a: Note, b: Note): number => {
    let valueA: number | string = '';
    let valueB: number | string = '';

    if (sortType === NotesSortTypes.Latest) {
      [valueA, valueB] = [b, a].map(({ updatedAt }) => new Date(updatedAt).getTime());
    }

    if (sortType === NotesSortTypes.Oldest) {
      [valueA, valueB] = [a, b].map(({ updatedAt }) => new Date(updatedAt).getTime());
    }

    if (sortType === NotesSortTypes.AZText) {
      [valueA, valueB] = [a, b].map(({ note }) => note);
    }

    if (sortType === NotesSortTypes.ZAText) {
      [valueA, valueB] = [b, a].map(({ note }) => note);
    }

    if (sortType === NotesSortTypes.My) {
      [valueA, valueB] = [a, b].map(({ shared }) => (shared ? 1 : 0));
    }

    if (sortType === NotesSortTypes.SharedWithMe) {
      [valueA, valueB] = [a, b].map(({ shared }) => (shared ? 0 : 1));
    }

    if (sortType === NotesSortTypes.SharedByMe) {
      [valueA, valueB] = [a, b].map(({ shared, sharedWith }) =>
        !shared && sharedWith?.length ? 0 : 1,
      );
    }

    if (sortType === NotesSortTypes.NotShared) {
      [valueA, valueB] = [a, b].map(({ shared, sharedWith }) =>
        shared || sharedWith?.length ? 1 : 0,
      );
    }

    return valueA > valueB ? 1 : valueA === valueB ? 0 : -1;
  });
};
