import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";

export default function Setting() {
    return (
        <div style={{ padding: 10 }}>
            <h1>Setting Page</h1>
            <hr />
            <nav>
                <NavLink to="user">User</NavLink>
                <NavLink to="preference">Preference</NavLink>
            </nav>
            <div>
                <Routes>
                    <Route path="user" element={<h2>User</h2>} />
                    <Route path="preference" element={<h2>Preference</h2>} />
                    <Route path="*" element={<Navigate to="user" />} />
                </Routes>
            </div>
        </div>
    )
}