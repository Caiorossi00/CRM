const BASE_URL = "http://localhost:3000";

export async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.erro || "Erro na requisição");
  }

  return res.status === 204 ? null : res.json();
}
