"use client";
import { Progress } from "@components/ui/progress";
import React, { useEffect, useState } from "react";

interface CreateRestaurantHeaderProps {
  header: string;
  description: string;
  step: number;
}

export default function CreateRestaurantHeader({
  header,
  description,
  step,
}: CreateRestaurantHeaderProps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-medium">{header}</h1>
        <p className="text-gray-500 lg:flex hidden">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">{`Step ${step} of 4`}</p>
        <div className="gap-4 w-full hidden lg:flex ">
          {Array.from({ length: 4 }).map((_, i) => {
            let completed;
            const index = i + 1;
            if (index < step) completed = 100;
            else if (index > step) completed = 0;

            return (
              <Progress
                key={index}
                className="w-1/4 h-2"
                value={index == step ? progress : completed}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
