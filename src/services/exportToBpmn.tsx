/**
 * Utility to trigger a browser download of the BPMN XML string.
 */
export const exportToBpmn = (xml: string, fileName: string = 'diagram.bpmn'): void => {
  const blob = new Blob([xml], { type: 'application/bpmn20-xml;charset=UTF-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};