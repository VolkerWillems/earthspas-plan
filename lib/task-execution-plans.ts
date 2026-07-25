export type TaskExecutionLink = {
  label: string;
  href: string;
};

export type TaskExecutionPlan = {
  intro: string;
  steps: string[];
  links: TaskExecutionLink[];
};

export const taskExecutionPlans: Record<string, TaskExecutionPlan> = {
  "billing-inventory": {
    intro: "Maak eerst één feitelijk accountregister. Zonder dat overzicht wordt een overdracht al snel een speurtocht langs vergeten logins en verlopen kaarten.",
    steps: [
      "Noteer per platform de huidige eigenaar, beheerder, herstelmail, betaalmethode en factuurgegevens.",
      "Markeer of het account al van Earth Spas is, moet worden overgedragen of opnieuw moet worden aangemaakt.",
      "Leg per platform vast wie de primaire en tweede beheerder worden.",
      "Controleer na iedere overdracht toegang, billing, herstel en exportmogelijkheden.",
    ],
    links: [{ label: "Open provideroverzicht", href: "/calculator" }],
  },
  "billing-email": {
    intro: "Gebruik één zakelijke Earth Spas-mailbox als centrale route voor facturen, beveiligingsmeldingen en herstelcodes.",
    steps: [
      "Maak in de nieuwe Microsoft 365-tenant een centrale billing- en herstelmailbox aan.",
      "Geef minimaal twee vaste beheerders toegang tot deze mailbox.",
      "Vervang persoonlijke e-mailadressen bij alle noodzakelijke platforms.",
      "Test een herstelmail en een factuurmelding voordat oude adressen worden verwijderd.",
    ],
    links: [{ label: "Microsoft 365 Admin Center", href: "https://admin.microsoft.com/" }],
  },
  "payment-card": {
    intro: "Earth Spas kiest zelf een prepaid creditcard. De kaart wordt daarna de vaste betaalroute voor software, hosting, advertenties en AI-verbruik.",
    steps: [
      "Bepaal welk maandelijks maximumbedrag beschikbaar moet zijn.",
      "Vergelijk zakelijke prepaid of virtuele kaarten op limieten, 3D Secure, facturen en opwaarderen.",
      "Vraag de kaart aan op naam en factuurgegevens van Earth Spas.",
      "Koppel de kaart pas na goedkeuring aan de geselecteerde accounts en stel waarschuwingen in.",
    ],
    links: [{ label: "Bekijk het vastgelegde budget", href: "/calculator" }],
  },
  "spend-alerts": {
    intro: "Een betaalkaart zonder limieten is slechts een modernere manier om later verbaasd naar een factuur te kijken.",
    steps: [
      "Stel per platform een maandlimiet of waarschuwing in.",
      "Gebruik aparte limieten voor advertenties, AI/API, hosting en productietools.",
      "Laat waarschuwingen naar de centrale Earth Spas billingmail sturen.",
      "Plan maandelijks een korte controle van werkelijk verbruik tegenover budget.",
    ],
    links: [
      { label: "Vercel Usage", href: "https://vercel.com/dashboard" },
      { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
      { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com/" },
      { label: "Google Ads", href: "https://ads.google.com/" },
    ],
  },
  admins: {
    intro: "Ieder kritisch account krijgt een primaire en tweede Earth Spas-beheerder. Eén beheerder is geen beheerstructuur, maar een toekomstig probleem met een gebruikersnaam.",
    steps: [
      "Wijs twee vaste personen aan met duidelijke verantwoordelijkheid.",
      "Gebruik uitsluitend zakelijke e-mailadressen en persoonlijke 2FA per beheerder.",
      "Bewaar herstelcodes op een afgesproken veilige Earth Spas-locatie.",
      "Test of de tweede beheerder zelfstandig kan inloggen en herstellen.",
    ],
    links: [{ label: "Open volledige actielijst", href: "/checklist" }],
  },
  workspace: {
    intro: "De Earth Spas-mailboxen, agenda's, domeinen en bestanden moeten volledig uit de huidige persoonlijke tenant worden gemigreerd.",
    steps: [
      "Maak of controleer de eigen Earth Spas Microsoft 365-tenant en voeg de licentie toe.",
      "Voeg domeinen toe en verifieer ze zonder de bestaande mailstroom voortijdig te onderbreken.",
      "Maak gebruikers, gedeelde mailboxen en beheerders aan.",
      "Migreer mail, agenda's en bestanden, pas daarna DNS aan en voer een verzend-, ontvangst- en hersteltest uit.",
    ],
    links: [
      { label: "Microsoft 365 Admin Center", href: "https://admin.microsoft.com/" },
      { label: "Microsoft Entra", href: "https://entra.microsoft.com/" },
    ],
  },
  source: {
    intro: "Alle repositories worden eigendom van een Earth Spas GitHub-organisatie met minimaal twee owners en eigen billing.",
    steps: [
      "Maak de Earth Spas GitHub-organisatie aan en selecteer het afgesproken plan.",
      "Voeg twee owners toe en activeer verplichte 2FA.",
      "Draag de relevante repositories over en controleer secrets, actions en deploykoppelingen.",
      "Test een nieuwe deployment voordat toegang vanuit persoonlijke accounts wordt beperkt.",
    ],
    links: [
      { label: "Nieuwe GitHub-organisatie", href: "https://github.com/organizations/new" },
      { label: "GitHub-organisaties beheren", href: "https://github.com/settings/organizations" },
    ],
  },
  registrar: {
    intro: "De domeinen moeten aantoonbaar op Earth Spas staan, inclusief verlenging, contactgegevens, facturering en verhuiscodes.",
    steps: [
      "Controleer per domein de geregistreerde eigenaar en contactgegevens.",
      "Wijzig factuur- en herstelmail naar Earth Spas.",
      "Activeer automatische verlenging met de eigen betaalmethode.",
      "Exporteer de domeinlijst en leg verhuiscodes en verloopdata veilig vast.",
    ],
    links: [{ label: "TransIP Control Panel", href: "https://www.transip.nl/cp/" }],
  },
  dns: {
    intro: "Cloudflare wordt de centrale Earth Spas-laag voor DNS, SSL, redirects en basisbeveiliging.",
    steps: [
      "Maak of controleer het Earth Spas Cloudflare-account en voeg twee beheerders toe.",
      "Exporteer en controleer alle huidige DNS-records voordat nameservers veranderen.",
      "Voeg de domeinen toe en vergelijk records één op één.",
      "Wijzig nameservers, controleer websites en mail en verwijder oude toegang pas na een volledige test.",
    ],
    links: [{ label: "Cloudflare Dashboard", href: "https://dash.cloudflare.com/" }],
  },
  server: {
    intro: "De productieserver en back-ups worden onder een eigen Earth Spas Hetzner-account geplaatst met eigen billing en hersteltoegang.",
    steps: [
      "Maak het Earth Spas Hetzner-account aan en voeg de eigen betaalmethode toe.",
      "Richt het project, de productieserver, firewall, SSH-toegang en monitoring in.",
      "Migreer Directus, automatisering en backendservices met een vooraf gemaakte back-up.",
      "Test verkeer, back-ups en herstel voordat de oude serverroute wordt beëindigd.",
    ],
    links: [{ label: "Hetzner Cloud Console", href: "https://console.hetzner.cloud/" }],
  },
  "backup-restore": {
    intro: "Een back-up telt pas wanneer die aantoonbaar kan worden teruggezet. Tot die tijd is het vooral een geruststellend bestand met onbekende ambities.",
    steps: [
      "Maak exports van database, media, configuratie, workflows en secrets.",
      "Zet de data terug in een afzonderlijke testomgeving.",
      "Controleer inloggen, formulieren, media, workflows en koppelingen.",
      "Documenteer hersteltijd, verantwoordelijke en exacte herstelvolgorde.",
    ],
    links: [
      { label: "Hetzner Console", href: "https://console.hetzner.cloud/" },
      { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
    ],
  },
  cms: {
    intro: "Directus wordt de centrale Earth Spas-bron voor modellen, content, media, SEO en vertalingen.",
    steps: [
      "Controleer schema, rollen, gebruikers en huidige assets.",
      "Maak Earth Spas-beheerders aan en verwijder persoonlijke herstelroutes.",
      "Migreer of verbind de omgeving met de nieuwe Earth Spas-server en database.",
      "Test contentwijzigingen, media, vertalingen, API-toegang en back-up.",
    ],
    links: [{ label: "Directus documentatie", href: "https://directus.io/docs/getting-started/overview" }],
  },
  automation: {
    intro: "Het gekozen automatiseringsplatform krijgt eigen Earth Spas-billing, credentials en beheerders.",
    steps: [
      "Maak of controleer de Earth Spas-omgeving in Make.",
      "Inventariseer alle workflows, triggers, webhooks en gebruikte credentials.",
      "Vervang persoonlijke koppelingen door Earth Spas-accounts en secrets.",
      "Test iedere kritieke flow met logging, foutmelding en een handmatige fallback.",
    ],
    links: [{ label: "Make openen", href: "https://www.make.com/en/login" }],
  },
  database: {
    intro: "Productiedata, storage en authenticatie komen in een eigen Earth Spas Supabase-organisatie met eigen billing en twee beheerders.",
    steps: [
      "Maak de Earth Spas-organisatie en het productieproject aan.",
      "Voeg twee beheerders, eigen billing en spend controls toe.",
      "Migreer schema, data, storage, policies, functies en omgevingsvariabelen.",
      "Test authenticatie, formulieren, uploads, back-up en herstel.",
    ],
    links: [{ label: "Supabase Dashboard", href: "https://supabase.com/dashboard" }],
  },
  frontend: {
    intro: "De websites, domeinen en deployments worden onder een eigen Earth Spas Vercel-team geplaatst.",
    steps: [
      "Maak het Earth Spas-team aan en voeg twee beheerders plus billing toe.",
      "Verbind de Earth Spas GitHub-organisatie.",
      "Draag projecten, domeinen en environment variables over.",
      "Controleer productie, previews, logs, spend controls en rollback met een testdeployment.",
    ],
    links: [{ label: "Vercel Dashboard", href: "https://vercel.com/dashboard" }],
  },
  "transactional-email": {
    intro: "Formulier-, afspraak- en servicemails worden vanuit een eigen Earth Spas Resend-account verstuurd.",
    steps: [
      "Maak het Earth Spas-team en billing in Resend aan.",
      "Voeg de verzenddomeinen toe en plaats SPF-, DKIM- en eventuele DMARC-records in Cloudflare.",
      "Maak nieuwe API-sleutels en vervang persoonlijke sleutels in Vercel en automatiseringen.",
      "Test contact-, showroom- en serviceflows inclusief ontvangst, logging en foutmelding.",
    ],
    links: [
      { label: "Resend Domains", href: "https://resend.com/domains" },
      { label: "Resend domeinuitleg", href: "https://resend.com/docs/dashboard/domains/introduction" },
    ],
  },
  secrets: {
    intro: "API-sleutels en productieconfiguratie worden centraal beheerd en uit persoonlijke accounts en losse documenten verwijderd.",
    steps: [
      "Maak de Earth Spas Doppler-workspace en projecten per omgeving aan.",
      "Voeg twee beheerders toe en definieer development, preview en production.",
      "Roteer bestaande sleutels en plaats alleen de nieuwe waarden in Doppler.",
      "Koppel deployments en workflows, test ze en verwijder daarna oude sleutels.",
    ],
    links: [{ label: "Doppler Dashboard", href: "https://dashboard.doppler.com/" }],
  },
  meta: {
    intro: "Meta Business, Facebook, Instagram, Pixel, datasets en advertentiebilling worden volledig onder Earth Spas geplaatst.",
    steps: [
      "Controleer de eigenaar van Business Portfolio, pagina, Instagram, Pixel, datasets en advertentieaccount.",
      "Voeg minimaal twee Earth Spas-beheerders toe met zakelijke e-mailadressen en 2FA.",
      "Voeg de Earth Spas-betaalmethode en factuurgegevens toe.",
      "Test advertentiepublicatie, Pixel-events, leads en toegang voordat persoonlijke rollen worden verwijderd.",
    ],
    links: [
      { label: "Meta Business Settings", href: "https://business.facebook.com/settings" },
      { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com/" },
    ],
  },
  google: {
    intro: "Google Business Profile, Analytics, Tag Manager, Search Console en eventuele Cloud-billing krijgen Earth Spas-eigendom en twee beheerders.",
    steps: [
      "Maak een lijst van alle Google-assets en huidige eigenaren.",
      "Voeg twee Earth Spas-beheerders toe aan iedere asset.",
      "Controleer dat de juiste domeinen, datastreams, containers en conversies actief zijn.",
      "Test rapportage en hersteltoegang voordat persoonlijke beheerders worden verwijderd.",
    ],
    links: [
      { label: "Google Analytics", href: "https://analytics.google.com/analytics/web/" },
      { label: "Google Tag Manager", href: "https://tagmanager.google.com/" },
      { label: "Search Console", href: "https://search.google.com/search-console" },
      { label: "Google Business Profile", href: "https://business.google.com/" },
    ],
  },
  social: {
    intro: "TikTok, YouTube, Pinterest en LinkedIn krijgen een zakelijke herstelmail, 2FA en minimaal twee beheerders.",
    steps: [
      "Controleer per kanaal de eigenaar, herstelmail en gekoppelde telefoonnummers.",
      "Voeg twee Earth Spas-beheerders toe en activeer 2FA.",
      "Leg merknaam, profiellinks en toegangsrollen centraal vast.",
      "Test publicatie en herstel voordat persoonlijke toegang wordt verwijderd.",
    ],
    links: [
      { label: "TikTok Business", href: "https://business.tiktok.com/" },
      { label: "YouTube Studio", href: "https://studio.youtube.com/" },
      { label: "Pinterest Business", href: "https://www.pinterest.com/business/hub/" },
      { label: "LinkedIn bedrijfspagina", href: "https://www.linkedin.com/company/setup/new/" },
    ],
  },
  "ai-workspace": {
    intro: "Een Earth Spas AI-abonnement wordt alleen geactiveerd wanneer gebruik, eigendom en maandbudget zijn goedgekeurd.",
    steps: [
      "Bepaal wie de vaste gebruikers zijn en waarvoor de omgeving nodig is.",
      "Kies pas daarna het passende abonnement en het maximale maandbudget.",
      "Maak het account of de workspace aan met Earth Spas-mail en billing.",
      "Leg vast welke bedrijfsdata wel en niet in de omgeving mag worden gebruikt.",
    ],
    links: [
      { label: "ChatGPT openen", href: "https://chatgpt.com/" },
      { label: "Controleer de gekozen licentie", href: "/calculator" },
    ],
  },
  "creative-tools": {
    intro: "Productietools worden alleen geactiveerd wanneer concrete productie ze nodig maakt, altijd onder een Earth Spas-account en betaalmethode.",
    steps: [
      "Bepaal per tool welke bestaande bestanden of projecten moeten worden overgedragen.",
      "Maak een Earth Spas-account of team aan en voeg minimaal een tweede beheerder toe waar mogelijk.",
      "Koppel billing alleen voor de tools die daadwerkelijk worden gebruikt.",
      "Exporteer belangrijke bronbestanden en leg licenties centraal vast.",
    ],
    links: [
      { label: "Figma", href: "https://www.figma.com/files/" },
      { label: "Canva", href: "https://www.canva.com/" },
      { label: "GitHub Copilot", href: "https://github.com/settings/copilot" },
      { label: "ElevenLabs", href: "https://elevenlabs.io/app" },
      { label: "Runway", href: "https://app.runwayml.com/" },
    ],
  },
  tracking: {
    intro: "De meting moet de hele route volgen van bron en campagne naar lead, showroomafspraak, offerte en verkoop.",
    steps: [
      "Definieer de belangrijkste conversies en vaste namen voor ieder event.",
      "Configureer events in website, Tag Manager en Analytics.",
      "Stuur leadstatus en verkoopresultaat terug vanuit het CRM.",
      "Test iedere stap met echte testleads en controleer bron, consent en omzetwaarde.",
    ],
    links: [
      { label: "Google Tag Manager", href: "https://tagmanager.google.com/" },
      { label: "Google Analytics", href: "https://analytics.google.com/analytics/web/" },
      { label: "Meta Events Manager", href: "https://business.facebook.com/events_manager2" },
    ],
  },
  privacy: {
    intro: "Voor marketing, klantbeelden, WhatsApp, formulieren en AI-toepassingen moet duidelijk zijn welke toestemming en bewaartermijn geldt.",
    steps: [
      "Inventariseer welke persoonsgegevens per formulier, kanaal en agent worden verwerkt.",
      "Leg doel, rechtsgrond, bewaartermijn en toegang per gegevenssoort vast.",
      "Werk privacyverklaring, cookietekst en toestemmingen bij.",
      "Test intrekken van toestemming, verwijderen van gegevens en menselijke escalatie.",
    ],
    links: [{ label: "Autoriteit Persoonsgegevens · basis AVG", href: "https://www.autoriteitpersoonsgegevens.nl/themas/basis-avg" }],
  },
  acceptance: {
    intro: "De overdracht is pas klaar nadat alle kritieke functies én een rollback gezamenlijk zijn getest.",
    steps: [
      "Maak een acceptatielijst voor website, mail, formulieren, database, workflows en billing.",
      "Voer de volledige klantreis uit met testdata.",
      "Test back-up, herstel en rollback door de tweede beheerder.",
      "Leg resterende fouten vast en geef pas akkoord nadat kritieke punten zijn opgelost.",
    ],
    links: [
      { label: "Open website", href: "https://www.earthspas.nl/" },
      { label: "Open actielijst", href: "/checklist" },
    ],
  },
  budgets: {
    intro: "Vaste kosten en variabele testbudgetten worden afzonderlijk goedgekeurd. Daardoor blijft zichtbaar wat noodzakelijk is en wat alleen wordt ingezet wanneer resultaat dat rechtvaardigt.",
    steps: [
      "Controleer de vaste accounts en hostingkosten.",
      "Bepaal het eerste beperkte advertentie- en contenttestbudget.",
      "Stel aparte limieten in voor AI/API, media en advertenties.",
      "Leg vast bij welk resultaat een budget wordt verhoogd, aangepast of gestopt.",
    ],
    links: [{ label: "Open budgetcalculator", href: "/calculator" }],
  },
  workform: {
    intro: "Leg vast of ondersteuning incidenteel blijft of dat er structureel uren worden gereserveerd voor beheer, marketing en doorontwikkeling.",
    steps: [
      "Kies incidentele ondersteuning of volledig digitaal beheer.",
      "Bepaal bij structureel beheer het aantal vaste uren per week.",
      "Leg prioriteiten, overlegmoment, responstijd en beslissingsbevoegdheid vast.",
      "Leg de tegenprestatie apart vast; die hoort niet in het operationele softwarebudget.",
    ],
    links: [{ label: "Open samenwerkingsvoorstel", href: "/calculator" }],
  },
  "personal-payments": {
    intro: "Persoonlijke accounts, kaarten en tokens worden uitsluitend als laatste verwijderd, nadat Earth Spas alles zelfstandig kan beheren en herstellen.",
    steps: [
      "Controleer dat ieder noodzakelijk platform Earth Spas-eigendom, billing en twee beheerders heeft.",
      "Voer acceptatie-, herstel- en rollbacktests uit.",
      "Roteer persoonlijke API-sleutels en verwijder persoonlijke betaalmethoden.",
      "Verwijder persoonlijke beheerdersrollen en controleer na 48 uur opnieuw alle diensten.",
    ],
    links: [
      { label: "Open volledige actielijst", href: "/checklist" },
      { label: "Controleer providerkeuzes", href: "/calculator" },
    ],
  },
};
