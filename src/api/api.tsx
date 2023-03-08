export const fetchLatestTileDate = async (url: string) => {
  try {
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL");
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Fetch failed for URL: ${url}, Status: ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error: any) {
    //console.error(error);
    throw new Error(`Error fetching latest tile date: ${error.message}`);
  }
};
