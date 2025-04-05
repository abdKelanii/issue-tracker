import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssueAction = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
