import { useEffect } from "react"

export default function Analytics() {
  useEffect(() => {
    // Analytics page init logic
  }, [])

  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-3xl font-bold text-[#151240] mb-6">Analytics</h1>
      <p className="text-[#645F70] mb-4">
        Analytics placeholder page. Analytics features coming soon.
      </p>
      <p className="text-[#645F70]">
        This is a placeholder route. Analytics functionality will be implemented
        in a future phase.
      </p>
    </div>
  )
}