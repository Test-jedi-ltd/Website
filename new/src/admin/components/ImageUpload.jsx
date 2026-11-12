import { useRef, useState } from "react"
import { Icon } from "@iconify/react"
import { uploadImage, formatFileSize } from "../../lib/storage"
import { getErrorMessage } from "../../lib/errors"

const ImageUpload = ({ url = "", alt = "", onUpload, onRemove, onAltChange }) => {
  const inputRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadStage, setUploadStage] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileInfo, setFileInfo] = useState(null)

  const uploadFile = async (file) => {
    if (!file || uploading) return

    setError(null)
    setUploading(true)
    setUploadStage("preparing")
    setProgress(0)

    try {
      const result = await uploadImage(file, {
        onProgress: setProgress,
        onStage: setUploadStage,
      })
      setProgress(100)
      setFileInfo({ size: result.size, originalSize: file.size })
      if (onUpload) onUpload(result.url)
    } catch (err) {
      console.error("Image upload error:", err)
      setError(getErrorMessage(err, "Upload failed. Please try again."))
    } finally {
      setUploading(false)
      setUploadStage(null)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    e.target.value = ""
    uploadFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    uploadFile(e.dataTransfer.files && e.dataTransfer.files[0])
  }

  const openFilePicker = () => {
    if (!uploading && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleRemove = () => {
    setFileInfo(null)
    setError(null)
    setProgress(0)
    if (onRemove) onRemove()
  }

  const compressionNote =
    fileInfo && fileInfo.originalSize > fileInfo.size
      ? ` (compressed from ${formatFileSize(fileInfo.originalSize)})`
      : ""

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Featured Image</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div
        role="button"
        tabIndex={0}
        aria-disabled={uploading}
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openFilePicker()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!uploading) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center text-center rounded-lg transition-colors ${
          uploading ? "cursor-wait opacity-70" : "cursor-pointer"
        }`}
        style={{
          border: `2px dashed ${dragOver ? "#964A21" : "#D9C5B2"}`,
          padding: url ? "16px" : "40px 20px",
          minHeight: "120px",
          backgroundColor: dragOver ? "rgba(217, 197, 178, 0.18)" : "#FFFEFA",
        }}
      >
        {url ? (
          <div className="w-full">
            <img
              src={url}
              alt={alt || "Featured preview"}
              style={{
                maxWidth: "100%",
                maxHeight: "220px",
                borderRadius: "6px",
                margin: "0 auto",
                display: "block",
              }}
            />
            <span className="inline-block mt-3 text-[12px] text-[#645F70]">
              {uploading
                ? "Uploading replacement..."
                : "Click or drop another image to replace"}
            </span>
            {fileInfo && (
              <span className="block mt-1 text-[11px] text-[#645F70]">
                {formatFileSize(fileInfo.size)}
                {compressionNote}
              </span>
            )}
          </div>
        ) : (
          <>
            <Icon
              icon={uploading ? "mdi:loading" : "mdi:cloud-upload-outline"}
              style={{ fontSize: "36px", color: "#964A21" }}
            />
            <span className="mt-2 text-[13px] text-[#151240]">
              {uploading
                ? uploadStage === "preparing"
                  ? "Preparing image..."
                  : "Uploading image..."
                : "Click or drag an image here"}
            </span>
            <span className="mt-1 text-[11px] text-[#645F70]">
              JPG, PNG, GIF, or WebP. Max 5MB. Large images are compressed automatically.
            </span>
          </>
        )}
      </div>

      {uploading && uploadStage === "uploading" && progress > 0 && progress < 100 && (
        <div className="mt-2">
          <div className="h-2 rounded bg-[#E8E0D4] overflow-hidden">
            <div
              className="h-full bg-[#964A21] transition-all"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <span className="text-[12px] text-[#645F70]">
            {Math.round(progress)}% uploaded
          </span>
        </div>
      )}

      {error && <p className="mt-2 text-[#9B332B] text-[12px]">{error}</p>}

      {url && (
        <div className="mt-3">
          <label
            className="block text-[12px] font-medium mb-1"
            htmlFor="featured-image-alt"
          >
            Image alt text
          </label>
          <input
            id="featured-image-alt"
            type="text"
            value={alt}
            onChange={(e) => onAltChange && onAltChange(e.target.value)}
            placeholder="Describe the image for accessibility"
            className="w-full px-4 py-2 rounded-lg text-[#151240] text-[13px]"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="mt-2 text-[#9B332B] hover:text-[#151240] text-[12px]"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
