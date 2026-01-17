export function buildImageSet(query: string) {
  const base = `https://source.unsplash.com/1200x1200/?${encodeURIComponent(query)}`;
  return [`${base}&sig=1`, `${base}&sig=2`, `${base}&sig=3`, `${base}&sig=4`];
}

export function heroImage(query: string) {
  return `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`;
}
