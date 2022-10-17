import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
    return (
      <div>
        <h2>Dashboard Page</h2>
        <hr style={{width: '80%'}}/>
        <Routes>
            <Route index element={(
                <div>
                    <Link to="xxx">Link to inner page</Link>
                </div>
            )} />
            <Route path="xxx" element={(
              <div>
                inner page
                <button onClick={() => navigate(-1)}>go back</button>
              </div>
            )} />
            <Route path="*" element={<div />} />
        </Routes>
      </div>
    );
  }