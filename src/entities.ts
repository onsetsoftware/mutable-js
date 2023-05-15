import type { List } from "@automerge/automerge";
import { filter } from "./filter";
import { filterList } from "./filter-list";

export type EntityState<T extends { id: string }> = {
  ids: string[];
  entities: Record<string, T>;
};

export function addEntity<T extends { id: string }>(
  state: EntityState<T>,
  entity: T,
): EntityState<T> {
  state.ids.push(entity.id);
  state.entities[entity.id] = entity;

  return state;
}

export function addEntities<T extends { id: string }>(
  state: EntityState<T>,
  entities: T[],
): EntityState<T> {
  for (const entity of entities) addEntity(state, entity);

  return state;
}

export function updateEntity<T extends { id: string }>(
  state: EntityState<T>,
  entity: Partial<T> & Pick<T, "id">,
): EntityState<T> {
  Object.assign(state.entities[entity.id], entity);

  return state;
}

export function deleteEntity<T extends { id: string }>(
  state: EntityState<T>,
  id: string,
): EntityState<T> {
  filter(state.ids, (i) => i !== id);
  delete state.entities[id];
  return state;
}

export function deleteEntityList<T extends { id: string }>(
  state: EntityState<T>,
  id: string,
): EntityState<T> {
  filterList(state.ids as List<string>, (i) => i !== id);
  delete state.entities[id];
  return state;
}
