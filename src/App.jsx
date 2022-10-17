import { Routes, Route, Outlet, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import('./Dashboard'))

export function App() {
    return (
        <BrowserRouter basename="/v2">
            <div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="dashboard/*" element={
                            <Suspense>
                                <Dashboard />
                            </Suspense>
                        } />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
              </div>
            </BrowserRouter>
    )
}
  
  function Layout() {
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
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
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }