import { traverse } from './traverse.js';

export interface Entity {
  id: string;
  __type: string;
}

// if something is an object with a `__type` field, it's an Entity as far as we're concerned
function isEntity(obj: any): obj is Entity {
  return typeof obj === 'object' && obj !== null && '__type' in obj;
}

export interface ParsedEntity {
  entity: Entity;
  parent: Entity | null;
  prop: string | null;
}

export function parseEntities(entity: Entity): Array<ParsedEntity> {
  const result: Array<ParsedEntity> = [
    {
      entity,
      prop: null,
      parent: null,
    },
  ];

  // This tracks the property we're in if we are currently traversing through an array
  let currentArrayProp: string | null;
  let ArrayMetadata = new WeakMap<Array<Entity>, { key: string; parent: Entity }>();

  traverse(entity, (key: string, value: any, parent: Entity | Array<Entity>) => {
    if (isEntity(value)) {
      if (Array.isArray(parent)) {
        // if we're here, it means we're in a hasMany relationship and need to track which property
        // got us here so we can refer back to the property key when linking entities later,
        // e.g. { pets: [ { name: 'hitch', id: 1 }]} will have a prop value of `pets[0]` so we know
        // how to get to it from the parent
        const meta = ArrayMetadata.get(parent) || null;
        if (meta) {
          currentArrayProp = meta.key;
          parent = meta.parent;
        }
      } else {
        currentArrayProp = null;
      }

      result.push({
        parent: parent as Entity,
        prop: currentArrayProp ? `${currentArrayProp}[${key}]` : key,
        entity: value,
      });

      return true;
    }

    if (Array.isArray(value)) {
      if (!Array.isArray(parent)) {
        ArrayMetadata.set(value, {
          parent,
          key,
        });
      }
      return true;
    }

    return false;
  });

  return result.reverse();
}
