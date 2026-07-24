# Earth Spas interactieve keuzehulp

Een interactieve one-page Next.js website voor Jeroen / Earth Spas. De pagina laat keuzes voor platform, accounts, marketingbudget, AI/API-verbruik, maatwerk en Volkers inzet direct doorrekenen.

## Functies

- Tailwind CSS v4 met het aangeleverde Earth Spas thema
- Barlow voor bodytekst en Barlow Semi Condensed voor headings
- Shadcn/Radix-achtige sliders, switches, kaarten en tabellen
- Live maand- en jaarbudget
- Verwachte extra verkopen en omzetgroei
- Break-even op basis van brutomarge
- Externe marktwaarde en ontwikkeltijd van maatwerk
- Budgetdonut, omzetgrafiek en verkoopramp
- Automatisch opslaan in localStorage
- Printen / opslaan als PDF
- Volledig responsive
- `noindex` metadata
- Statische export mogelijk

## Lokaal draaien

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Productiebuild

```bash
npm run build
```

Door `output: "export"` staat de statische uitvoer daarna in de map `out/`.

## Deployen op Vercel

1. Maak een nieuwe GitHub-repository of plaats deze map in een bestaand project.
2. Push de bestanden.
3. Importeer de repository in Vercel.
4. Zet eventueel Vercel Deployment Protection aan, omdat deze pagina alleen voor Jeroen bedoeld is.

## Belangrijke afbakening

De operationele calculator telt software, hosting, AI/API, contentreserve en advertenties op. De vergoeding of tegenprestatie voor Volkers inzet staat bewust niet in het model. Marktwaardes van maatwerk zijn indicatieve externe vergelijkingsbedragen en worden niet bij het operationele budget opgeteld.
