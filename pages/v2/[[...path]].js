import dynamic from 'next/dynamic'
import { Fragment } from 'react';
import { App } from '../../src/App';

const NoSSR = dynamic(
  () => Promise.resolve(Fragment),
  { ssr: false }
)

export default function () {
    return (
        <NoSSR>
            <App />
        </NoSSR>
    )
}

