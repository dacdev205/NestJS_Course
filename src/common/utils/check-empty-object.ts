export function check_empy_object(Object: object): boolean {
  for (const key in Object) {
    if (Object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
