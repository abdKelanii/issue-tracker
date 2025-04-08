import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueButton from "../components/EditIssueButton";
import IssueDetails from "../components/IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <div className="grid md:grid-cols-4 gap-5">
      <div className="md:col-span-3"><IssueDetails issue={issue} /></div>
      <div className="md:col-span-1 flex gap-2 flex-col md:w-fit w-full">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueDetailPage;
