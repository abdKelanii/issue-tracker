import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof +params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <div className="flex gap-2 items-center my-3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card>
        <CardContent>{issue.description}</CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
