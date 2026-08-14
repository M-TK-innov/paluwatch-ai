import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "PaluWatch AI — Prédiction et surveillance du paludisme",
  description:
    "Système intelligent de prédiction, surveillance et réponse précoce contre le paludisme en Afrique. Anticiper le paludisme pour sauver des vies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main className="conteneur">{children}</main>
        <footer className="pied">
          PaluWatch AI — Prototype de démonstration. Les données affichées sont
          fictives. En cas de fièvre, rendez-vous au centre de santé le plus
          proche.
        </footer>
      </body>
    </html>
  );
}
