import { Routes, Route, Outlet, Link as RouterDOMLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NextLink from 'next/link';
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { useLocation } from "react-router-dom";

const LazyLoadPage = lazy(() => import('./LazyLoadPage'))

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(x => x + 1)}>{count}</button>
  )
}

export function App({ randomVal }) {
  return (
    <BrowserRouter basename="/spa">
      <div>
        Random value from server: {randomVal}
        <hr />
        Client state: <Counter />
        <hr />
        Nested layout:

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="page1" element={<div>Content of Page1</div>} />
            <Route path="page2" element={<div>Content of Page2</div>} />
            <Route path="lazy-load/*" element={
              <Suspense>
                <LazyLoadPage />
              </Suspense>
            } />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function AppLink({ to, children }) {
  // return (
  //   <NextLink href={`/spa${to}`}>{children}</NextLink>
  // );
  return (
    <RouterDOMLink to={to}>{children}</RouterDOMLink>
  )
  const navigate = useNavigate();
  const router = useRouter();
  return (
    <a onClick={() => {
      // navigate(to);
      router.push(`/spa${to}`);
    }} href="#">{children}</a>
  )
}

function Layout() {
  return (
    <div style={{ border: '1px solid black', width: '80%', margin: '0 auto' }} >
      <nav style={{ background: 'azure', padding: 10 }}>
        <ul>
          <li>
            <AppLink to="/">Home</AppLink>
          </li>
          <li>
            <AppLink to="/page1">Page1</AppLink>
          </li>
          <li>
            <AppLink to="/page2">Page2</AppLink>
          </li>
          <li>
            <AppLink to="/lazy-load">Lazy Load</AppLink>
          </li>
          {/* <li>
            <AppLink to="/redirect">Server side /redirect to Page2</AppLink>
          </li> */}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}



function NoMatch() {
  return (
    <div>
      <h2>404 Not found</h2>
      <p>
        <AppLink to="/">Go to the home page</AppLink>
      </p>
    </div>
  );
}
