export function getStorageItem(name, defaultValue) {
  const itemJson = localStorage.getItem(name);
  if (itemJson) {
    try {
      return JSON.parse(itemJson);
    } catch (error) {
      return itemJson;
    }
  }
  return defaultValue;
}

export function setStorageItem(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function getImages(name) {
  return getStorageItem(
    "images",
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
}
