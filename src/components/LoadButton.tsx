import React, { useRef } from "react";

interface LoadButtonProps {
  label?: string;
  SvgImage?: string;
  onXmlLoaded: (options: {xml: string; fileName: string }) => void;
}

export function LoadButton({
  onXmlLoaded,
  label,
  SvgImage,
}: LoadButtonProps): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
      const xml = e.target?.result as string;
      onXmlLoaded({ xml, fileName: file.name });
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsText(file);
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <button
        className="panel-button"
        role="button"
        onClick={handleClick}
      >
          {SvgImage && (
        <img src={SvgImage} alt="" style={{ width: "20px", height: "20px" }} />
      )}
      {label || "Save"}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".bpmn, .xml"
        onChange={handleFileChange}
      />
    </>
  );
}