"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

type ActionStudentProps = {
    studentId: string;
    verified: boolean;
    className?: string;
};

export function ActionUser({ studentId, verified, className }: ActionStudentProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            router.patch(
                `/user/${studentId}/verify`,
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        console.log("Verification updated successfully");
                    },
                    onError: (errors) => {
                        console.error("Failed to update verification:", errors);
                    },
                }
            );
        });
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isPending || verified}
            className={`${className} ${isPending ? "opacity-50 cursor-not-allowed text-sm" : ""}`}
        >
            {isPending ? "Processing..." : verified ? "User Verified" : "Allow"}
        </Button>
    );
}
