export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/properties" && request.method === "GET") {
			const result = await env.property_management_db
				.prepare(
					`SELECT
            id,
            name,
            address,
            city,
            province,
            postal_code,
            total_units
          FROM properties
          ORDER BY id`
				)
				.all();

			return Response.json(result.results);
		}

		if (url.pathname === "/api/units" && request.method === "GET") {
			const result = await env.property_management_db
				.prepare(
					`SELECT
            units.id,
            units.property_id,
            units.unit_number,
            owners.first_name || ' ' || owners.last_name AS owner_name,
            units.is_rented
          FROM units
          JOIN owners ON units.owner_id = owners.id
          ORDER BY units.id`
				)
				.all();

			return Response.json(result.results);
		}
		if (url.pathname === "/api/tenants" && request.method === "GET") {
			const result = await env.property_management_db
				.prepare(
					`SELECT
        id,
        first_name,
        last_name,
        email,
        phone
      FROM tenants
      ORDER BY id`
				)
				.all();

			return Response.json(result.results);
		}
		if (url.pathname.startsWith("/api/units/") && request.method === "GET") {
			const unitId = url.pathname.split("/").pop()

			const result = await env.property_management_db
				.prepare(
					`SELECT
        units.id,
        units.property_id,
        units.unit_number,
        owners.first_name || ' ' || owners.last_name AS owner_name,
        owners.email AS owner_email,
        owners.phone AS owner_phone,
        units.is_rented
      FROM units
      JOIN owners ON units.owner_id = owners.id
      WHERE units.id = ?`
				)
				.bind(unitId)
				.first()

			if (!result) {
				return Response.json(
					{ error: "Unit not found" },
					{ status: 404 }
				)
			}

			return Response.json(result)
		}
		if (url.pathname.startsWith("/api/tenants/") && request.method === "GET") {
			const tenantId = url.pathname.split("/").pop()

			const result = await env.property_management_db
				.prepare(
					`SELECT
        id,
        first_name,
        last_name,
        email,
        phone
      FROM tenants
      WHERE id = ?`
				)
				.bind(tenantId)
				.first()

			if (!result) {
				return Response.json(
					{ error: "Tenant not found" },
					{ status: 404 }
				)
			}

			return Response.json(result)
		}
		if (url.pathname === "/api/dashboard" && request.method === "GET") {
			const properties = await env.property_management_db
				.prepare("SELECT COUNT(*) AS total FROM properties")
				.first()

			const units = await env.property_management_db
				.prepare("SELECT COUNT(*) AS total FROM units")
				.first()

			const rented = await env.property_management_db
				.prepare("SELECT COUNT(*) AS total FROM units WHERE is_rented = 1")
				.first()

			const tenants = await env.property_management_db
				.prepare("SELECT COUNT(*) AS total FROM tenants")
				.first()

			return Response.json({
				properties: properties?.total ?? 0,
				units: units?.total ?? 0,
				rented: rented?.total ?? 0,
				available: Number(units?.total ?? 0) - Number(rented?.total ?? 0),
				tenants: tenants?.total ?? 0,
			})
		}
		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;