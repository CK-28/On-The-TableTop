import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PartyButton() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push("/party")}
            variant="contained"
            sx={{
                width: 250,
                height: 60,
                background: "#fc5300",
                color: "#111827",
                fontSize: 22,
                "&:hover": { background: "#dc4800" },
            }}
        >
            Start a Party
        </Button>
    )
}