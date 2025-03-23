// ActionUser.tsx
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
        if (verified) return;

        startTransition(() => {
            router.patch(
                `/user/${studentId}/enable`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const props = page.props as { success?: string; message?: string; student?: any; error?: string };
                        if (props.success) {
                            console.log(props.success); // "Student has been enabled and added to students table successfully."
                            console.log("Student data:", props.student);
                        } else if (props.message) {
                            console.log(props.message); // "Student is already enabled."
                        } else if (props.error) {
                            console.error("Error:", props.error);
                        }
                    },
                    onError: (errors) => {
                        console.error("Error enabling student:", errors);
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
            {isPending ? "Processing..." : verified ? "User Ready Verified" : "Allow"}
        </Button>
    );
}
