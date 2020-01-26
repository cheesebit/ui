import { compact, compose } from "../../common/toolset";
import { DEFAULT } from "../../common/constants";
import { INSECURE_HREF, TARGETS, RELS } from "./constants";

const checkHref = props => {
  const { href, ...others } = props;

  if (!href) {
    return props;
  }

  if (INSECURE_HREF.test(`${href}`)) {
    // security risk, thus, removing it
    return others;
  }

  return props;
};

const checkTarget = props => {
  let changes = {};
  const { target, rel } = props;

  if (!target) {
    return props;
  }

  const sanitizedRel = new Set(compact((rel || DEFAULT.STRING).split(/\s+/)));

  /**
   * To avoid exploitation of the window.opener API, Adding noreferrer,
   * as recommended in https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  sanitizedRel.add(RELS.NOREFERRER);

  if (target === TARGETS.BLANK) {
    sanitizedRel.add(RELS.NOOPENER);
  }

  changes = { rel: Array.from(sanitizedRel).join(" ") };

  return { ...props, ...changes };
};

export const sanitizeProps = props => {
  return compose(checkTarget, checkHref)(props);
};
