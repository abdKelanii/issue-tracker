import IssueStatusBadge from "@/components/IssueStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import IssueAction from "./IssueAction";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="">
      <IssueAction />
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-50 ">
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <Link href={`/issues/${issue.id}`} className="link">{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssuesPage;
