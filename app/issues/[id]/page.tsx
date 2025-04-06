import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import ReactMarkDown from "react-markdown";

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
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <h1 className="text-2xl font-bold">{issue.title}</h1>
        <div className="flex gap-2 items-center my-3">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <Card className="prose">
          <CardContent>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
          </CardContent>
        </Card>
      </div>
      <div>
        <Button>
          <FaEdit />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailPage;
