"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File, Loader2 } from "lucide-react";

export default function SummarizePage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);
      setSummary(null);

      // TODO: OCR + AI summary API call
      setTimeout(() => {
        setSummary(
          `📄 Summary of ${file.name}\n\n- Facts: ...\n- Arguments: ...\n- Decision: ...`
        );
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-heading flex items-center justify-center gap-2">
          <File className="h-6 w-6 text-purple-500" />
          Judgment Summarizer
        </h1>
        <p className="text-subheading mt-1 max-w-xl mx-auto">
          Upload an Indian court judgment (PDF) — get a clean summary of key
          points.
        </p>
      </div>

      <Input type="file" accept=".pdf" onChange={handleUpload} />

      <div className="min-h-[140px] card-base p-4 whitespace-pre-wrap text-sm">
        {loading && "Analyzing and summarizing judgment..."}
        {summary && summary}
        {!loading && !summary && (
          <p className="text-muted">Summary will appear here after upload.</p>
        )}
      </div>
    </div>
  );
}
