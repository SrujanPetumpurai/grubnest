'use client'
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session?.user?.id) {
        redirect(`/order/${session.user.id}`);
    } else if (status === "authenticated") {
        redirect("/order/spaceJam");
    }

    return null; // Prevents rendering anything else
}
