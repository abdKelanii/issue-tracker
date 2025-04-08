import { Button } from "@/components/ui/button";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return <Button variant={"destructive"}>Delete Issue</Button>;
};

export default DeleteIssueButton;
