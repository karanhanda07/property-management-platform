import { NavLink, Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <aside className="w-full bg-slate-900 p-4 text-white md:w-64">
                <h2 className="mb-6 text-xl font-semibold">Property Management</h2>

                <nav className="flex gap-4 md:flex-col">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'rounded bg-slate-700 px-3 py-2' : 'rounded px-3 py-2'
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/properties"
                        className={({ isActive }) =>
                            isActive ? 'rounded bg-slate-700 px-3 py-2' : 'rounded px-3 py-2'
                        }
                    >
                        Properties
                    </NavLink>

                    <NavLink
                        to="/tenants"
                        className={({ isActive }) =>
                            isActive ? 'rounded bg-slate-700 px-3 py-2' : 'rounded px-3 py-2'
                        }
                    >
                        Tenants
                    </NavLink>

                    <NavLink
                        to="/leases"
                        className={({ isActive }) =>
                            isActive ? 'rounded bg-slate-700 px-3 py-2' : 'rounded px-3 py-2'
                        }
                    >
                        Leases
                    </NavLink>

                    <NavLink
                        to="/maintenance"
                        className={({ isActive }) =>
                            isActive ? 'rounded bg-slate-700 px-3 py-2' : 'rounded px-3 py-2'
                        }
                    >
                        Maintenance
                    </NavLink>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout