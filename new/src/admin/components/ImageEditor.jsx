import { useEffect, useRef, useState } from "react"

const PREVIEW_WIDTH = 900
const ASPECT_RATIOS = {
  Original: null,
  "16:9": 16 / 9,
  Square: 1,
}

const getRotatedSize = (image, rotation) =>
  rotation % 180 === 0
    ? { width: image.naturalWidth, height: image.naturalHeight }
    : { width: image.naturalHeight, height: image.naturalWidth }

const clampPan = (pan, imageSize, canvasSize, scale) => {
  const maxX = Math.max(0, (imageSize.width * scale - canvasSize.width) / 2)
  const maxY = Math.max(0, (imageSize.height * scale - canvasSize.height) / 2)
  return {
    x: Math.min(maxX, Math.max(-maxX, pan.x)),
    y: Math.min(maxY, Math.max(-maxY, pan.y)),
  }
}

const ImageEditor = ({ file, onApply, onCancel }) => {
  const canvasRef = useRef(null)
  const dragRef = useRef(null)
  const [image, setImage] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [aspectName, setAspectName] = useState("Original")
  const [outputScale, setOutputScale] = useState(1)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    const imageElement = new Image()
    let active = true
    imageElement.onload = () => {
      if (active) setImage(imageElement)
    }
    imageElement.onerror = () => {
      if (active) setError("This image could not be opened.")
    }
    imageElement.src = objectUrl

    return () => {
      active = false
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  const rotatedSize = image ? getRotatedSize(image, rotation) : null
  const selectedAspect = ASPECT_RATIOS[aspectName]
  const aspect =
    selectedAspect ||
    (rotatedSize ? rotatedSize.width / rotatedSize.height : 16 / 9)
  const canvasSize = {
    width: PREVIEW_WIDTH,
    height: Math.round(PREVIEW_WIDTH / aspect),
  }
  const baseScale =
    rotatedSize && canvasSize.height
      ? Math.max(
          canvasSize.width / rotatedSize.width,
          canvasSize.height / rotatedSize.height
        )
      : 1
  const scale = baseScale * zoom
  const boundedPan = rotatedSize
    ? clampPan(pan, rotatedSize, canvasSize, scale)
    : pan

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context || !image || !rotatedSize) return

    canvas.width = canvasSize.width
    canvas.height = canvasSize.height
    context.fillStyle = "#151240"
    context.fillRect(0, 0, canvas.width, canvas.height)

    const drawWidth = rotatedSize.width * scale
    const drawHeight = rotatedSize.height * scale
    const left = (canvas.width - drawWidth) / 2 + boundedPan.x
    const top = (canvas.height - drawHeight) / 2 + boundedPan.y

    context.save()
    context.translate(left + drawWidth / 2, top + drawHeight / 2)
    context.rotate((rotation * Math.PI) / 180)
    context.drawImage(
      image,
      (-image.naturalWidth * scale) / 2,
      (-image.naturalHeight * scale) / 2,
      image.naturalWidth * scale,
      image.naturalHeight * scale
    )
    context.restore()
  }, [image, rotation, scale, boundedPan.x, boundedPan.y, canvasSize.width, canvasSize.height, rotatedSize])

  const handlePointerDown = (event) => {
    if (!image) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      pan: boundedPan,
    }
  }

  const handlePointerMove = (event) => {
    if (!dragRef.current || !canvasRef.current) return
    const bounds = canvasRef.current.getBoundingClientRect()
    const factor = canvasSize.width / bounds.width
    setPan({
      x: dragRef.current.pan.x + (event.clientX - dragRef.current.pointerX) * factor,
      y: dragRef.current.pan.y + (event.clientY - dragRef.current.pointerY) * factor,
    })
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  const resetPan = () => setPan({ x: 0, y: 0 })

  const applyEdits = async () => {
    if (!image || !rotatedSize || saving) return

    setError("")
    const unchanged =
      rotation === 0 &&
      zoom === 1 &&
      boundedPan.x === 0 &&
      boundedPan.y === 0 &&
      aspectName === "Original" &&
      outputScale === 1

    if (unchanged) {
      const applied = onApply(file)
      if (applied === false) {
        setError("This image exceeds the 5MB upload limit. Reduce the output size or choose another image.")
      }
      return
    }

    setSaving(true)

    try {
      const sourceCanvas = document.createElement("canvas")
      sourceCanvas.width = rotatedSize.width
      sourceCanvas.height = rotatedSize.height
      const sourceContext = sourceCanvas.getContext("2d")
      if (!sourceContext) throw new Error("Image editing is not supported in this browser.")

      sourceContext.translate(sourceCanvas.width / 2, sourceCanvas.height / 2)
      sourceContext.rotate((rotation * Math.PI) / 180)
      sourceContext.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)

      const drawWidth = rotatedSize.width * scale
      const drawHeight = rotatedSize.height * scale
      const left = (canvasSize.width - drawWidth) / 2 + boundedPan.x
      const top = (canvasSize.height - drawHeight) / 2 + boundedPan.y
      const sourceX = Math.max(0, -left / scale)
      const sourceY = Math.max(0, -top / scale)
      const sourceWidth = Math.min(canvasSize.width / scale, rotatedSize.width - sourceX)
      const sourceHeight = Math.min(canvasSize.height / scale, rotatedSize.height - sourceY)
      const outputWidth = Math.max(1, Math.round(sourceWidth * outputScale))
      const outputHeight = Math.max(1, Math.round(sourceHeight * outputScale))
      const outputCanvas = document.createElement("canvas")
      outputCanvas.width = outputWidth
      outputCanvas.height = outputHeight
      const outputContext = outputCanvas.getContext("2d")
      if (!outputContext) throw new Error("Image editing is not supported in this browser.")
      outputContext.drawImage(
        sourceCanvas,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        outputWidth,
        outputHeight
      )

      const outputType = file.type === "image/gif" ? "image/png" : file.type
      const blob = await new Promise((resolve, reject) => {
        outputCanvas.toBlob(
          (result) =>
            result
              ? resolve(result)
              : reject(new Error("The edited image could not be exported.")),
          outputType,
          1
        )
      })
      const extension = outputType.split("/")[1].replace("jpeg", "jpg")
      const editedFile = new File(
        [blob],
        `${file.name.replace(/\.[^.]+$/, "")}-edited.${extension}`,
        { type: outputType, lastModified: Date.now() }
      )
      const applied = onApply(editedFile)
      if (applied === false) {
        setError("This image exceeds the 5MB upload limit. Reduce the output size or choose another image.")
      }
    } catch (editError) {
      console.error("Image edit error:", editError)
      setError(editError.message || "The image could not be edited.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      role="presentation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && !saving) onCancel()
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onCancel()
      }}
    >
      <section
        aria-labelledby="image-editor-title"
        aria-modal="true"
        className="w-full max-w-3xl rounded-xl bg-[#FFFEFA] p-5 text-[#151240] shadow-2xl sm:p-7"
        role="dialog"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold" id="image-editor-title">Edit featured image</h2>
            <p className="mt-1 text-sm text-[#645F70]">
              Drag to reposition, zoom to crop, rotate, then choose a crop shape.
            </p>
          </div>
          <button
            type="button"
            className="rounded px-2 py-1 text-sm font-medium hover:bg-[#FDF9D2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#964A21]"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>

        <div className="overflow-hidden rounded-lg bg-[#151240]">
          {!image && !error && (
            <p className="p-8 text-center text-sm text-white">Loading image...</p>
          )}
          {image && (
            <canvas
              ref={canvasRef}
              aria-label="Image crop preview. Drag to reposition."
              className="block max-h-[50vh] w-full touch-none cursor-grab object-contain active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                aspectRatio: `${canvasSize.width} / ${canvasSize.height}`,
                maxWidth: `min(100%, ${aspect * 50}vh)`,
              }}
            />
          )}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Crop shape
            <select
              className="mt-1 block w-full rounded border border-[#D9C5B2] bg-white px-3 py-2"
              value={aspectName}
              onChange={(event) => {
                setAspectName(event.target.value)
                resetPan()
              }}
            >
              {Object.keys(ASPECT_RATIOS).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Zoom
            <input
              aria-label="Zoom"
              className="mt-3 block w-full accent-[#964A21]"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
            />
          </label>
          <label className="text-sm font-medium">
            Output size
            <input
              aria-label="Output size"
              className="mt-3 block w-full accent-[#964A21]"
              type="range"
              min="0.25"
              max="1"
              step="0.05"
              value={outputScale}
              onChange={(event) => setOutputScale(Number(event.target.value))}
            />
            <span className="mt-1 block text-xs font-normal text-[#645F70]">
              {Math.round(outputScale * 100)}% of cropped resolution
            </span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded border border-[#D9C5B2] px-3 py-2 text-sm hover:bg-[#FDF9D2]"
              onClick={() => setRotation((value) => (value + 270) % 360)}
            >
              Rotate left
            </button>
            <button
              type="button"
              className="rounded border border-[#D9C5B2] px-3 py-2 text-sm hover:bg-[#FDF9D2]"
              onClick={() => setRotation((value) => (value + 90) % 360)}
            >
              Rotate right
            </button>
          </div>
        </div>

        {file.type === "image/gif" && (
          <p className="mt-3 text-xs text-[#645F70]">
            Editing a GIF exports the visible frame as a PNG; use the original to preserve animation.
          </p>
        )}
        {error && <p className="mt-3 text-sm text-[#9B332B]" role="alert">{error}</p>}

        <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <button
            type="button"
            className="rounded border border-[#D9C5B2] px-4 py-2 text-sm font-medium hover:bg-[#FDF9D2]"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded bg-[#964A21] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7D3D1B] disabled:opacity-60"
            onClick={applyEdits}
            disabled={!image || saving}
          >
            {saving ? "Applying edits..." : "Use this image"}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ImageEditor
