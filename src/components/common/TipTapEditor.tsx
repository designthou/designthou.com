"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { TipTapMenubar } from ".";

interface TipTapEditorProps {
  content: string;
  onContentChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function TiptapEditor({
  content,
  onContentChange,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      TextStyleKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
    ],
    content,
    // place the cursor in the editor after initialization
    autofocus: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onContentChange(newContent);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 mx-auto w-full">
      <div className="relative border border-gray-200 bg-white rounded-lg sm:w-full">
        <TipTapMenubar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
