# -*- coding: utf-8 -*-
"""
PaluWatch AI — Maquette du modèle de prédiction (démonstration)
================================================================

Ce script illustre le cœur du pipeline prédictif de PaluWatch AI sur des
données SIMULÉES : à partir de variables environnementales hebdomadaires
(pluie, humidité, température, indice d'eaux stagnantes) et de l'historique
des cas, un modèle Random Forest prédit le nombre de cas de paludisme
3 semaines à l'avance, puis classe chaque district en niveau de risque.

En production, les mêmes étapes s'appliquent aux données réelles :
  collecte -> features -> entraînement -> prédiction -> niveau de risque -> alerte

Dépendances : numpy, pandas, scikit-learn
    pip install numpy pandas scikit-learn

Usage :
    python prediction_demo.py
"""

from __future__ import annotations

import sys

try:
    import numpy as np
    import pandas as pd
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.metrics import mean_absolute_error, r2_score
    from sklearn.model_selection import train_test_split
except ImportError:
    sys.exit(
        "Dépendances manquantes. Installez-les avec :\n"
        "    pip install numpy pandas scikit-learn"
    )

RNG = np.random.default_rng(42)

HORIZON_SEMAINES = 3          # on prédit les cas à S+3
N_SEMAINES = 260              # ~5 ans d'historique simulé par district
DISTRICTS = [
    "Atacora", "Alibori", "Borgou", "Donga", "Collines", "Zou",
    "Plateau", "Couffo", "Mono", "Atlantique", "Ouémé", "Littoral",
]

# Seuils de classification du risque (cas hebdomadaires pour 100 000 hab.)
SEUILS_RISQUE = [(50, "Faible 🟢"), (120, "Modéré 🟡"), (250, "Élevé 🟠")]


def niveau_risque(cas_pour_100k: float) -> str:
    """Convertit une incidence prédite en niveau de risque affichable."""
    for seuil, libelle in SEUILS_RISQUE:
        if cas_pour_100k < seuil:
            return libelle
    return "Critique 🔴"


def simuler_district(nom: str) -> pd.DataFrame:
    """Génère un historique hebdomadaire plausible pour un district.

    La dynamique simulée reproduit les mécanismes connus du paludisme :
    les cas suivent la pluie et l'humidité avec un décalage de 2 à 4
    semaines (cycle de reproduction du moustique + incubation).
    """
    t = np.arange(N_SEMAINES)
    saison = np.sin(2 * np.pi * (t % 52) / 52 - np.pi / 2) + 1  # 0..2, pic en saison des pluies

    pluie = np.clip(40 * saison + RNG.normal(0, 12, N_SEMAINES), 0, None)          # mm/semaine
    humidite = np.clip(55 + 15 * saison + RNG.normal(0, 4, N_SEMAINES), 30, 100)   # %
    temperature = 27 + 2 * np.sin(2 * np.pi * t / 52) + RNG.normal(0, 0.7, N_SEMAINES)
    eaux_stagnantes = np.clip(                                                      # indice 0-100 (vision satellite)
        0.6 * pluie + RNG.normal(0, 8, N_SEMAINES), 0, 100
    )

    # Incidence : effet retardé de l'environnement + autocorrélation + bruit
    base = 30 + RNG.uniform(0, 40)  # niveau endémique propre au district
    cas = np.zeros(N_SEMAINES)
    for i in range(N_SEMAINES):
        env = (
            1.4 * pluie[i - 3] + 0.9 * humidite[i - 2] + 0.8 * eaux_stagnantes[i - 3]
            if i >= 3 else 60.0
        )
        inertie = 0.55 * cas[i - 1] if i >= 1 else base
        cas[i] = max(0, 0.45 * env + inertie + RNG.normal(0, 12))

    return pd.DataFrame({
        "district": nom,
        "semaine": t,
        "pluie_mm": pluie.round(1),
        "humidite_pct": humidite.round(1),
        "temperature_c": temperature.round(1),
        "eaux_stagnantes_idx": eaux_stagnantes.round(1),
        "cas_100k": cas.round(1),
    })


def construire_features(df: pd.DataFrame) -> pd.DataFrame:
    """Variables explicatives : environnement récent + historique des cas.

    Chaque ligne décrit la situation à la semaine S ; la cible est
    l'incidence observée à S+HORIZON.
    """
    g = df.sort_values("semaine").copy()
    for lag in (1, 2, 3, 4):
        g[f"pluie_lag{lag}"] = g["pluie_mm"].shift(lag)
        g[f"cas_lag{lag}"] = g["cas_100k"].shift(lag)
    g["humidite_moy4"] = g["humidite_pct"].rolling(4).mean()
    g["eaux_moy4"] = g["eaux_stagnantes_idx"].rolling(4).mean()
    g["tendance_cas"] = g["cas_100k"].diff(4)
    g["cible_cas_100k"] = g["cas_100k"].shift(-HORIZON_SEMAINES)
    return g.dropna()


def main() -> None:
    print("=" * 64)
    print("PaluWatch AI — démonstration du modèle prédictif (données simulées)")
    print("=" * 64)

    # 1. Données
    donnees = pd.concat([simuler_district(d) for d in DISTRICTS], ignore_index=True)
    dataset = pd.concat(
        [construire_features(g) for _, g in donnees.groupby("district")],
        ignore_index=True,
    )
    features = [c for c in dataset.columns if c not in ("district", "semaine", "cible_cas_100k")]
    X, y = dataset[features], dataset["cible_cas_100k"]
    print(f"\nDataset : {len(dataset)} observations, {len(features)} variables, "
          f"{len(DISTRICTS)} districts, horizon S+{HORIZON_SEMAINES}")

    # 2. Entraînement / évaluation
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    modele = RandomForestRegressor(n_estimators=200, min_samples_leaf=3, random_state=42, n_jobs=-1)
    modele.fit(X_train, y_train)
    pred = modele.predict(X_test)
    print(f"MAE  : {mean_absolute_error(y_test, pred):6.1f} cas/100k "
          f"(erreur moyenne de prédiction)")
    print(f"R²   : {r2_score(y_test, pred):6.3f}")

    # 3. Importance des variables — quels signaux pilotent la prédiction ?
    importances = (
        pd.Series(modele.feature_importances_, index=features)
        .sort_values(ascending=False)
        .head(6)
    )
    print("\nVariables les plus prédictives :")
    for nom, imp in importances.items():
        print(f"  {nom:<22} {'█' * int(imp * 60)} {imp:.2f}")

    # 4. Prédiction opérationnelle : dernier état connu de chaque district
    print(f"\nPrédiction à S+{HORIZON_SEMAINES} par district (dernière semaine connue) :")
    print(f"  {'District':<12} {'Cas prédits/100k':>17}   Niveau de risque")
    derniere = dataset.groupby("district").tail(1)
    for _, ligne in derniere.iterrows():
        cas_pred = float(modele.predict(ligne[features].to_frame().T)[0])
        print(f"  {ligne['district']:<12} {cas_pred:>17.0f}   {niveau_risque(cas_pred)}")

    print("\nEn production : ces prédictions alimentent la carte des risques et")
    print("déclenchent les alertes SMS/ministère (voir le tableau de bord).")


if __name__ == "__main__":
    main()
