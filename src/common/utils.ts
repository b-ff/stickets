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

export const groupNotesByScope = (notes: Note[], location?: URL | null): TNotesGroupedByScope => {
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

export const urlify = (text: string): string => {
  const urlRegex =
    /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  return text.replace(urlRegex, (url: string) => {
    const hasProtocol = /\:\/{2}/gi.test(url);
    const safeUrl = hasProtocol ? url : `http://${url}`;
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};
