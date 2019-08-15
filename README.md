# io-ts-playground
A playground for defining io-ts types and how they should be consumed the the SCB and Plutus clients

## Details

The current generated io-ts definitions are in `src/examples/current-playground.ts`

Proposed changes to the definitions are in `src/examples/proposed.ts`

An example of consuming the proposed changes are in `src/index.ts`. To run the example, `npm i && npm start` 

The changes have been proposed for these reasons:
1. The current definitions do not explicitly declare the endpoints for consumption from a pure JS context, nor do they provide a way to validate arguments from JS directly. By explicitly declaring and exporting the `endpoints`, that is overcome
2. Wrapping the endpoint arguments into a single io-ts type (i.e `({a,b,c}) vs (a, b, c)`), makes it significantly easy to validate the arguments and generate the AST from io-ts

The proposed changes allow the io-ts generation to remain in Typescript, but once compiled into a JS, with associated .d.ts file for TS consumers, the JS can be readily consumed at runtime for validation and AST descriptions (potentially for dynamic UIs), while the TS can be used for developers writing typesafe applications that will consume a known contract definition.

## Other questions / comments

1. Use t.number instead of t.Int
2. Is there a way we can key the arguments by something more human friendly than a, b, c, d etc?