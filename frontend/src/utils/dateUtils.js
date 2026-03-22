export function formatarData(data) {
  if (!data) return "—";

  if (typeof data === "string") {
    if (data.includes("/")) return data;
    const d = new Date(data);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("pt-BR");
  }

  if (data instanceof Date) {
    if (isNaN(data)) return "—";
    return data.toLocaleDateString("pt-BR");
  }

  return "—";
}
