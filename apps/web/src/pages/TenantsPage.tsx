import { useEffect, useState } from 'react'

type Tenant = {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}

function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/tenants')
            .then((response) => response.json())
            .then((data) => {
                setTenants(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Tenants</h1>
                <p className="text-gray-500">
                    Manage your tenants
                </p>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} className="border-t">
                                <td className="px-6 py-4">
                                    <a
                                        href={`/tenants/${tenant.id}`}
                                        className="font-medium hover:underline"
                                    >
                                        {tenant.first_name} {tenant.last_name}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    {tenant.email}
                                </td>
                                <td className="px-6 py-4">
                                    {tenant.phone}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TenantsPage