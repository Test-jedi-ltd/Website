import { useEffect } from "react"

export default function Projects() {
  useEffect(() => {
    // Projects page init logic
  }, [])

  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-3xl font-bold text-[#151240] mb-6">Projects</h1>
      <p className="text-[#645F70] mb-4">
        Projects placeholder page. Projects management features coming soon.
      </p>
      <p className="text-[#645F70]">
        This is a placeholder route. Projects management functionality will be
        implemented in a future phase.
      </p>
    </div>
  )
}