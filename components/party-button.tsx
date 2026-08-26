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
                    color: "white",
                    width: 250,
                    height: 60,
                    fontSize: 22
                }
            }
        >
            Start a Party
        </Button>
    )
}