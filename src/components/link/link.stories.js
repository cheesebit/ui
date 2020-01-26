import React from "react";
import { withA11y } from "@storybook/addon-a11y";

import { Link } from "./index";
import { TARGETS } from "./constants";
import { values } from "../../common/toolset";
import generator from "../../../test/data-generator";

export default {
  title: "Components/Link",
  component: Link,
  decorators: [withA11y]
};

export const generic = () => (
  <Link
    href={generator.url()}
    alt={generator.sentence()}
    title={generator.sentence()}
    target={generator.pick(values(TARGETS))}
  >
    {generator.word()}
  </Link>
);

export const disabled = () => (
  <Link
    href={generator.url()}
    alt={generator.sentence()}
    title={generator.sentence()}
    target={generator.pick(values(TARGETS))}
    disabled
  >
    {generator.word()}
  </Link>
);
