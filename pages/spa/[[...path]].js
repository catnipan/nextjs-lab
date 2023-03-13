import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { locationAtom } from '../../src/atom';

const App = dynamic(
  () => import('../../src/App').then(m => m.App),
  { ssr: false }
)

export default function Page() {
  const router = useRouter();
  const spaPath = useAtomValue(locationAtom);
  return (
    <div>
      next-router.asPath: {router.asPath}
      <br />
      next-router.pathname: {router.pathname}
      <br />
      locationAtom: {spaPath}
      <div style={{ border: '1px solid black', margin: 10 }}>
        <App />
      </div>
    </div>
  )
}