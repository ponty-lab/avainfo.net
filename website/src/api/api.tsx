const cache = new Map();
const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutes

const fetchLatestTileDate = async (url: string) => {
  try {
    if (!url || typeof url !== "string") {
      throw new Error(`Invalid URL: ${url}`);
    }

    //Check if the data is already cached
    const cachedData = cache.get(url);
    if (cachedData) {
      const { data, timestamp } = cachedData;
      const ageMs = Date.now() - timestamp;
      if (ageMs < CACHE_EXPIRATION_MS) {
        return data;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Fetch failed for URL: ${url}, Status: ${response.statusText}`
      );
    }
    const data = await response.text();

    // Cache the data
    cache.set(url, { data, timestamp: Date.now() });

    return data;
  } catch (error: any) {
    throw new Error(`Error fetching latest tile date: ${error.message}`);
  }
};

export default fetchLatestTileDate;
