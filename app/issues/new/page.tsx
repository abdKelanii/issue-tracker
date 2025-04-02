"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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

type IssueForm = z.infer<typeof createIssueSchema>;

const NewPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>();

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Alert variant="destructive" className="border-red-400">
          <CiCircleAlert className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError(
              "An error occurred while creating the issue. Please try again."
            );
            console.log(error);
          }
        })}
      >
        <Input placeholder="Title" {...register("title")} />
        {errors.title && <p className="text-red-400">{errors.title.message}</p>}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {errors.description && (
          <p className="text-red-400">{errors.description.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewPage;
