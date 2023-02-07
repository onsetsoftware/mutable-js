# MutableJS

MutableJS is a zero-dependency library for mutating Javascript objects and arrays _in place_, where typically a new object or array would be created.

This is especially useful when working with [Automerge](https://automerge.org/) documents, where all changes are required to mutate the document in place.

## Installation

```bash
npm install @onsetsoftware/mutable-js
```

## Functions

### Deduplicate

Removes duplicate values from an array.

```typescript
import { deduplicate } from '@onsetsoftware/mutable-js';

const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

deduplicate(arr); // => arr = [1, 2, 3, 4, 5]
```

### Filter

Removes values from an array that do not match a predicate.

```typescript
import { filter } from '@onsetsoftware/mutable-js';

const arr = [1, 2, 3, 4, 5];
filter(arr, (x) => x % 2 === 0); // => arr = [2, 4]
```

### Map

Applies a function to each value in an array.

```typescript
import { map } from '@onsetsoftware/mutable-js';

const arr = [1, 2, 3, 4, 5];
map(arr, (x) => x * 2); // => arr = [2, 4, 6, 8, 10]
```

### Move Within

There are 2 functions for moving values within an array.

#### moveWithin(items: T[], insertIndex: number, indices: number[])
Moves items within an array to a new position, in the **order defined by the indices**.

```typescript
import { moveWithin } from '@onsetsoftware/mutable-js';

const arr = ["a", "b", "c", "d", "e"];
const indices = [2, 4, 1];
moveWithin(arr, 0, indices); // => arr = ["c", "e", "b", "a", "d"]
```

#### moveWithinOrdered(items: T[], insertIndex: number, indices: number[])
Moves items within an array to a new position, keeping the order of the moved items in **original array order**, regardless of the order of the indices provided.

This is useful when (for example) a number of selections have been made in a list and the user wants to move them all to a new position, keeping them in the order of the original array

```typescript
import { moveWithinOrdered } from '@onsetsoftware/mutable-js';

const arr = ["a", "b", "c", "d", "e"];
const indices = [2, 4, 1];
moveWithinOrdered(arr, 0, indices); // => arr = ["b", "c", "e", "a", "d"]
```

### Entities
These are a set of mutable utilities for working with entities in an entity state:

```typescript
import { EntityState } from '@onsetsoftware/mutable-js';

const people: EntityState<{ id: string }> = {
  ids: ["id-1"],
  entities: {
    "id-1": {
      name: "John",
      age: 20,
      id: "id-1",
    },
  },
};
```
The `EntityState<T>` type is included for your convenience.

```typescript
export type EntityState<T extends { id: string }> = {
  ids: string[];
  entities: Record<string, T>;
};
```

#### addEntity
Adds an entity to an entity state.

```typescript
import { EntityState, addEntity } from '@onsetsoftware/mutable-js';

const person: Person = {
  name: "Jane",
  id: "id-2",
  age: 21,
};

addEntity(people, person);
```

#### addEntities
Adds multiple entities to an entity state.

```typescript
import { EntityState, addEntities } from '@onsetsoftware/mutable-js';

const morePeople: Person[] = [
  {
    name: "Jane",
    id: "id-2",
    age: 21,
  },
  {
    name: "Jack",
    id: "id-3",
    age: 22,
  },
];

addEntities(people, morePeople);
```
### updateEntity

Updates an entity in an entity state. This takes a partial entity (which must include an `id`).

```typescript
const person = {
  id: "id-1",
  age: 21,
};

updateEntity(people, person); // => john's age === 21
```

### deleteEntity

Deletes an entity from an entity state.

```typescript
deleteEntity(people, "id-1"); // => people = { ids: [], entities: {} } 
```
