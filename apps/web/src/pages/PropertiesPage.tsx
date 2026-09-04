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
            <h1>Properties</h1>

            <h2 className="text-2xl font-semibold">{property.name}</h2>

            <div className="rounded-lg bg-white p-6 shadow space-y-1">
                <p>{property.address}</p>
                <p>
                    {property.city}, {property.province} {property.postal_code}
                </p>
                <p>{property.total_units} units</p>
            </div>

            <h3 className="text-xl font-semibold">Units</h3>

            <div className="space-y-4">
                {units.map((unit) => (
                    <div key={unit.id} className="rounded-lg bg-white p-4 shadow">
                        <p>Unit {unit.unit_number}</p>
                        <p>Owner: {unit.owner_name}</p>
                        <p>Rented: {unit.is_rented ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PropertiesPage