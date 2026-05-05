import React, { useState, ChangeEvent } from "react";
import "../App.css";

interface LoadTextButtonProps {
  SvgImage?: string;
  label?: string;
  xml?:string;
  StopImage?: string;
  PlayImage?:string;
  onXmlLoaded: (options: { label?: string; xml: string; fileName: string }) => void;
}

export function LoadTextButton({
  SvgImage,
  PlayImage,
  StopImage,
  onXmlLoaded,
  label,
  xml
}: LoadTextButtonProps): React.JSX.Element {
  const [xmlContent, setXmlContent] = useState<string>(xml?xml:"");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setXmlContent(e.target.value);
  }


  function handleLoad() {
    if (!xmlContent.trim()) return;
    onXmlLoaded({
      xml: xmlContent,
      fileName: "pasted-diagram.bpmn",
    });
    setXmlContent("");
    setIsOpen(false);
  }

  function handleCancel() {
    setXmlContent("");
    setIsOpen(false);
  }

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Button in the button group */}
      <button
        className="panel-button"
        role="button"
        onClick={handleToggle}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          padding: "8px",
          minWidth: "64px",
          height: "64px",
          borderRadius: "8px",
        }}
      >
        {SvgImage && (
          <img src={SvgImage} alt="" style={{ width: "24px", height: "24px" }} />
        )}
        {label || "Code"}
      </button>

      {/* 2. The Text Area Panel (Absolute positioning: DOES NOT expand parent div) */}
      {isOpen && (
        <div
          className="code-block "
        >
           <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleLoad}
              className="panel-button"
              disabled={!xmlContent.trim()}
            >
             {SvgImage && (
          <img src={PlayImage} alt="Load" style={{ width: "24px", height: "24px" }} />
        )}
            </button>

            <button
              onClick={handleCancel}
              className="panel-button"
            >
               {SvgImage && (
          <img src={StopImage} alt="Stop" style={{ width: "24px", height: "24px" }} />
        )}
            </button>
          </div>
          <textarea
            autoFocus
            placeholder="Paste your XML code here..."
            value={xmlContent}
            onChange={handleTextChange}
            style={{
              minHeight: "180px",
              padding: "12px",
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              resize: "vertical",
              outline: "none",
              backgroundColor: "#fafafa"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LoadTextButton;