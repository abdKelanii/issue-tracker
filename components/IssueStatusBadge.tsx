import { Status } from "@prisma/client";
import { Badge } from "./ui/badge";

const statusMap: Record<
  Status,
  { lable: string; color: "destructive" | "blue" | "success" }
> = {
  OPEN: { lable: "Open", color: "destructive" },
  IN_PROGRESS: { lable: "In Progress", color: "blue" },
  CLOSED: { lable: "Closed", color: "success" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className="uppercase rounded-full" variant={statusMap[status].color}>{statusMap[status].lable}</Badge>
  );
};

export default IssueStatusBadge;
