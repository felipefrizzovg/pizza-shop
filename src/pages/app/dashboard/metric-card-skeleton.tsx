import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <>
      <Skeleton className="h-7 w-36" />
      <Skeleton className="w-53 h-4" />
    </>
  )
}
