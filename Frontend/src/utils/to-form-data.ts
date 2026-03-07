export function toFormData<T extends object>(payload: T): FormData {
  const fd = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof File) {
      fd.append(key, value);
    } else if (typeof value === "string") {
      fd.append(key, value);
    }
  });

  return fd;
}
