import { useEffect, useState } from 'react'

type Property = {
    id: number
    name: string
    address: string
    city: string
    province: string
    postal_code: string
    total_units: number
}

type Unit = {
    id: number
    property_id: number
    unit_number: string
    owner_name: string
    is_rented: number
}

function PropertiesPage() {
    const [property, setProperty] = useState<Property | null>(null)
    const [units, setUnits] = useState<Unit[]>([])

    useEffect(() => {
        fetch('/api/properties')
            .then((response) => response.json())
            .then((data) => setProperty(data[0]))

        fetch('/api/units')
            .then((response) => response.json())
            .then((data) => setUnits(data))
    }, [])

    if (!property) {
        return <p>Loading...</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Properties</h1>
                <p className="text-gray-500">
                    Manage your properties and units
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-2xl font-semibold">{property.name}</h2>

                <p className="mt-2 text-gray-600">
                    {property.address}
                </p>

                <p className="text-gray-600">
                    {property.city}, {property.province}{' '}
                    {property.postal_code}
                </p>

                <p className="mt-3 font-medium">
                    {property.total_units} units
                </p>
            </div>

            <div>
                <h3 className="mb-4 text-xl font-semibold">Units</h3>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">Unit</th>
                                <th className="px-6 py-3 text-left">Owner</th>
                                <th className="px-6 py-3 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {units.map((unit) => (
                                <tr key={unit.id} className="border-t">
                                    <td className="px-6 py-4">
                                        {unit.unit_number}
                                    </td>

                                    <td className="px-6 py-4">
                                        {unit.owner_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {unit.is_rented ? 'Rented' : 'Available'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PropertiesPage