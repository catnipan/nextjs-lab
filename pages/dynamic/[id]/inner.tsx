import { useRouter } from "next/router"

export default function Page({ randomVal }: { randomVal: number }) {
    const router = useRouter()
    return (
        <div>
            randomVal: {randomVal}
            <hr />
            router.pathname: {router.pathname}
            <hr />
            router.asPath: {router.asPath}
            <hr />
            router.basePath: {router.basePath}
            <hr />
            router.query: {JSON.stringify(router.query)}
        </div>
    )
}

export function getServerSideProps() {
    console.log('run getServerSideProps')
    return {
        props: {
            randomVal: Math.random(),
        }
    }
}