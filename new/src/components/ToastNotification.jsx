import { useEffect } from "react"

const notificationStyles = {
  success: {
    title: "Success!",
    container: "border-[#4B9D6A] bg-[#F0F9F2] text-[#1E6B3E]",
    icon: "bg-[#D9F0E0] text-[#267545]",
    progress: "bg-[#4B9D6A]",
  },
  error: {
    title: "Error",
    container: "border-[#D16A6A] bg-[#FFF2F2] text-[#9F2D2D]",
    icon: "bg-[#F9DDDD] text-[#AF3434]",
    progress: "bg-[#D16A6A]",
  },
  warning: {
    title: "Warning",
    container: "border-[#D5A431] bg-[#FFF9E5] text-[#7A5A00]",
    icon: "bg-[#F8EABF] text-[#8A6700]",
    progress: "bg-[#D5A431]",
  },
  info: {
    title: "Info",
    container: "border-[#4A84BD] bg-[#EFF6FD] text-[#245B8F]",
    icon: "bg-[#DCEBFA] text-[#2F6EA8]",
    progress: "bg-[#4A84BD]",
  },
}

const NotificationIcon = ({ type }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    {type === "success" && (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    )}
    {type === "error" && (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6m0-6-6 6" />
      </>
    )}
    {type === "warning" && (
      <>
        <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4m0 3h.01" />
      </>
    )}
    {type === "info" && (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    )}
  </svg>
)

export default function ToastNotification({ type, message, onDismiss }) {
  const notification = notificationStyles[type]
  const duration = type === "success" ? 4000 : 5000
  const role = type === "error" || type === "warning" ? "alert" : "status"

  useEffect(() => {
    const timeoutId = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(timeoutId)
  }, [duration, onDismiss])

  return (
    <div
      className={`fixed right-4 top-20 z-[60] w-[calc(100vw-2rem)] max-w-[400px] overflow-hidden rounded-[12px] border shadow-[0_16px_40px_rgba(21,18,64,0.18)] sm:right-6 sm:top-[90px] lg:top-[102px] ${notification.container}`}
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${notification.icon}`}>
          <NotificationIcon type={type} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-['DM_Sans'] text-[14px] font-bold leading-5">
            {notification.title}
          </p>
          <p className="m-0 break-words font-['DM_Sans'] text-[13px] leading-5 opacity-90">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-current/70 transition-colors hover:bg-black/5 hover:text-current"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </button>
      </div>
      <div aria-hidden="true" className="h-1 w-full bg-black/10">
        <div
          className={`h-full origin-left ${notification.progress}`}
          style={{
            animationName: "toast-progress-countdown",
            animationDuration: `${duration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
          }}
        />
      </div>
    </div>
  )
}
