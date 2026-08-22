function PropertiesPage() {
    return (
        <div className="space-y-6">
            <h1>Properties</h1>

            <h2 className="text-2xl font-semibold">Rosewood Condos</h2>

            <div className="rounded-lg bg-white p-6 shadow space-y-1">
                <p>Main Street</p>
                <p>Toronto, ON M1R 1A9</p>
                <p>100 units</p>
            </div>
            <h3 className="text-xl font-semibold">Units</h3>
            <div className="rounded-lg bg-white p-4 shadow">
                <p>Unit 101</p>
                <p>Owner: John Smith</p>
                <p>Rented: No</p>
            </div>
        </div>
    )
}

export default PropertiesPage