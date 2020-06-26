/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../character-component.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<character-component></character-component>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
