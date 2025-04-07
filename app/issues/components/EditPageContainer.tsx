'use client'
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";

const IssueForm = dynamic(() => import("./IssueForm"), {
  loading: () => <IssueFormSkeleton />,
  ssr: false,
});

const EditPageContainer = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default EditPageContainer;
