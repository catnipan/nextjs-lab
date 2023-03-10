import dynamic from 'next/dynamic'

export default dynamic(
  () => import('../../src/App').then(m => m.App),
  { ssr: false }
)
