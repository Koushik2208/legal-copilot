import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Search, User } from "lucide-react";

export default function HomePage() {
  return (
    <main className="section-wrapper section-padding text-center">
      {/* Hero Section */}
      <h1 className="text-heading bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text mb-4">
        LegalCopilot
      </h1>
      <p className="text-subheading max-w-2xl mx-auto mb-8">
        Your AI-powered legal research, drafting & judgment summarization
        assistant built for Indian law professionals.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Link href="/search">
          <Button className="px-6 py-4 text-base">
            <Search className="mr-2 h-5 w-5" /> Try AI Search
          </Button>
        </Link>
        <Link href="/draft">
          <Button variant="outline" className="px-6 py-4 text-base">
            <FileText className="mr-2 h-5 w-5" /> Generate Legal Draft
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button variant="ghost" className="px-6 py-4 text-base">
            <User className="mr-2 h-5 w-5" /> Login
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-green-500" /> AI-Powered Legal Search
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted">
            Use Perplexity Pro + GPT to quickly find relevant case law,
            citations, and legal interpretations.
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-blue-500" /> Draft Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted">
            Auto-generate structured legal drafts like petitions, notices, and
            agreements using form-driven AI.
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="text-gray-500" /> Case Summarizer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted">
            Upload any Indian court judgment PDF and get a clean summary with
            facts, citations, and final decision.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
