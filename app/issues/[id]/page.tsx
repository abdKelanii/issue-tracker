import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueButton from "../components/EditIssueButton";
import IssueDetails from "../components/IssueDetails";

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  if (typeof +id !== "number") notFound();
  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
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
