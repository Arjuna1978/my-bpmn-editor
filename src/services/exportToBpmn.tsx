interface SaveFileOptions {
  xml: string;
  fileName: string;
}

export default async function saveFile(options: SaveFileOptions): Promise<void> {
  const blob = new Blob([options.xml], { type: 'application/bpmn20-xml;charset=UTF-8' });

  // "Save As" dialog
  if ('showSaveFilePicker' in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: options.fileName,
        types: [
          {
            description: 'BPMN 2.0 XML Diagram',
            accept: {
              'application/bpmn20-xml': ['.bpmn', '.xml'],
            },
          },
        ],
      });

      // Write file
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      
      // Successfully saved via native picker, so we exit
      return;
    } catch (err: any) {
      //Handle abort
      if (err.name === 'AbortError') {
        return;
      }
      console.warn('No native file picker.', err);
    }
  }

}