import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl space-y-3">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-96 w-full rounded-lg" />
  </div>
  )
}

export default IssueFormSkeleton