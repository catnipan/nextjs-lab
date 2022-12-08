import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Layout({ children }: { children: React.ReactNode }) {
    const [val, setVal] = useState(0);
    const router = useRouter();

    return (
        <div>
            <button onClick={() => setVal(x => x + 1)}>{val}</button>
            <hr />
            <Link href="page1">page1</Link>
            {'  |  '}
            <Link href="page2">page2</Link>
            <hr />
            {/* {children} */}
            {router.asPath}
        </div>
    )
}