import { useCallback, useEffect, useRef, useState } from "react"

const DEFAULT_DELAY = 30000

export const loadAutosavedDraft = (storageKey) => {
  if (!storageKey) return null
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn("Could not read autosaved draft.", error)
    return null
  }
}

export const clearAutosavedDraft = (storageKey) => {
  if (!storageKey) return
  try {
    localStorage.removeItem(storageKey)
  } catch (error) {
    console.warn("Could not clear autosaved draft.", error)
  }
}

export const useAutosave = ({
  storageKey,
  data,
  enabled = true,
  delay = DEFAULT_DELAY,
  onSave,
}) => {
  const [status, setStatus] = useState("idle")
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const dataRef = useRef(data)
  const onSaveRef = useRef(onSave)
  const timerRef = useRef(null)
  const serialized = JSON.stringify(data)
  const previousSerializedRef = useRef(serialized)

  useEffect(() => {
    dataRef.current = data
    onSaveRef.current = onSave
  })

  const saveNow = useCallback(async () => {
    if (!enabled || !storageKey) return

    setStatus("saving")
    try {
      const payload = { ...dataRef.current, savedAt: new Date().toISOString() }
      localStorage.setItem(storageKey, JSON.stringify(payload))
      if (onSaveRef.current) {
        await onSaveRef.current(dataRef.current)
      }
      setLastSavedAt(new Date())
      setStatus("saved")
      previousSerializedRef.current = JSON.stringify(dataRef.current)
    } catch (error) {
      console.error("Autosave failed:", error)
      setStatus("error")
    }
  }, [enabled, storageKey])

  useEffect(() => {
    if (!enabled || !storageKey) return
    if (previousSerializedRef.current === serialized) return

    previousSerializedRef.current = serialized
    setStatus("unsaved")

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      saveNow()
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [serialized, enabled, storageKey, delay, saveNow])

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    []
  )

  const clearDraft = useCallback(() => {
    clearAutosavedDraft(storageKey)
    setStatus("idle")
    setLastSavedAt(null)
    previousSerializedRef.current = JSON.stringify(dataRef.current)
  }, [storageKey])

  return { status, lastSavedAt, saveNow, clearDraft }
}
