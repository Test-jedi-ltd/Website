import { useMemo } from "react"
import DOMPurify from "dompurify"

const contentClassName =
  "break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6 [&_a]:underline [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-[28px] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-[22px] [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-accent-brown [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_pre]:bg-black/20 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_code]:text-[13px] [&_hr]:my-8 [&_hr]:border-[#7A7780]"

const PostContent = ({ html = "", className = "" }) => {
  const cleanHtml = useMemo(() => {
    const sanitized = DOMPurify.sanitize(html || "", {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
    })
    return sanitized.replace(/<img\s/gi, '<img loading="lazy" ')
  }, [html])

  return (
    <div
      className={`${contentClassName} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  )
}

export default PostContent
