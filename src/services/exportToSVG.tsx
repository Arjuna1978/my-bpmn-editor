/**
 * Utility to trigger a browser download of an SVG string.
 */
export async function exportToSvg(
  svg: string,
  defaultFileName: string = "diagram.svg",
): Promise<string | null> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=UTF-8" });

  if ("showSaveFilePicker" in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [
          {
            description: "SVG Vector Image",
            accept: {
              "image/svg+xml": [".svg"],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      return fileHandle.name;
    } catch (err: any) {
      if (err.name === "AbortError") {
        return null;
      }
      console.warn("No native file picker.", err);
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = defaultFileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return defaultFileName;
}
