import type {
  EntityState,
  GetIdType,
  HasId,
} from "@onsetsoftware/entity-state";
import { filter } from "./filter";

export function addEntity<TEntity extends HasId<TEntity>>(
  state: EntityState<TEntity>,
  entity: TEntity,
) {
  state.ids.push(entity.id);
  state.entities[entity.id] = entity;

  return state;
}

export function addEntities<TEntity extends HasId<TEntity>>(
  state: EntityState<TEntity>,
  entities: TEntity[],
) {
  for (const entity of entities) addEntity(state, entity);

  return state;
}

export function updateEntity<TEntity extends HasId<TEntity>>(
  state: EntityState<TEntity>,
  entity: Partial<TEntity> & Pick<TEntity, "id">,
) {
  Object.assign(state.entities[entity.id], entity);

  return state;
}

export function deleteEntity<TEntity extends HasId<TEntity>>(
  state: EntityState<TEntity>,
  id: GetIdType<TEntity>,
) {
  filter(state.ids, (i) => i !== id);
  delete state.entities[id];
  return state;
}
