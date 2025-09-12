// Add this temporary route to test DB connection
export async function GET({ locals }) {
  try {
    const DB = locals.runtime.env.DB;
    const test = await DB.prepare("SELECT * FROM lyrics").all();
    return new Response(JSON.stringify(test), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
