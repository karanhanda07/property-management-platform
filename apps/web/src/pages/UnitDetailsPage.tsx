import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Unit = {
    id: number
    property_id: number
    unit_number: string
    owner_name: string
    owner_email: string
    owner_phone: string
    is_rented: number
}

function UnitDetailsPage() {
    const { unitId } = useParams()
    const [unit, setUnit] = useState<Unit | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/units/${unitId}`)
            .then((response) => response.json())
            .then((data) => {
                setUnit(data)
                setLoading(false)
            })
    }, [unitId])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!unit) {
        return <p>Unit not found.</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Unit Details</h1>
                <p className="text-gray-500">
                    Details about unit {unit.unit_number}
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-2xl font-semibold">
                    Unit {unit.unit_number}
                </h2>

                <div className="mt-4 space-y-2">
                    <p>Owner: {unit.owner_name}</p>
                    <p>Email: {unit.owner_email}</p>
                    <p>Phone: {unit.owner_phone}</p>
                    <p>
                        Status: {unit.is_rented ? 'Rented' : 'Available'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UnitDetailsPage