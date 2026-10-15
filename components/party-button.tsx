import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PartyButton() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push("/party")}
            variant="contained"
        >
            Start a Party
        </Button>
    )
}