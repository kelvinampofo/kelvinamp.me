import { Prototype } from '../lib/prototypes';

export const findPrototype = (prototypes: Prototype[], titleToMatch: string) => {
  const found = prototypes.find(({ title }) => title === titleToMatch);
  if (!found) {
    throw new Error(`Prototype "${titleToMatch}" is not found.`);
  }
  return found;
};
