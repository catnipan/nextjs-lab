import { NavLink, Outlet, Route, Routes } from "react-router-dom";

export default function Page() {
    console.log('render Performance')
    return (
        <div style={{ padding: 10 }}>
            <h1>Performance Page</h1>
            <hr />
            <nav>
                <NavLink to="subpage1">Subpage1</NavLink>
                <NavLink to="subpage2">Subpage2</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}