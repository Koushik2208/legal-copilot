"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
  initialContent: string;
  onChange?: (html: string) => void;
}

export function TiptapEditor({ initialContent, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || "<p></p>",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] prose prose-sm sm:prose-base max-w-none focus:outline-none text-justify",
      },
    },
    immediatelyRender: false, // avoids SSR hydration issues in Next.js :contentReference[oaicite:2]{index=2}
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
