import React from "react";

import { Link } from "./index";
import { findByTestAttr, asTestAttr } from "../../../test/helpers";
import { RELS, TARGETS } from "./constants";
import { values } from "../../common/toolset";
import generator from "../../../test/data-generator";

describe("Link", () => {
  describe("default", () => {
    const props = {
      href: generator.url(),
      alt: generator.sentence(),
      title: generator.sentence(),
      children: generator.word(),
      target: generator.pick(values(TARGETS))
    };

    const wrapper = shallow(<Link {...props} />);
    const component = findByTestAttr(wrapper, "c-link");

    it("renders correctly", () => {
      expect(component).to.have.length(1);
      expect(component).to.have.prop("href", props.href);
      expect(component).to.have.prop("alt", props.alt);
      expect(component).to.have.prop("title", props.title);
      expect(component.text()).to.equal(props.children);
    });

    it(`adds ${RELS.NOREFERRER} to anchor element rel attribute`, () => {
      expect(component)
        .to.have.prop("rel")
        .to.contain(RELS.NOREFERRER);
    });

    it("sets aria-label as the provided alt prop", () => {
      expect(component).to.have.prop("aria-label", props.alt);
    });
  });

  describe("with sanitized props", () => {
    const props = {
      href: "javascript:copySecureData()",
      alt: generator.sentence(),
      children: generator.word(),
      target: TARGETS.BLANK
    };

    const wrapper = shallow(<Link {...props} />);
    const component = findByTestAttr(wrapper, "c-link");

    it("removes the insecure href prop", () => {
      expect(component).to.not.have.prop("href");
    });

    it(`adds ${RELS.NOOPENER} to anchor element rel attribute, due to the target ${TARGETS.BLANK}`, () => {
      expect(component)
        .to.have.prop("rel")
        .to.contain(RELS.NOOPENER);
    });
  });
});
