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

export const stripTags = (html, allowed = []) => {
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const openingTag = /<([a-z][a-z0-9]*)\b[^>]*>/gi;

  const blockTextTags = ["br", "div", "p"];

  return html.replace(tags, (tag, tagName) => {
    const isOpeningTag = openingTag.test(tag);
    const isAllowed = allowed.includes(tagName.toLowerCase());

    if (isAllowed) {
      return tag;
    } else if (isOpeningTag && blockTextTags.includes(tagName)) {
      return "\n";
    }

    return "";
  });
};

export const urlify = (text) => {
  const urlRegex =
    /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  return text.replace(urlRegex, (url) => {
    const hasProtocol = /\:\/{2}/gi.test(url);
    const safeUrl = hasProtocol ? url : `http://${url}`;
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};
