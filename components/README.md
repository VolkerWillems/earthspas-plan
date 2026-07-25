# Earth Spas UI foundation

Deze map bevat de herbruikbare UI-basis voor de interne beslissite en toekomstige Earth Spas-producten.

## Huidige technische basis

- shadcn/ui wordt gebruikt als source-componentworkflow, niet als runtime componentpakket.
- `@7ovr` en `@bklit` zijn geregistreerd in `components.json`.
- Reeds geïnstalleerde registrycode staat lokaal in de repository en wordt niet automatisch opnieuw gedownload.
- `motion` is de enige directe React-animatiedependency. Importeer animaties uit `motion/react`.
- `framer-motion` mag niet als directe dependency of directe import worden toegevoegd. Een vermelding in `package-lock.json` kan onderdeel zijn van de interne dependencyboom van `motion` en is op zichzelf geen tweede animatielaag.
- Bklit-chartprimitives staan onder `components/charts`.
- 7Ovr-achtige businessblokken staan onder `components/blocks` en in de bestaande blockcomponenten.

## Componentlagen

- `components/ui`: kleine toegankelijke primitives, zoals Button, Card, Badge, Input, Checkbox en Table.
- `components/layout`: SiteShell, SiteHeader en pagina-compositie.
- `components/navigation`: navigatiedata en desktop-/mobiele navigatie.
- `components/forms`: samengestelde formuliervelden en gevalideerde formuliersecties.
- `components/data-display`: tabellen, metrics, chart shells en dashboards.
- `components/feedback`: alerts, voortgang, empty states, loading en errors.
- `components/motion`: herbruikbare Motion-wrappers, flownodes en reduced-motiongedrag.
- `components/blocks`: complete bedrijfssecties zoals integrations, timelines, growth cards en showcases.
- `components/pwa`: installatie- en apparaatspecifiek gedrag.

Importeer waar mogelijk via publieke indexbestanden. Root-level componenten blijven alleen bestaan als compatibiliteitslaag zolang pagina's worden gemigreerd.

## Vast stylesheetcontract

`app/globals.css` importeert uitsluitend `styles/index.css`.

De map `styles` bevat exact vier CSS-bestanden:

- `styles/theme.css`: kleuren, surfaces, typografie, radii, shadows en semantische tokens.
- `styles/components.css`: Tailwind-import, base layer, gedeelde componentselectors en layoutregels. Dit bestand importeert `theme.css`.
- `styles/responsive.css`: bestaande fluid/responsive overrides, media queries en containerregels. Voeg hier geen nieuwe losstaande tokenfamilies toe; nieuwe canonieke tokens horen in `theme.css`.
- `styles/index.css`: importeert `components.css` en `responsive.css` en bevat de bestaande globale compatibiliteits- en samengevoegde regels. Splits deze regels niet opnieuw uit naar extra stylesheets zonder een afzonderlijk migratiebesluit.

De oude bestanden `cards.css`, `ui.css`, `flows.css`, `charts.css`, `motion.css` en `motion-base.css` zijn geen zelfstandige stylesheets meer. Hun nog benodigde regels zijn geconsolideerd in de vier canonieke bestanden.

## UI-regels

1. Gebruik een gedeelde primitive voordat route-specifieke markup wordt gemaakt.
2. Gebruik `Card`/`Panel` voor gewone oppervlakken en `StatCard` voor KPI's. Introduceer geen derde algemene kaartfamilie.
3. Gebruik Phosphor als Earth Spas-producticonenset. Lucide blijft alleen beschikbaar voor shadcn- en registrycompatibiliteit.
4. Gebruik CSS-transitions voor eenvoudige hover- en focusstates. Gebruik Motion alleen voor state, layout, gestures en georkestreerde animatie.
5. Respecteer `prefers-reduced-motion` in ieder geanimeerd blok.
6. Hardcode geen merkkleuren, spacing, radii, shadows of typegroottes. Gebruik de variabelen uit `styles/theme.css`.
7. Voeg geen route-specifieke CSS-bestanden of CSS-modules toe.
8. Registrycomponenten moeten vóór gebruik worden aangepast aan Earth Spas-tokens.

## Registrypolicy

- Installeer alleen een concreet gekozen component, nooit een volledige collectie uit nieuwsgierigheid.
- Gebruik nooit `--overwrite`.
- Voeg geen `ui:sync`, `ui:add` of andere automatische registry-regeneratie toe.
- Controleer na iedere installatie de wijzigingen in `components.json`, `package.json`, `styles`, `app/globals.css` en de nieuwe componentbestanden.
- Een registry mag geen nieuwe globale kleuren, radii, spacing scale, shadows of fonts introduceren.
- React Bits en Uiverse leveren hooguit een lokaal effect of variant; zij worden geen afzonderlijk designsysteem.
- Inactieve choropleth- en geanimeerde flowcode mag blijven bestaan, maar wordt alleen opnieuw gerenderd na controle van data, layout, tokens en reduced motion.

## Automatische controle

Voer lokaal uit:

```bash
npm run styles:check
```

Dezelfde controle draait vóór iedere dev-run en productiebuild via `styles:consolidate`. De controle stopt de build bij:

- meer of minder dan vier stylesheets;
- verkeerde globale CSS-imports;
- ontbrekende of gewijzigde `@7ovr`- en `@bklit`-registries;
- een directe `framer-motion`-dependency of import;
- `shadcn --overwrite`;
- terugkerende `ui:sync`- of `ui:add`-scripts;
- onverwachte component-level CSS-imports.

Registrycode is een startpunt. Het Earth Spas-theme blijft de enige visuele autoriteit.