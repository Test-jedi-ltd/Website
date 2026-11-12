import { useEffect, useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { uploadImage } from "../../lib/storage"
import { getErrorMessage } from "../../lib/errors"

const toolbarButtonStyle = (active) => ({
  padding: "6px 10px",
  borderRadius: "6px",
  border: `1px solid ${active ? "#964A21" : "#D9C5B2"}`,
  background: active ? "#964A21" : "transparent",
  color: active ? "#FFFFFF" : "#151240",
  fontSize: "12px",
  cursor: "pointer",
})

const smallButtonStyle = {
  padding: "4px 10px",
  borderRadius: "6px",
  border: "1px solid #D9C5B2",
  background: "transparent",
  color: "#151240",
  fontSize: "12px",
  cursor: "pointer",
}

const TiptapEditor = ({ value, onChange, initialContent }) => {
  const imageInputRef = useRef(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: value || initialContent || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] px-4 py-3 outline-none text-[#151240] text-[14px] leading-relaxed [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-3 [&_a]:text-[#964A21] [&_a]:underline",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      if (onChange) {
        onChange(currentEditor.getHTML())
      }
    },
  })

  useEffect(() => {
    if (!editor) return
    const incoming = value ?? initialContent ?? ""
    if (incoming !== editor.getHTML()) {
      editor.commands.setContent(incoming, { emitUpdate: false })
    }
  }, [editor, value, initialContent])

  if (!editor) {
    return null
  }

  const openLinkInput = () => {
    setLinkValue(editor.getAttributes("link").href || "")
    setShowLinkInput(true)
  }

  const applyLink = () => {
    const raw = linkValue.trim()

    if (!raw) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      const href = /^(https?:\/\/|mailto:|tel:|#|\/)/i.test(raw)
        ? raw
        : `https://${raw}`
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run()
    }

    setShowLinkInput(false)
    setLinkValue("")
  }

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run()
    setShowLinkInput(false)
    setLinkValue("")
  }

  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    e.target.value = ""
    if (!file) return

    setImageError(null)
    setUploadingImage(true)

    try {
      const result = await uploadImage(file)
      editor
        .chain()
        .focus()
        .setImage({ src: result.url, alt: file.name || "Post image" })
        .run()
    } catch (error) {
      console.error("Inline image upload error:", error)
      setImageError(getErrorMessage(error, "Image upload failed. Please try again."))
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <div className="rounded-lg border border-[#D9C5B2] overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-[#FDF9D2] border-b border-[#D9C5B2]">
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("heading", { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("heading", { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullets
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("blockquote"))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(editor.isActive("link"))}
          onClick={openLinkInput}
        >
          Link
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(false)}
          onClick={() => imageInputRef.current && imageInputRef.current.click()}
          disabled={uploadingImage}
        >
          {uploadingImage ? "Uploading..." : "Image"}
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(false)}
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          Clear
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(false)}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(false)}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {showLinkInput && (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#FDF9D2] border-b border-[#D9C5B2]">
          <input
            type="text"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                applyLink()
              }
              if (e.key === "Escape") {
                e.preventDefault()
                setShowLinkInput(false)
              }
            }}
            placeholder="https://example.com"
            className="flex-1 min-w-[200px] px-3 py-2 rounded-md text-[#151240] focus:outline-none text-[12px]"
            autoFocus
          />
          <button type="button" onClick={applyLink} style={smallButtonStyle}>
            Apply
          </button>
          {editor.isActive("link") && (
            <button type="button" onClick={removeLink} style={smallButtonStyle}>
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowLinkInput(false)}
            style={smallButtonStyle}
          >
            Cancel
          </button>
        </div>
      )}

      {imageError && (
        <p className="px-3 py-2 text-[#9B332B] text-[12px] bg-[#FDF9D2]">{imageError}</p>
      )}

      <div className="bg-[#FFFEFA]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TiptapEditor
