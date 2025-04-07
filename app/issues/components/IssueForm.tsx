"use client";
import { issueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from "axios";
import delay from "delay";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An error occurred while creating the issue. Please try again.");
      console.log(error);
      setIsSubmitting(false);
    }
  });
  delay(50000);

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Alert variant="destructive" className="border-red-400">
          <CiCircleAlert className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 "
        >
          {isSubmitting ? <Loader /> : issue ? "Update Issue" : "Create Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
