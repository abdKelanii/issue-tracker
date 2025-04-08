import { IssueStatusBadge } from '@/components/index'
import { Card, CardContent } from '@/components/ui/card'
import { Issue } from '@prisma/client';
import React from 'react'
import ReactMarkDown from "react-markdown";

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <div>
        <h1 className="text-2xl font-bold">{issue.title}</h1>
        <div className="flex gap-2 items-center my-3">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <Card className="prose max-w-full">
          <CardContent>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
          </CardContent>
        </Card>
      </div>
  )
}

export default IssueDetails