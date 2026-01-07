"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "@/components";

// const DEFAULT_FILE_SIZE = 3 * 1024 * 1024;

export default function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  if (!editor) {
    return null;
  }

  // const handleUploadPhoto = async (e) => {
  //   const imageFiles = e.target.files;

  //   if (imageFiles === null) return;

  //   const imageFile = imageFiles[0];
  //   const currentImageFileSize = imageFile.size ?? 0;

  //   if (currentImageFileSize > DEFAULT_FILE_SIZE) {
  //     return notificationActions?.dispatchNotification({
  //       status: "warn",
  //       message: "업로드 가능한 이미지 용량은 3MB 입니다",
  //     });
  //   }

  //   setIsImageLoading(true);

  //   try {
  //     const imageUrl = await uploadImageInTextEditor(imageFile);

  //     if (!imageUrl) {
  //       throw Error({ message: "Return Image Url Error" });
  //     }

  //     editor.commands.setImage({ src: imageUrl });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsImageLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 border-b border-b-gray-200">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isBold
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={!editorState.canItalic}
        className={
          editorState.isItalic
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isStrike
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isHeading1
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isHeading2
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isHeading3
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isHeading4
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isHeading5
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      >
        <Heading5 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isParagraph
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Pilcrow size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isCode
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
      >
        <Code size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isBulletList
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={
          editorState.isOrderedList
            ? "bg-black text-white hover:bg-gray-800 hover:text-white"
            : ""
        }
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="cursor-pointer"
      >
        <label
          htmlFor="image_upload"
          className="inline-flex justify-center items-center w-full h-full cursor-pointer"
        >
          <ImageIcon size={16} className="cursor-pointer" />
        </label>
        <input
          type="file"
          id="image_upload"
          accept="image/*"
          className="hidden"
          // onChange={(e) => {
          //   handleUploadPhoto(e);
          //   e.target.value = ""; // 중복 데이터 예외 처리
          // }}
        />
      </Button>
    </div>
  );
}
