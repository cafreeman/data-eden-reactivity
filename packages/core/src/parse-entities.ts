export interface Entity {
  id: string;
  __type: string;
}

function traverse(obj: any, predicate: (key: string, value: any, parent: any) => boolean) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(key, value, obj)) {
      traverse(value, predicate);
    }
  });
}

function hasType(obj: any): obj is Entity {
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
    if (hasType(value)) {
      if (Array.isArray(parent)) {
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
