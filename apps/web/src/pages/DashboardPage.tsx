import { useEffect, useState } from 'react'

type DashboardData = {
    properties: number
    units: number
    rented: number
    available: number
    tenants: number
}

function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/dashboard')
            .then((response) => response.json())
            .then((result) => {
                setData(result)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>Unable to load dashboard.</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-500">
                    Overview of your property portfolio
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">Properties</p>
                    <p className="mt-2 text-3xl font-bold">
                        {data.properties}
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">Total Units</p>
                    <p className="mt-2 text-3xl font-bold">
                        {data.units}
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">Rented</p>
                    <p className="mt-2 text-3xl font-bold">
                        {data.rented}
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">Available</p>
                    <p className="mt-2 text-3xl font-bold">
                        {data.available}
                    </p>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
                <p className="text-gray-500">Tenants</p>
                <p className="mt-2 text-3xl font-bold">
                    {data.tenants}
                </p>
            </div>
        </div>
    )
}

export default DashboardPage