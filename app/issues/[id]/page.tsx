import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueButton from "../components/EditIssueButton";
import IssueDetails from "../components/IssueDetails";

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
      <IssueDetails issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </div>
  );
};

export default IssueDetailPage;
