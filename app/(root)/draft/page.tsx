"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";

const draftTypes = [
  "Bail Petition",
  "Legal Notice",
  "Agreement",
  "Cheque Bounce Notice",
  "Custom Petition",
];

export default function DraftPage() {
  const [type, setType] = useState(draftTypes[0]);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setDraft(null);

    // TODO: integrate OpenAI API
    setTimeout(() => {
      setDraft(
        `📝 Draft for: ${type}\n\n${context}\n\n[Generated content here...]`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-heading flex justify-center items-center gap-2">
          <FileText className="h-6 w-6 text-green-500" />
          Draft Generator
        </h1>
        <p className="text-subheading mt-1 max-w-xl mx-auto">
          Select a legal document type and provide context — we’ll generate a
          draft for you.
        </p>
      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border rounded-md px-4 py-2 bg-card text-foreground"
      >
        {draftTypes.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <Textarea
        placeholder="Enter facts or instructions here..."
        rows={6}
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Generate Draft"
        )}
      </Button>

      <div className="min-h-[140px] card-base p-4 whitespace-pre-wrap text-sm">
        {loading && "Generating your draft..."}
        {draft && draft}
        {!loading && !draft && (
          <p className="text-muted">Draft output will appear here.</p>
        )}
      </div>
    </div>
  );
}
