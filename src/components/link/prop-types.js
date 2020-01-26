import PropTypes from "prop-types";

import { TARGETS } from "./constants";
import { values } from "../../utils/utilities";

export const LinkPropTypes = {
  alt: PropTypes.string.isRequired,
  download: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.oneOf(values(TARGETS))
};
