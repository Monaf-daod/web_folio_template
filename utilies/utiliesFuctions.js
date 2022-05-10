/// function for checking of document status if all the images within it are loaded
// if true swap custom loader status to false(hidden)
export function checkLoadImages(setLoading) {
  if (typeof window == "object") {
    Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
        return new Promise((resolve) => {
          img.addEventListener("load", () => resolve(true));
          img.addEventListener("error", () => resolve(false));
        });
      })
    ).then((results) => {
      if (results.every((res) => res)) setLoading(false);
      else setLoading(false);
    });
  }
}

export function getSEOKeywordsContent(list = []) {
  let content = "";
  if (list.length > 0) {
    content += list.join(", ");
    return content;
  }
  return content;
}
