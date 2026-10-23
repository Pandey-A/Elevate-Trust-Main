import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
import type { ReactNode } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from "lucide-react";

type BlogRichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border transition-colors ${
        active
          ? "border-[#2365aa] bg-[#2365aa] text-white"
          : "border-transparent bg-transparent text-[#5a5a5a] hover:border-[#d7e6f3] hover:bg-[#EFF7FC] hover:text-[#2365aa]"
      }`}
    >
      {children}
    </button>
  );
}

export default function BlogRichTextEditor({
  value,
  onChange,
  placeholder = "Write the blog content here...",
}: BlogRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "blog-editor__content min-h-[220px] px-4 py-3 text-sm leading-7 text-[#272935] outline-none [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1f2432] [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#1f2432] [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:font-semibold [&_a]:text-[#2365aa] [&_a]:underline",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL", previousUrl || "https://");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return (
      <div className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-8 text-sm text-[#848b9b]">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] focus-within:border-[#2365aa]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#d7e6f3] bg-white px-2 py-2">
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#d7e6f3]" aria-hidden />

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#d7e6f3]" aria-hidden />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#d7e6f3]" aria-hidden />

        <ToolbarButton title="Add link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 size={15} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
