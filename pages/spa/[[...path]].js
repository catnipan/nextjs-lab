import dynamic from 'next/dynamic'
import { Fragment } from 'react';
import { App } from '../../src/App';

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