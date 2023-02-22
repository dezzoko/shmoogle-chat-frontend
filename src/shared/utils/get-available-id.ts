export function getAvailableId<T extends WithId>(array: Array<T>): string {
  let id = '0';
  array.forEach((instance) => (id = +instance.id > +id ? instance.id : id));
  return String(+id + 1);
}

interface WithId {
  id: string;
}