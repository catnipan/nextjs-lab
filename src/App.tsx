import { Routes, Route, Outlet, Navigate, NavLink, useSearchParams, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { loadable } from "jotai/utils"
import Link from "next/link";
import { locationAtom } from "./atom";


const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, n));

type SessionState = {
  state: 'pending'
} | {
  state: 'authed',
  user: string
} | {
  state: 'unauthed'
}
const sessionAtom = atom<SessionState>({ state: 'pending' });
sessionAtom.onMount = (setAtom) => {
  // api call
  sleep(100).then(() => {
    const user = localStorage.getItem('session');
    console.log({ user });
    if (user) {
      setAtom({ state: 'authed', user });
    } else {
      setAtom({ state: 'unauthed' });
    }
  })
}

type Account = { accountId: string, accountName: string };
async function fetchAccounts(user: string): Promise<Account[]> {
  if (user === 'newuser') {
    return []
  }
  return [{ accountId: '12345', accountName: 'Account 1' }, { accountId: '67890', accountName: 'Account 2' }];
}

const accountsAtom = atom<Promise<Account[]>>(async get => {
  const session = get(sessionAtom);
  if (session.state === 'authed') {
    await sleep(500);
    const accounts = await fetchAccounts(session.user);
    return accounts;
  }
  return [];
});

const accountsLoadableAtom = loadable(accountsAtom);

// const accountIdParam = atom<string>(
//   () => {
//     const search = new URLSearchParams(window.location.search);
//     return search.get('accountId');
//   },
//   (get, set, update) => {
//     const search = new URLSearchParams(window.location.search);
//     search.set('accountId', update)
//     return search.get('accountId');
//   }
// );
// accountIdParam.onMount = (setAtom) => {
// }

function Authed() {
  const atom = useAtomValue(sessionAtom);
  switch (atom.state) {
    case 'authed':
      return <Outlet />
    case 'pending':
      return <div>Check Auth... Loading...</div>
    case 'unauthed':
      return <Navigate to="/public/login" />
  }
}

function UnAuthed() {
  const session = useAtomValue(sessionAtom);
  switch (session.state) {
    case 'authed':
      return <Navigate to="/" />
    case 'pending':
      return <div>Check Auth... Loading...</div>
    case 'unauthed':
      return <Outlet />
  }
}

function Login() {
  const setSession = useSetAtom(sessionAtom);
  const [name, setName] = useState('');
  return (
    <div>
      <h1>Login Page</h1>
      <label>Username: </label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <br />
      <button onClick={() => {
        localStorage.setItem('session', name);
        setSession({ state: 'authed', user: name })
      }}>Login</button>
    </div>
  )
}

function useUser() {
  const session = useAtomValue(sessionAtom);
  if (session.state === 'authed') {
    return session.user;
  }
  throw new Error('userUser must used in authed route');
}

function AppLayout() {
  const user = useUser();
  const setSession = useSetAtom(sessionAtom);
  return (
    <div>
      <header>
        User: {user} |
        <button onClick={() => {
          localStorage.removeItem('session')
          setSession({ state: 'unauthed' });
        }}>logout</button>
      </header>
      <nav>
        <NavLink to="dashboard">Dashboard</NavLink>
        {' | '}
        <NavLink to="performance">Performance</NavLink>
        {' | '}
        <NavLink to="setting">Setting</NavLink>
        {' | '}
        <NavLink to="notexist">NotExistPage</NavLink>
        {' | '}
        <Link href="/">Navigate outside App to Next.js page</Link>
      </nav>
      <hr />
      <Suspense fallback={<div>Loading Page</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

function ReportLayout() {
  const accounts = useAtomValue(accountsLoadableAtom);
  console.log('render Report')
  switch (accounts.state) {
    case 'loading':
      return <>Loading accounts...</>
    case 'hasData':
      return accounts.data.length === 0 ? <Navigate to="/welcome" /> : <Accounts accounts={accounts.data} />
    case 'hasError':
      return <>Something went wrong.</>
  }
}

function Accounts({ accounts }: { accounts: Account[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchAccountId = searchParams.get('accountId');
  useEffect(() => {
    if (!searchAccountId) {
      setSearchParams(prev => {
        prev.set('accountId', accounts[0].accountId)
        return prev;
      });
    }
  }, [accounts, setSearchParams, searchAccountId]);

  if (!searchAccountId) {
    // initializing
    return null;
  }

  if (!accounts.find(x => x.accountId === searchAccountId)) {
    return (
      <Navigate to="/404" />
    )
  }

  return (
    <>
      <div>
        <select value={searchAccountId} onChange={e => {
          setSearchParams([['accountId', e.target.value]])
        }}>
          {accounts.map(x => (
            <option key={x.accountId} value={x.accountId}>{x.accountName}</option>
          ))}
        </select>
      </div>
      <hr />
      <Outlet />
    </>
  )
}

function Root() {
  const location = useLocation();
  const setLocation = useSetAtom(locationAtom);
  useEffect(() => {
    setLocation(location.pathname)
  }, [location.pathname]);
  return (
    <>
      react-router-dom location: {JSON.stringify(location)}
      <hr />
      <Outlet />
    </>
  )
}

const Dashboard = lazy(() => sleep(500).then(() => import('./Dashboard')));
const PerformanceLayout = lazy(() => sleep(500).then(() => import('./Performance')));
const Setting = lazy(() => sleep(500).then(() => import('./Setting')));

export function App() {
  return (
    <BrowserRouter basename="/spa">
      <Routes>
        <Route element={<Root />}>
          <Route element={<Authed />}>
            <Route element={<AppLayout />}>
              <Route element={<ReportLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="performance" element={<PerformanceLayout />}>
                  <Route path="subpage1" element={<h2>Subpage1</h2>} />
                  <Route path="subpage2" element={<h2>Subpage2</h2>} />
                  <Route path="*" element={<Navigate to="subpage1" />} />
                </Route>
              </Route>
              <Route path="setting/*" element={<Setting />} />
              <Route path="welcome" element={<h1>Welcome Page</h1>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
            <Route path="/" element={<Navigate to="dashboard" />} />
          </Route>
          <Route path="public" element={<UnAuthed />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}