export function toUrlSlug(name: string) {
  return name
    .trim()                          // Remove leading/trailing spaces
    .toLowerCase()                   // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '')    // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/-+/g, '-');            // Replace multiple hyphens with one
}

export function getFileURL(fileName: string) {
  return `/api/services/file/${fileName}`;
}