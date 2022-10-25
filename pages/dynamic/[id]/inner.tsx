import { useRouter } from "next/router"

export default function Page() {
    const router = useRouter()
    console.log(router)
    return (
        <div>
            router.pathname: {router.pathname}
            <hr />
            router.query: {JSON.stringify(router.query)}
        </div>
    )
}