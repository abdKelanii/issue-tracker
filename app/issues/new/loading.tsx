import { Skeleton } from "@/components/ui/skeleton";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Skeleton className="h-6 w-72" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
};

export default LoadingNewIssuePage;
