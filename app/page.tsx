import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            <p>Hello World</p>
            <Button>Click Me</Button>
        </div>
    );
}
