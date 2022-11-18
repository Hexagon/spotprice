# spotprice

Get spot prices from Nordpool. Works in Node, Deno and Bun.

NOTE: THIS IS WORK IN PROGRESS.

NOTE: This works, but it is not allowed by Nordpool terms of usage to fetch data using this method. This as a proof of concept.

[![Node.js CI](https://github.com/Hexagon/spotprice/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/spotprice/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/spotprice/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/spotprice/actions/workflows/deno.yml) [![Bun CI](https://github.com/Hexagon/spotprice/actions/workflows/bun.yaml/badge.svg)](https://github.com/Hexagon/spotprice/actions/workflows/bun.yaml)
[![npm version](https://badge.fury.io/js/spotprice.svg)](https://badge.fury.io/js/spotprice) [![NPM Downloads](https://img.shields.io/npm/dm/spotprice.svg)](https://www.npmjs.org/package/spotprice) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/spotprice/badge?style=rounded)](https://www.jsdelivr.com/package/npm/spotprice) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/spotprice/blob/master/LICENSE) 

*   Works in Node.js >=18.0 (both require and import)
*   Works in Deno >=1.16
*   Works in Bun >=0.2.2
*   Supports both CommonJS, UMD and ESM
*   Includes [TypeScript](https://www.typescriptlang.org/) typings

## Installation

### Node.js

```npm install spotprice --save```

JavaScript

```javascript
// ESM Import ...
import spotprice from "spotprice";

// ... or CommonJS Require
const spotprice = require("spotprice");
```

TypeScript

*Note that only default export is available in Node.js TypeScript, as the commonjs module is used internally.*

```typescript
import spotprice from "spotprice";

// ...
```

### Bun

```bun add spotprice```

> **Note** If you experience problems during install, try using `bun add spotprice --backend=copyfile`.

```javascript
import spotprice from "spotprice";

// ...
```

### Deno

JavaScript

```javascript
import spotprice from "https://deno.land/x/spotprice@0.0.3/dist/spotprice.min.mjs";

// ...
```

TypeScript

```typescript
import { spotprice } from "https://deno.land/x/spotprice@0.0.3/dist/spotprice.min.mjs";

// ...
```

## Documentation

Full documentation available at [hexagon.github.io/spotprice](https://hexagon.github.io/spotprice/).

### Examples

Assuming you have imported spotprice as described under 'Installation'.

```javascript
// Import using the right method for your runtime
// according to the 'Installation'-section of the README
// This example is for Node/Bun using EMS import
import { spotprice } from "spotprice";

// Will throw on error
const result = await spotprice("hourly", "SE2", "SEK", "17-11-2022");

console.table(result);

/* 

Output:

┌─────────┬───────────────────────┬──────────┬───────────┬───────────┐
│ (index) │       startTime       │ areaCode │ spotPrice │   unit    │
├─────────┼───────────────────────┼──────────┼───────────┼───────────┤
│    0    │ '2020-01-17T00:00:00' │  'SE2'   │ '395,26'  │ 'SEK/MWh' │
│    1    │ '2020-01-17T01:00:00' │  'SE2'   │ '259,96'  │ 'SEK/MWh' │
│    2    │ '2020-01-17T02:00:00' │  'SE2'   │ '184,42'  │ 'SEK/MWh' │
│    3    │ '2020-01-17T03:00:00' │  'SE2'   │ '159,32'  │ 'SEK/MWh' │
│    4    │ '2020-01-17T04:00:00' │  'SE2'   │ '159,97'  │ 'SEK/MWh' │

[...]

```

### Full API

Todo ...

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT