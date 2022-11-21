# spotprice

Get spot prices from Nordpool. Works in Node, Deno and Bun.

> **Note** This works great, but it is in no way an official way of fetching data from Nordpool. See this as a proof of concept.

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

> **Note** Only default export is available in Node.js TypeScript, as the commonjs module is used internally.

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

// Get spot prices today
const result = await spotprice("hourly", "SE2", "SEK", new Date());

/* 
  To get yesterday, today and tomorrow in one go:

  const
    oneDayMs = 24 * 3600 * 1000,
    result = [
        ...await spotprice("hourly", config.area, config.currency, new Date(new Date().getTime() - oneDayMs)),
        ...await spotprice("hourly", config.area, config.currency, new Date()),
        ...await spotprice("hourly", config.area, config.currency, new Date(new Date().getTime() + oneDayMs)),
    ];
*/

console.table(result);

/* 

Output (example data):

┌─────────┬──────────────────────────┬──────────────────────────┬──────────┬───────────┬───────────┐
│ (index) │        startTime         │         endTime          │ areaCode │ spotPrice │   unit    │
├─────────┼──────────────────────────┼──────────────────────────┼──────────┼───────────┼───────────┤
│    0    │ 2022-11-19T23:00:00.000Z │ 2022-11-21T00:00:00.000Z │  'SE4'   │  1394.85  │ 'SEK/MWh' │
│    1    │ 2022-11-20T00:00:00.000Z │ 2022-11-21T01:00:00.000Z │  'SE4'   │  1395.06  │ 'SEK/MWh' │
│    2    │ 2022-11-20T01:00:00.000Z │ 2022-11-21T02:00:00.000Z │  'SE4'   │  1492.11  │ 'SEK/MWh' │
│    3    │ 2022-11-20T02:00:00.000Z │ 2022-11-21T03:00:00.000Z │  'SE4'   │  1443.97  │ 'SEK/MWh' │
│    4    │ 2022-11-20T03:00:00.000Z │ 2022-11-21T04:00:00.000Z │  'SE4'   │  1548.6   │ 'SEK/MWh' │
│    5    │ 2022-11-20T04:00:00.000Z │ 2022-11-21T05:00:00.000Z │  'SE4'   │  1708.96  │ 'SEK/MWh' │
│    6    │ 2022-11-20T05:00:00.000Z │ 2022-11-21T06:00:00.000Z │  'SE4'   │  2871.89  │ 'SEK/MWh' │

[...]

```

### Full API

Todo ...

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT