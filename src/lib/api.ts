
export const api = {
  // Images
  getImages(folder: string) {
    return fetch(`/api/images?folder=${encodeURIComponent(folder)}`).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch images");
      }
      return res.json();
    });
  },

};
