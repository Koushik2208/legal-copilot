"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

type SearchResult = {
  title: string;
  summary: string;
  keyPoints: string[];
  cases: {
    name: string;
    citation: string;
    principle: string;
  }[];
  caution?: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/perplexity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const parsed = JSON.parse(data?.choices?.[0]?.message?.content ?? "{}");

      if (parsed?.title && parsed?.summary) {
        setResult(parsed);
      } else {
        setError("❌ Unexpected format. Please refine your query.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {/* Result Section */}
      <div className="min-h-[180px] p-4 card-base space-y-4">
        {loading && <p className="text-muted">Fetching AI response...</p>}
        {error && <p className="text-destructive">{error}</p>}

        {result && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              {result.title}
            </h2>
            <p className="text-sm text-muted-foreground">{result.summary}</p>

            {/* Key Points */}
            <div>
              <h3 className="text-sm font-medium mb-1">Key Points:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {result.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Case List */}
            {result.cases?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-1">Cited Cases:</h3>
                <ul className="list-none text-sm space-y-2">
                  {result.cases.map((c, idx) => (
                    <li key={idx} className="border-l-2 pl-3 border-primary">
                      <strong>{c.name}</strong>{" "}
                      <span className="text-muted-foreground">
                        ({c.citation})
                      </span>
                      <br />
                      <span className="text-xs">{c.principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Caution */}
            {result.caution && (
              <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-950 border text-yellow-700 dark:text-yellow-300 text-sm">
                ⚠️ <strong>Note:</strong> {result.caution}
              </div>
            )}
          </div>
        )}

        {!loading && !error && !result && (
          <p className="text-muted text-sm">Your results will appear here.</p>
        )}
      </div>
    </div>
  );
}
