# PaluWatch AI — Dossier de projet complet

**Système Intelligent de Prédiction, Surveillance et Réponse Précoce contre le Paludisme en Afrique**

> « Anticiper le paludisme pour sauver des vies. »

*Version 1.0 — août 2026*

---

## 1. Contexte et justification

Le paludisme demeure l'une des principales causes de mortalité en Afrique subsaharienne. Selon les statistiques de l'OMS :

- L'Afrique concentre plus de 90 % des cas mondiaux.
- Les enfants de moins de 5 ans et les femmes enceintes sont les plus touchés.
- Les autorités sanitaires interviennent souvent après l'apparition des foyers épidémiques.

**Le principal défi est l'absence d'un système capable de prédire les zones à risque avant l'apparition massive des cas.**

## 2. Vision du projet

Développer une plateforme d'intelligence artificielle capable de :

- prédire les flambées de paludisme ;
- cartographier les zones à risque ;
- surveiller l'évolution en temps réel ;
- guider les interventions des autorités sanitaires.

## 3. Objectif général

Réduire la mortalité et la morbidité liées au paludisme grâce à la prédiction précoce basée sur l'IA et l'analyse de données environnementales et sanitaires.

## 4. Objectifs spécifiques

| # | Objectif |
|---|----------|
| OS1 | Collecter les données environnementales influençant le développement des moustiques |
| OS2 | Prédire les foyers de paludisme plusieurs semaines à l'avance |
| OS3 | Alerter automatiquement les autorités sanitaires |
| OS4 | Optimiser la distribution des moustiquaires, médicaments et tests rapides |
| OS5 | Créer un tableau de bord national de surveillance |

## 5. Problème résolu

**Aujourd'hui :**

- ❌ Les campagnes de lutte sont souvent réactives.
- ❌ Les ressources sont limitées.
- ❌ Les données sont dispersées.
- ❌ Les zones rurales sont mal surveillées.

**Avec PaluWatch AI :**

- ✅ Les risques sont prédits avant les épidémies.
- ✅ Les ressources sont envoyées au bon endroit.
- ✅ Les interventions sont ciblées.

## 6. Architecture de la solution

### Couche 1 : Collecte des données

**Données météorologiques** — température, humidité, précipitations, vitesse du vent.
*Sources : satellites, stations météo, API climatiques.*

**Données environnementales** — présence d'eaux stagnantes, zones inondables, végétation, occupation du sol.

**Données sanitaires** — cas déclarés, admissions hospitalières, décès, résultats de tests.

**Données communautaires** — signalement via SMS, USSD, application mobile.
*Exemple : « 20 cas de fièvre observés dans le village. »*

## 7. Intelligence artificielle

Le cœur du système repose sur plusieurs modèles.

### Machine Learning

Prédiction du nombre de cas futurs, des zones à risque et de la vitesse de propagation.

Modèles : **Random Forest**, **XGBoost**, **LSTM**, **Prophet**.

### Vision par ordinateur

Analyse des images satellites pour détecter : mares, inondations, zones de reproduction des moustiques.

### IA générative

Assistant conversationnel de santé publique.

> *« Quels districts risquent une flambée dans les 30 prochains jours ? »* → Réponse instantanée.

## 8. IoT et objets connectés

Installation de micro-capteurs solaires dans les villages mesurant : humidité, température, pluviométrie.

Transmission : **LoRaWAN**, **GSM**, **Satellite**.

## 9. Cartographie intelligente

Une carte interactive affiche les niveaux de risque :

| Niveau | Signification |
|--------|---------------|
| 🟢 | Faible risque |
| 🟡 | Risque modéré |
| 🟠 | Risque élevé |
| 🔴 | Risque critique |

Les autorités visualisent immédiatement les zones prioritaires.

## 10. Application mobile

**Pour les citoyens** — déclaration de symptômes, conseils de prévention, alertes météo-santé, géolocalisation du centre de santé le plus proche.

**Pour les agents de santé** — saisie des cas, suivi communautaire, alertes IA.

**Pour les décideurs** — tableaux de bord, statistiques, cartographie nationale.

## 11. Système d'alerte précoce

Lorsque l'IA détecte un risque :

**Notification SMS (population)**
> Risque élevé de paludisme dans la commune de Kandi durant les 15 prochains jours.

**Notification ministère**
> Niveau d'alerte : Orange — Probabilité d'épidémie : 78 %

## 12. Cas d'usage au Bénin

La saison des pluies commence dans l'Atacora. Le système détecte : forte humidité, pluies abondantes, hausse des cas dans les villages voisins. **L'IA prévoit une flambée dans 3 semaines.**

Actions automatiques :

1. Distribution de moustiquaires ;
2. Campagnes de sensibilisation ;
3. Renforcement des stocks d'antipaludiques ;
4. Déploiement d'agents communautaires.

**Résultat : l'épidémie est évitée.**

## 13. Technologies

| Domaine | Technologies |
|---------|--------------|
| Backend | Django, FastAPI |
| Base de données | PostgreSQL, PostGIS |
| IA | TensorFlow, PyTorch, Scikit-Learn |
| SIG | QGIS, GeoServer |
| Mobile | Flutter |
| IoT | ESP32, LoRa |
| Cloud | AWS, Azure, OVHcloud |

## 14. Innovation majeure : jumeau numérique sanitaire

Chaque district possède une copie virtuelle dynamique. Le système simule :

- les pluies futures ;
- la propagation des moustiques ;
- l'impact des interventions.

Les décideurs peuvent **tester différents scénarios avant d'agir**.

## 15. Impact attendu

**Sanitaire** — réduction des cas de paludisme, de la mortalité infantile et des hospitalisations.

**Économique** — réduction des coûts de traitement, meilleure allocation des ressources.

**Social** — protection des populations vulnérables, renforcement de la résilience communautaire.

---

## 16. Feuille de route

| Phase | Période | Contenu |
|-------|---------|---------|
| **Phase 0 — Préparation** | Mois 1–3 | Étude de faisabilité, conventions de partage de données (Ministère de la Santé, PNLP, Météo-Bénin), conception détaillée, recrutement de l'équipe |
| **Phase 1 — Pilote** | Mois 4–12 | Déploiement pilote dans l'**Atacora** et l'**Alibori** : 150 capteurs IoT, intégration des données sanitaires des districts, premiers modèles prédictifs, tableau de bord v1, alertes SMS |
| **Phase 2 — Extension nationale** | Mois 13–24 | Couverture des **12 départements**, application mobile grand public, jumeau numérique v1, intégration au système national d'information sanitaire (DHIS2) |
| **Phase 3 — Régionalisation** | Mois 25–36 | Extension aux pays voisins (Togo, Burkina Faso, Niger), API ouverte pour la recherche, tableau de bord régional CEDEAO |

## 17. Budget estimatif (pilote — 24 mois)

| Poste | Montant (FCFA) | Équivalent (EUR) |
|-------|----------------|------------------|
| Développement de la plateforme (web, mobile, IA) | 120 000 000 | ≈ 183 000 |
| Capteurs IoT (150 unités + passerelles LoRaWAN) | 45 000 000 | ≈ 69 000 |
| Infrastructure cloud, hébergement, passerelle SMS | 30 000 000 | ≈ 46 000 |
| Acquisition et intégration des données (satellites, météo) | 25 000 000 | ≈ 38 000 |
| Personnel (data scientists, développeurs, épidémiologiste) | 80 000 000 | ≈ 122 000 |
| Formation des agents de santé et sensibilisation | 20 000 000 | ≈ 30 500 |
| Contingence (≈ 10 %) | 32 000 000 | ≈ 49 000 |
| **Total** | **352 000 000** | **≈ 537 500** |

## 18. Modèle économique et durabilité

- **Licence gouvernementale (SaaS)** : abonnement annuel du Ministère de la Santé couvrant l'exploitation, la maintenance et les mises à jour des modèles.
- **Financements internationaux** : Fonds mondial, OMS, Banque mondiale, fondations philanthropiques (lutte antipaludique = priorité mondiale).
- **Services dérivés** : données agrégées et anonymisées pour la recherche, tableaux de bord pour ONG et programmes verticaux.
- **Extension régionale** : mutualisation des coûts d'infrastructure entre pays membres, réduisant le coût unitaire par pays.

## 19. Partenaires cibles

| Catégorie | Partenaires |
|-----------|-------------|
| Institutionnels | Ministère de la Santé du Bénin, Programme National de Lutte contre le Paludisme (PNLP), Agence Nationale des Soins de Santé Primaires |
| Données | Météo-Bénin, IGN Bénin, programmes satellitaires (Copernicus, NASA Earth Data) |
| Académiques | Université d'Abomey-Calavi (UAC), instituts de recherche en santé publique |
| Internationaux | OMS, Fonds mondial, UNICEF, Banque mondiale |
| Techniques | Opérateurs télécoms (MTN, Moov Africa) pour SMS/USSD, hébergeurs cloud |
| Communautaires | Agents de santé communautaires, relais villageois, ONG locales |

## 20. Risques et mesures d'atténuation

| Risque | Impact | Atténuation |
|--------|--------|-------------|
| Qualité/complétude des données sanitaires | Prédictions peu fiables | Signalement communautaire redondant, contrôles qualité automatiques, apprentissage sur données partielles |
| Connectivité limitée en zone rurale | Perte de remontées terrain | Multi-canal (LoRaWAN + GSM + satellite), mode hors-ligne de l'app mobile avec synchronisation différée |
| Faible adoption par les agents de terrain | Système sous-utilisé | Co-conception avec les agents, interfaces simples (USSD sans smartphone), formation continue |
| Maintenance des capteurs | Trous de données | Capteurs solaires basse maintenance, alertes de panne automatiques, stock de rechange local |
| Confidentialité des données de santé | Risque juridique et éthique | Anonymisation systématique, conformité à la loi n° 2017-20 (protection des données personnelles au Bénin), hébergement souverain possible |
| Dépendance aux financements externes | Arrêt du service | Modèle SaaS gouvernemental dès la phase 2, mutualisation régionale |

## 21. Indicateurs de suivi (KPI)

| Indicateur | Cible (fin de pilote) |
|------------|----------------------|
| Précision des prédictions à 3 semaines (rappel des flambées détectées) | ≥ 80 % |
| Délai moyen entre détection du risque et alerte aux autorités | < 24 h |
| Taux de disponibilité des capteurs IoT | ≥ 90 % |
| Taux de réponse aux alertes (action déclenchée) | ≥ 75 % |
| Réduction de l'incidence dans les zones pilotes vs zones témoins | −25 % |
| Agents de santé formés et actifs sur la plateforme | ≥ 500 |

## 22. Conclusion

PaluWatch AI transforme la lutte contre le paludisme d'une logique **réactive** (soigner après l'épidémie) en une logique **prédictive** (agir avant la flambée). En combinant données environnementales, sanitaires et communautaires avec des modèles d'IA éprouvés, le projet donne aux autorités sanitaires un outil concret pour sauver des vies et optimiser des ressources limitées — au Bénin d'abord, puis à l'échelle régionale.

---

*Prototype de démonstration : voir le [README](README.md) pour lancer et déployer l'application. Présentation : `public/presentation.html`. Maquette du modèle prédictif : `ml/prediction_demo.py`.*
