# Skitscript Interpreter (NodeJS) [![Continuous Integration](https://github.com/skitscript/interpreter-nodejs/workflows/Continuous%20Integration/badge.svg)](https://github.com/skitscript/interpreter-nodejs/actions) [![License](https://img.shields.io/github/license/skitscript/interpreter-nodejs.svg)](https://github.com/skitscript/interpreter-nodejs/blob/master/license) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@skitscript/interpreter-nodejs.svg)](https://www.npmjs.com/package/@skitscript/interpreter-nodejs) [![npm type definitions](https://img.shields.io/npm/types/@skitscript/interpreter-nodejs.svg)](https://www.npmjs.com/package/@skitscript/interpreter-nodejs)

A Skitscript document interpreter targeting NodeJS.

## Installation

### Dependencies

This is a NPM package.  It targets NodeJS 20.14.0 or newer on the following
operating systems:

- Ubuntu 22.04
- Ubuntu 20.04
- macOS 13 (Ventura)
- macOS 12 (Monterey)
- Windows Server 2022
- Windows Server 2019

It is likely also possible to use this package as part of a web browser
application through tools such as [webpack](https://webpack.js.org/).  This has
not been tested, however.

### Install as a runtime dependency

If your application uses this as a runtime dependency, install it like any other
NPM package:

```bash
npm install --save @skitscript/interpreter-nodejs
```

### Install as a development dependency

If this is used when building your application and not at runtime, install it as
a development dependency:

```bash
npm install --save-dev @skitscript/interpreter-nodejs
```

## Usage

### Parsing documents

Import the `start` function, and provide it with a parsed document to receive
the information to present to the user:

```typescript
import { start } from "@skitscript/interpreter-nodejs";

const state = start(parsedDocument);

console.log(state);
```

```json
{
  "type": "valid",
  "flagsSet": [...],
  "characters": [...],
  "speakers": [...],
  "background": null,
  "line": null,
  "interaction": {...}
}
```

When they determine how to proceed, import the `resume` function and provide
details regarding what was selected to receive a next piece of information to
present to the user:

```typescript
import { resume } from "@skitscript/interpreter-nodejs";

const nextState = resume(
  parsedDocument,
  previousState,
  previousState.interaction.instructionIndex
);

console.log(nextState);
```

```json
{
  "type": "valid",
  "flagsSet": [...],
  "characters": [...],
  "speakers": [...],
  "background": null,
  "line": null,
  "interaction": {...}
}
```

### Types

A comprehensive library of types representing the results of attempting to
interpret parsed documents can be imported:

```typescript
import { InterpreterState } from "@skitscript/interpreter-nodejs";
```

#### States

- [InterpreterState](./InterpreterState/index.ts)
- [InterpreterStateRun](./InterpreterStateRun/index.ts)
- [InvalidInterpreterState](./InvalidInterpreterState/index.ts)
- [ValidInterpreterState](./ValidInterpreterState/index.ts)

##### Characters

- [EnteringInterpreterStateCharacterState](./EnteringInterpreterStateCharacterState/index.ts)
- [ExitingInterpreterStateCharacterState](./ExitingInterpreterStateCharacterState/index.ts)
- [InterpreterStateCharacter](./InterpreterStateCharacter/index.ts)
- [InterpreterStateCharacterState](./InterpreterStateCharacterState/index.ts)
- [NotPresentInterpreterStateCharacterState](./NotPresentInterpreterStateCharacterState/index.ts)
- [PresentInterpreterStateCharacterState](./PresentInterpreterStateCharacterState/index.ts)

##### Interactions

- [DismissInterpreterStateInteraction](./DismissInterpreterStateInteraction/index.ts)
- [InterpreterStateInteraction](./InterpreterStateInteraction/index.ts)
- [MenuInterpreterStateInteraction](./MenuInterpreterStateInteraction/index.ts)
- [MenuInterpreterStateInteractionOption](./MenuInterpreterStateInteractionOption/index.ts)

#### Errors

- [InfiniteLoopInterpreterStateError](./InfiniteLoopInterpreterStateError/index.ts)
- [InterpreterStateError](./InterpreterStateError/index.ts)
