export type Dictionary = typeof import('../../dictionaries/pl.json');

export const getDictionary = async () => {
  return import('../../dictionaries/pl.json').then((module) => module.default);
};
