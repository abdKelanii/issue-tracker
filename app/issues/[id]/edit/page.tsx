import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../components/IssueForm";

const EditIssuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
