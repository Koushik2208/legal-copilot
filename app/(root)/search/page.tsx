"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    // Placeholder — API integration in next step
    setTimeout(() => {
      setResult(`🔍 Results for: "${query}" (fetched from Perplexity Pro)...`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-heading flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-500" />
          AI Legal Search
        </h1>
        <p className="text-subheading mt-1 max-w-xl mx-auto">
          Ask anything — case law, legal interpretation, landmark judgments...
        </p>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="e.g. Landmark Supreme Court cases on FIR quashing"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {/* Result */}
      <div className="min-h-[120px] p-4 card-base whitespace-pre-wrap text-sm">
        {loading && "Fetching AI response..."}
        {result && result}
        {!loading && !result && (
          <p className="text-muted">Your results will appear here.</p>
        )}
      </div>
    </div>
  );
}
