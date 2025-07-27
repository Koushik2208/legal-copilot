"use client";

import { useState } from "react";
import { useRef } from "react";
import { Loader2, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReactToPrint } from "react-to-print";
import { TiptapEditor } from "@/components/TipTapEditor";
import { marked } from "marked";

const DRAFT_TYPES = [
  "Legal Notice",
  "Bail Application",
  "Affidavit",
  "RTI Request",
  "Agreement Draft",
  "Consumer Complaint",
];

export default function DraftPage() {
  const [type, setType] = useState("Legal Notice");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleGenerate = async () => {
    if (!type || !context.trim()) return;

    setLoading(true);
    setOutput(null);
    setError(null);

    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context }),
      });

      const data = await res.json();
      const html = await marked(data.data || "");

      if (data.success) {
        setOutput(html);
      } else {
        setError(data.error?.message || "Failed to generate draft.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!editedContent) return;

    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = editedContent;
      const plainText = tempElement.innerText;

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([plainText], { type: "text/plain" }),
          "text/html": new Blob([editedContent], { type: "text/html" }),
        }),
      ]);

      alert("Draft copied to clipboard (rich + plain text)!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Copy failed. Try again or check browser permissions.");
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: editorRef,
    documentTitle: `${type}-draft`,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-heading flex items-center justify-center gap-2">
          <ScrollText className="w-6 h-6 text-blue-500" />
          Draft Legal Documents
        </h1>
        <p className="text-subheading mt-1 max-w-xl mx-auto">
          Select a draft type, describe your case, and generate a professional
          legal draft.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="text-sm font-medium w-[120px]">Document Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full md:max-w-xs">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {DRAFT_TYPES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Case Details</label>
          <Textarea
            placeholder="Explain the situation briefly — e.g. client was wrongfully accused of cheating under section 420..."
            rows={6}
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={loading || !context}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Generate Draft"
          )}
        </Button>
      </div>

      {/* Output */}
      <div className="card-base p-4 whitespace-pre-wrap text-sm min-h-[160px]">
        {/* Output */}
        {loading && <div className="text-muted">Generating draft...</div>}

        {error && <div className="text-destructive">{error}</div>}

        {!output && !loading && !error && (
          <div className="text-muted">
            Your drafted output will appear here.
          </div>
        )}

        {output && (
          <div className="space-y-4">
            <div ref={editorRef} className="p-10">
              <TiptapEditor
                initialContent={output}
                onChange={(html) => setEditedContent(html)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="secondary">
                Copy Draft
              </Button>

              <Button onClick={handlePrint} variant="secondary">
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
