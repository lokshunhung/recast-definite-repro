# recast-definite-repro

## Problem

`recast` with `recast/parser/typescript` can remove [definite assignment assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions) for class properties by setting `ClassProperty.definite = false` (originally `true`)

```ts
// Before
class A {
  foo!: string;
}

// After
class A {
  foo: string;
}
```

but cannot add definite assignment assertions for class properties by setting `ClassProperty.definite = true` (originally `undefined`)

```ts
// Before
class A {
  foo: string;
}

// After
class A {
  foo: string;
}

// should be `foo!: string;`
```

## Reproducing

1.  Clone this repo

2.  Run `yarn install`

3.  Run `yarn run test`

4.  Test fails with the following error:

    ```
     FAIL  src/index.test.js
      ✓ should remove class property definite assignment assertion for "foo" (20 ms)
      ✕ should add class property definite assignment assertion for "foo (5 ms)
    
      ● should add class property definite assignment assertion for "foo
    
        expect(received).toBe(expected) // Object.is equality
    
        - Expected  - 1
        + Received  + 1
    
          ↵
            class A {
        -     foo!: string;
        +     foo: string;
              bar: number;
            }
    
          36 |     targetIdentifierName: "foo",
          37 |   });
        > 38 |   expect(patched).toBe(expected);
             |                   ^
          39 | });
          40 |
    
          at Object.<anonymous> (src/index.test.js:38:19)
    ```
