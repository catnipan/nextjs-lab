import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Link from 'next/link';
import { Counter } from '../../src/Counter';

function MyRoute({ path, children }) {
    const router = useRouter();
    if (path !== router.asPath) {
        return null;
    }
    return <>{children}</>;
}

function App({ randomVal }) {
    const router = useRouter();

    return (
        <div>
            Some value loaded from server: {randomVal}
            <hr />
            Client state: <Counter />
            <hr />
            current path: {router.asPath}
            <hr />
            <div style={{ border: '1px solid black', width: '80%', margin: '0 auto' }}>
                <nav>
                    <Link href="/spa2/page1">page1</Link>
                    <Link href="/spa2/page2">page2</Link>
                </nav>
                <MyRoute path="/spa2/page1">
                    <div>Content of page1</div>
                </MyRoute>
                <MyRoute path="/spa2/page2">
                    <div>Content of page2</div>
                </MyRoute>
            </div>
        </div>
    )
}

const NoSSR = dynamic(
  () => Promise.resolve(Fragment),
  { ssr: false }
)

export default function Page({ randomVal }) {
    return (
        <NoSSR>
            <App randomVal={randomVal} />
        </NoSSR>
    )
}

export function getServerSideProps(context) {
    // console.log(context.resolvedUrl);
    // if (context.resolvedUrl === '/spa/redirect') {
    //     return {
    //         redirect: {
    //             destination: '/spa/page2'
    //         }
    //     }
    // }
    console.log('run getServerSideProps')
    return {
        props: {
            randomVal: Math.random(),
        }
    }
}