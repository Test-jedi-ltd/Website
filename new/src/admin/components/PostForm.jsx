import { useState, useEffect, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Modal, message } from "antd"
import TiptapEditor from "./TiptapEditor"
import ImageUpload from "./ImageUpload"
import {
  createBlogPost,
  updateBlogPost,
  isSlugUnique,
} from "../../lib/firestore"
import { isValidSlug, slugify } from "../../lib/slug"
import { getErrorMessage } from "../../lib/errors"
import {
  useAutosave,
  loadAutosavedDraft,
  clearAutosavedDraft,
} from "../../lib/useAutosave"

const confirmAction = ({ title, content, okText = "Confirm" }) =>
  new Promise((resolve) => {
    Modal.confirm({
      title,
      content,
      okText,
      cancelText: "Cancel",
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })

const BlogPostForm = ({ initialPost }) => {
  const navigate = useNavigate()
  const isEdit = Boolean(initialPost && initialPost.id)

  const [title, setTitle] = useState(initialPost?.title || "")
  const [slug, setSlug] = useState(initialPost?.slug || "")
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug))
  const [slugError, setSlugError] = useState(null)
  const [slugChecking, setSlugChecking] = useState(false)
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "")
  const [content, setContent] = useState(initialPost?.content || "")
  const [featuredImage, setFeaturedImage] = useState(initialPost?.featuredImage || "")
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initialPost?.featuredImageAlt || ""
  )
  const [author, setAuthor] = useState(initialPost?.author || "admin")
  const [status, setStatus] = useState(initialPost?.status || "draft")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const draftStorageKey = isEdit
    ? `blog-post-draft-${initialPost.id}`
    : "blog-post-draft-new"

  const autosaveData = useMemo(
    () => ({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      featuredImageAlt,
      author,
      status,
    }),
    [
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      featuredImageAlt,
      author,
      status,
    ]
  )

  const {
    status: autosaveStatus,
    lastSavedAt,
    clearDraft,
  } = useAutosave({
    storageKey: draftStorageKey,
    data: autosaveData,
    enabled: status === "draft",
  })

  const restorePromptedRef = useRef(false)

  useEffect(() => {
    if (restorePromptedRef.current) return
    restorePromptedRef.current = true

    const saved = loadAutosavedDraft(draftStorageKey)
    if (!saved) return

    const hasContent = Boolean(saved.title || saved.excerpt || saved.content)
    if (!hasContent) {
      clearAutosavedDraft(draftStorageKey)
      return
    }

    Modal.confirm({
      title: "Restore unsaved draft?",
      content: "A locally saved draft was found. Restore it or discard it?",
      okText: "Restore",
      cancelText: "Discard",
      onOk: () => {
        setTitle(saved.title || "")
        setSlug(saved.slug || "")
        setSlugTouched(Boolean(saved.slug))
        setExcerpt(saved.excerpt || "")
        setContent(saved.content || "")
        setFeaturedImage(saved.featuredImage || "")
        setFeaturedImageAlt(saved.featuredImageAlt || "")
        setAuthor(saved.author || "admin")
        setStatus(saved.status || "draft")
      },
      onCancel: () => {
        clearAutosavedDraft(draftStorageKey)
      },
    })
  }, [draftStorageKey])

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title || "")
      setSlug(initialPost.slug || "")
      setSlugTouched(Boolean(initialPost.slug))
      setSlugError(null)
      setExcerpt(initialPost.excerpt || "")
      setContent(initialPost.content || "")
      setFeaturedImage(initialPost.featuredImage || "")
      setFeaturedImageAlt(initialPost.featuredImageAlt || "")
      setAuthor(initialPost.author || "admin")
      setStatus(initialPost.status || "draft")
    }
  }, [initialPost])

  const handleTitleChange = (e) => {
    const nextTitle = e.target.value
    setTitle(nextTitle)
    if (!slugTouched) {
      setSlug(slugify(nextTitle))
      setSlugError(null)
    }
  }

  const handleSlugChange = (e) => {
    setSlugTouched(true)
    setSlug(e.target.value)
    setSlugError(null)
  }

  const validateSlug = async (candidate) => {
    const nextSlug = (candidate || "").trim()

    if (!nextSlug) {
      setSlugError("Slug is required.")
      return false
    }

    if (!isValidSlug(nextSlug)) {
      setSlugError("Use lowercase letters, numbers, and hyphens only.")
      return false
    }

    setSlugChecking(true)
    try {
      const unique = await isSlugUnique(nextSlug, initialPost?.id)
      if (!unique) {
        setSlugError("That slug is already in use. Choose a different one.")
        return false
      }
      setSlugError(null)
      return true
    } catch (err) {
      console.error("Slug check error:", err)
      setSlugError(
        getErrorMessage(err, "Could not verify slug availability. Please try again.")
      )
      return false
    } finally {
      setSlugChecking(false)
    }
  }

  const handleSlugBlur = () => {
    const nextSlug = (slug || slugify(title)).trim()
    if (nextSlug) {
      validateSlug(nextSlug)
    }
  }

  const submitWithStatus = async (nextStatus) => {
    setError(null)

    if (!title.trim()) {
      setError("Title is required.")
      return
    }
    if (!excerpt.trim()) {
      setError("Excerpt is required.")
      return
    }

    const finalSlug = (slug || slugify(title)).trim()
    const slugOk = await validateSlug(finalSlug)
    if (!slugOk) return

    if (nextStatus === "published") {
      const missingDetails = !featuredImage || !content.trim()
      const proceed = await confirmAction({
        title: "Publish this post?",
        content: missingDetails
          ? "This post has no featured image or content. Publish anyway?"
          : "This post will be visible on the public blog.",
        okText: "Publish",
      })
      if (!proceed) return
    }

    setStatus(nextStatus)
    setIsLoading(true)

    const postData = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content,
      featuredImage,
      featuredImageAlt: featuredImageAlt.trim(),
      author: author.trim() || "admin",
      status: nextStatus,
    }

    try {
      if (isEdit) {
        await updateBlogPost(initialPost.id, {
          ...postData,
          publishedAt: nextStatus === "published" ? initialPost.publishedAt || null : null,
        })
      } else {
        await createBlogPost(postData)
      }
      message.success(nextStatus === "published" ? "Post published." : "Draft saved.")
      clearDraft()
      navigate("/admin/blog")
    } catch (err) {
      console.error("Save post error:", err)
      const errorMessage = getErrorMessage(err, "Failed to save post. Please try again.")
      setError(errorMessage)
      message.error(errorMessage)
      if (err?.code === "slug-taken") {
        setSlugError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitWithStatus(status)
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-[#151240] focus:outline-none text-[14px]"

  const isBusy = isLoading || slugChecking

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="text-3xl font-bold text-[#151240]">
          {isEdit ? "Edit Post" : "New Post"}
        </h2>
        {status === "draft" && (
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#645F70]">
            {autosaveStatus === "saving" && "Saving..."}
            {autosaveStatus === "saved" &&
              lastSavedAt &&
              `Saved at ${lastSavedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            {autosaveStatus === "unsaved" && "Unsaved changes"}
            {autosaveStatus === "error" && "Autosave failed"}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="admin-surface space-y-6 rounded-xl p-5 sm:p-8">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="post-title">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={inputClass}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="post-slug">
            Slug (URL)
          </label>
          <p className="text-[11px] text-[#645F70] mb-2">
            Auto-generated from the title. Edit to override.
          </p>
          <input
            id="post-slug"
            type="text"
            value={slug}
            onChange={handleSlugChange}
            onBlur={handleSlugBlur}
            className={inputClass}
            placeholder="your-post-title"
          />
          {slugChecking && (
            <p className="mt-2 text-[12px] text-[#645F70]">
              Checking slug availability...
            </p>
          )}
          {!slugChecking && slugError && (
            <p className="mt-2 text-[12px] text-[#9B332B]">{slugError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="post-excerpt">
            Excerpt
          </label>
          <textarea
            id="post-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Brief summary of your post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <TiptapEditor value={content} onChange={setContent} />
        </div>

        <ImageUpload
          url={featuredImage}
          alt={featuredImageAlt}
          onUpload={setFeaturedImage}
          onRemove={() => {
            setFeaturedImage("")
            setFeaturedImageAlt("")
          }}
          onAltChange={setFeaturedImageAlt}
        />

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="post-author">
            Author
          </label>
          <input
            id="post-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={inputClass}
            placeholder="admin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
              />
              <span className="text-[13px]">Draft</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={status === "published"}
                onChange={() => setStatus("published")}
              />
              <span className="text-[13px]">Published</span>
            </label>
          </div>
        </div>

        {error && <p className="text-[#9B332B] text-sm">{error}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => submitWithStatus("draft")}
            disabled={isBusy}
            className="border border-[#D9C5B2] text-[#151240] py-3 px-6 rounded-lg text-[14px] font-semibold hover:border-[#964A21] hover:bg-[#FDF9D2] transition-colors disabled:opacity-60"
          >
            {isLoading && status === "draft" ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => submitWithStatus("published")}
            disabled={isBusy}
            className="bg-[#964A21] text-white py-3 px-6 rounded-lg text-[14px] font-semibold hover:bg-[#7d3d1b] transition-colors disabled:opacity-60"
          >
            {isLoading && status === "published" ? "Publishing..." : "Publish"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => navigate(`/admin/blog/preview/${initialPost.slug}`)}
              disabled={isBusy}
              className="border border-[#D9C5B2] text-[#151240] py-3 px-6 rounded-lg text-[14px] font-semibold hover:border-[#964A21] hover:bg-[#FDF9D2] transition-colors disabled:opacity-60"
            >
              Preview
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
            className="text-[#645F70] hover:text-[#964A21] text-[14px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogPostForm
