const { toggleStringClassPropertyDefinite } = require("./index");

test(`should remove class property definite assignment assertion for "foo"`, () => {
  const source = `
  class A {
    foo!: string;
    bar!: number;
  }`;

  const expected = `
  class A {
    foo: string;
    bar!: number;
  }`;

  const patched = toggleStringClassPropertyDefinite(source, {
    targetIdentifierName: "foo",
  });
  expect(patched).toBe(expected);
});

test(`should add class property definite assignment assertion for "foo`, () => {
  const source = `
  class A {
    foo: string;
    bar: number;
  }`;

  const expected = `
  class A {
    foo!: string;
    bar: number;
  }`;

  const patched = toggleStringClassPropertyDefinite(source, {
    targetIdentifierName: "foo",
  });
  expect(patched).toBe(expected);
});
