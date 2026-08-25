import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PartyButton() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push("/party")}
            variant="contained"
            style={
                {
                    background: "#fc5300",
                    color: "white"
                }
            }
        >
            Start a Party
        </Button>
    )
}