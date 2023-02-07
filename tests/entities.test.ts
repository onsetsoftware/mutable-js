import { beforeEach, describe, expect, test } from "vitest";
import {
  addEntities,
  addEntity,
  deleteEntity,
  EntityState,
  updateEntity,
} from "../src/entities";

describe("Entity State", () => {
  type Person = {
    name: string;
    age: number;
    id: string;
  };

  let people: EntityState<Person>;

  beforeEach(() => {
    people = {
      ids: ["id-1"],
      entities: {
        "id-1": {
          name: "John",
          age: 20,
          id: "id-1",
        },
      },
    };
  });

  test("entity can be added", () => {
    const person: Person = {
      name: "Jane",
      id: "id-2",
      age: 21,
    };

    addEntity(people, person);

    expect(people.ids).toEqual(["id-1", "id-2"]);
    expect(people.entities["id-2"]).toEqual(person);
  });

  test("entities can be added", () => {
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

    expect(people.ids).toEqual(["id-1", "id-2", "id-3"]);
    expect(people.entities["id-2"]).toEqual(morePeople[0]);
    expect(people.entities["id-3"]).toEqual(morePeople[1]);
  });

  test("entity can be updated", () => {
    const person = {
      id: "id-1",
      age: 21,
    };

    updateEntity(people, person);

    expect(people.ids).toEqual(["id-1"]);
    expect(people.entities["id-1"]).toEqual({
      name: "John",
      age: 21,
      id: "id-1",
    });
  });

  test("entity can be deleted", () => {
    deleteEntity(people, "id-1");

    expect(people.ids).toEqual([]);
    expect(people.entities["id-1"]).toEqual(undefined);
  });
});
