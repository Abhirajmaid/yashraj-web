export function resolveImageSrc(src: string | undefined | null) {
  if (!src) return src ?? "";

  // If it's an absolute URL (http/https) return as-is
  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  // If it's an absolute path under /images/, map to /yashraj_project_images/
  if (typeof src === "string" && src.startsWith("/images/")) {
    const parts = src.split("/").filter(Boolean);
    const basename = parts.length ? parts[parts.length - 1] : src;
    return `/yashraj_project_images/${basename}`;
  }

  // If it's already pointing to the yashraj_project_images folder, return as-is
  if (typeof src === "string" && src.startsWith("/yashraj_project_images/")) {
    return src;
  }

  // If it's any other absolute path (e.g. starts with '/'), return as-is
  if (src.startsWith("/")) {
    return src;
  }

  // If it's a data URI, return as-is
  if (src.startsWith("data:")) return src;

  // Otherwise, prefer images from the public yashraj_project_images folder.
  // Use the basename of the provided path/filename.
  const parts = src.split("/").filter(Boolean);
  const basename = parts.length ? parts[parts.length - 1] : src;
  return `/yashraj_project_images/${basename}`;
}

export default resolveImageSrc;

