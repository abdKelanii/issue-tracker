import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  requests: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await requests.json();
  const validation = issueSchema.safeParse(body);

  const { id } = await params;

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
      statusText: "Invalid data",
    });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue not found" },
      { status: 404, statusText: "Not Found" }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, {
    status: 200,
    statusText: "OK",
  });
}
