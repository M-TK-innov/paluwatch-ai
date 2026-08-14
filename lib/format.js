// Formatage déterministe des nombres (espace comme séparateur de milliers).
// Évite les écarts d'hydratation entre le rendu serveur et le navigateur
// que provoque toLocaleString selon les versions d'ICU.
export function formatNombre(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
