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
		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;