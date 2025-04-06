import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button>
        <FaEdit />
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
