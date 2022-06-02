import { NOTE_SCOPES } from "./constants/note-scopes";
import { PAGE_QUERY_PARAM_NAME } from "./constants/page-query-param-name";

export const noop = (): void => {};

export const applyStyleIfHasProperty =
  <ComponentProps>(
    propertyName: keyof ComponentProps,
    css: string,
    otherwise: string = "inherit"
  ): ((props: ComponentProps) => string) =>
  (props: ComponentProps): string =>
    props[propertyName] ? css : otherwise;

export const makeHrefToPage = (
  urlSearchParams: URLSearchParams,
  page: string,
  params: { [key: string]: string }
): string => {
  const p = new URLSearchParams(urlSearchParams);
  p.set(PAGE_QUERY_PARAM_NAME, page);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      p.set(key, value);
    });
  }

  return location.pathname + "?" + p.toString();
};

export const groupNotesByScope = (
  notes: INote[],
  location?: URL | null
): TNotesGroupedByScope => {
  const groupedNotes: TNotesGroupedByScope = {
    [Scope.Global]: [],
    [Scope.Site]: [],
    [Scope.Page]: [],
  };

  notes.forEach((note) => {
    if (note.scope === Scope.Global) {
      groupedNotes[Scope.Global].push(note);
    }

    if (
      note.scope === Scope.Site &&
      location &&
      note.url.includes(location.origin)
    ) {
      groupedNotes[Scope.Site].push(note);
    }

    if (note.scope === Scope.Page && location && note.url === location.href) {
      groupedNotes[Scope.Page].push(note);
    }
  });

  return groupedNotes;
};
