"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";

import { TipTapMenubar } from ".";

export default function TiptapEditor({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      TextStyleKit,
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
    // onUpdate: ({ editor }) => {
    // const newContent = editor.getHTML();
    // if (newContent.includes) onContentChange(newContent);
    // setLocalEditorContent(newContent);
    // },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto w-[calc(100%-32px)] border border-gray-200 bg-white rounded-lg sm:w-full">
      <TipTapMenubar editor={editor} />
      <EditorContent editor={editor} className="p-3" />
    </div>
  );
}
