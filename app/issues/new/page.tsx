"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { CiCircleAlert } from "react-icons/ci";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

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
