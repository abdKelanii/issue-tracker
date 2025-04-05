import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingIssueDetailPage = () => {
  return (
    <div>
      <Skeleton className="h-6 w-72" />
      <div className="flex gap-2 items-center my-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>
      <Card className="prose">
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
