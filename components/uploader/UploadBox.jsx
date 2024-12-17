"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Tooltip } from "../misc/ToolTip";

export default function UploadForm({ dimensions = { width: 400, height: 400 } }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [progress, setProgress] = useState(0); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardWidth = Math.min(dimensions.width, windowSize.width * 0.9);
  const cardHeight = Math.min(dimensions.height, windowSize.height * 0.9);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const file = files[0];
    const fileName = file.name.split(".")[0]; 
  
    setUploadInProgress(true);
    setProgress(0);
  
    try {
      const response = await fetch("/api/upload/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ indexName: fileName }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to create index");
      }
  
      console.log(result.message);
  
      setProgress(100);
      setTimeout(() => {
        setUploadInProgress(false);
        setUploadComplete(true);
      }, 500);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to create index. Please try again.");
      setUploadInProgress(false);
    }
  };  

  const handleButtonClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileChange();
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 45 }}
    >
      <Card className="rounded-2xl px-36 py-20" style={{ width: cardWidth, height: cardHeight }}>
        <CardHeader className="space-y-2 mb-8 text-start">
          <CardTitle className="text-5xl font-bold">
            {uploadComplete
              ? "It's ready!"
              : uploadInProgress
              ? "Here we go!"
              : "Hello,"}
          </CardTitle>
          {!uploadComplete && !uploadInProgress && (
            <CardTitle className="text-4xl font-bold">What is your analysis today?</CardTitle>
          )}
        </CardHeader>
        <CardContent className="flex flex-col w-full overflow-hidden justify-center items-center">
          <div
            className={`flex justify-center mb-6 px-32 border-2 ${
              isDragging ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
            } rounded-xl transition-colors duration-200`}
            onClick={uploadInProgress || uploadComplete ? undefined : handleButtonClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button
              onClick={handleButtonClick}
              disabled={uploadInProgress || uploadComplete}
              className={`flex flex-col items-center justify-center px-6 py-3 text-black font-semibold rounded-xl ${
                uploadInProgress || uploadComplete
                  ? "opacity-50"
                  : ""
              } ${uploadInProgress ? "text-xl" : "text-lg"}`}
            >
              <span className="font-bold">
                {uploadComplete
                  ? "Your analysis is ready!"
                  : uploadInProgress
                  ? "Upload in progress"
                  : "Upload your database here"}
              </span>
              {!uploadComplete && !uploadInProgress && (
                <span className="text-sm text-gray-600">or drop xls files here</span>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xls,.xlsx,.csv,.json"
              onChange={handleFileChange}
            />
          </div>

          {(uploadInProgress || uploadComplete) && (
            <div className="w-full mt-6">
              <Progress value={progress} indicatorColor="bg-primary2" className="rounded-xl" />
            </div>
          )}

          {!uploadComplete && !uploadInProgress && (
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox id="save-copy" />
              <label
                htmlFor="save-copy"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I want to save a copy of the database for my future queries
              </label>
              <Tooltip label="This option will store the database securely for future use.">
                <Info className="h-4 w-4 text-gray-500" />
              </Tooltip>
            </div>
          )}

          {!uploadComplete && !uploadInProgress && (
            <Alert>
              <AlertDescription>
                <p className="font-semibold mb-2">WARNING:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    Supported formats: <em>XLS</em>, <em>XLSX</em>, <em>CSV</em>, <em>JSON</em>
                  </li>
                  <li>Start your first data entry at cell A1 of your database</li>
                  <li>Ensure your database does not contain headers or footers</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
