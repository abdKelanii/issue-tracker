"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Input placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default page;
