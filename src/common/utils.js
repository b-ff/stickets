import { NOTE_SCOPES } from "./constants/note-scopes";
import { PAGE_QUERY_PARAM_NAME } from "./constants/page-query-param-name";

export const noop = () => {};

export const applyStyleIfHasProperty =
  (propertyName, css, otherwise = "inherit") =>
  (props) =>
    props[propertyName] ? css : otherwise;

export const makeHrefToPage = (urlSearchParams, page, params) => {
  const p = new URLSearchParams(urlSearchParams);
  p.set(PAGE_QUERY_PARAM_NAME, page);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      p.set(key, value);
    });
  }

  return location.pathname + "?" + p.toString();
};

export const groupNotesByScope = (notes, location) => {
  const groupedNotes = {
    [NOTE_SCOPES.GLOBAL]: [],
    [NOTE_SCOPES.SITE]: [],
    [NOTE_SCOPES.PAGE]: [],
  };

  notes.forEach((note) => {
    if (note.scope === NOTE_SCOPES.GLOBAL) {
      groupedNotes[NOTE_SCOPES.GLOBAL].push(note);
    }

    if (
      note.scope === NOTE_SCOPES.SITE &&
      note.url.includes(location?.origin)
    ) {
      groupedNotes[NOTE_SCOPES.SITE].push(note);
    }

    if (note.scope === NOTE_SCOPES.PAGE && note.url === location?.href) {
      groupedNotes[NOTE_SCOPES.PAGE].push(note);
    }
  });

  return groupedNotes;
};
