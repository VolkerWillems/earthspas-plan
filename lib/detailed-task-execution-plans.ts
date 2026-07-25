import { taskExecutionPlans as basePlans, type TaskExecutionPlan } from "@/lib/task-execution-plans";

const detailedPlans: Record<string, TaskExecutionPlan> = {
  "payment-card": {
    intro: "Zodra Earth Spas één prepaid creditcard met een goedgekeurd saldo beschikbaar stelt, kan Volker vrijwel alle technische accounts, teams, licenties en betaalinstellingen namens Earth Spas inrichten. Earth Spas houdt controle via het beschikbare saldo, factuurmail en twee eigen beheerders; Volker hoeft daardoor niet langer privé voor te schieten.",
    steps: [
      "Earth Spas kiest een zakelijke prepaid of virtuele creditcard die online abonnementen, 3D Secure en terugkerende betalingen ondersteunt.",
      "Zet de kaart op naam en factuurgegevens van Earth Spas en koppel de centrale billingmail voor transacties en waarschuwingen.",
      "Stort alleen het vooraf goedgekeurde startbudget en spreek een maandelijks maximumbedrag af.",
      "Deel de kaart veilig met Volker of laat hem tijdens een gezamenlijke sessie de kaart koppelen aan Microsoft, GitHub, Hetzner, Supabase, Vercel, Resend, Meta en andere goedgekeurde accounts.",
      "Volker richt accounts, teams, licenties, billing en spend alerts in; Earth Spas blijft eigenaar en ontvangt alle facturen en waarschuwingen.",
      "Controleer na inrichting het resterende saldo, actieve abonnementen en maandlimieten. Nieuwe kosten worden alleen na expliciet akkoord toegevoegd.",
    ],
    links: [
      { label: "Open goedgekeurde budgetten", href: "/calculator" },
      { label: "Open volledige accountchecklist", href: "/checklist" },
    ],
  },
  workspace: {
    intro: "Maak een volledig nieuwe Microsoft 365-tenant voor Earth Spas. De mailboxen blijven niet in Volkers tenant; pas na een geslaagde migratie worden domeinen en mail definitief omgezet.",
    steps: [
      "Open de Microsoft 365-businesspagina en koop Business Basic of de afgesproken zakelijke licentie met Earth Spas-bedrijfsgegevens.",
      "Gebruik de centrale Earth Spas billingmail als contactadres. De eerste koper wordt automatisch beheerder van de nieuwe tenant.",
      "Open daarna het Microsoft 365 Admin Center, voeg een tweede Earth Spas-global admin toe en koppel de prepaidkaart aan Billing > Payment methods.",
      "Voeg earthspas.nl, earthspas.de en earthspas.lu toe en verifieer eerst alleen het domeineigendom; wijzig de mailrecords nog niet.",
      "Maak gebruikers en gedeelde mailboxen aan, wijs licenties toe en bereid de migratie van mail, agenda en bestanden uit Volkers tenant voor.",
      "Migreer de gegevens, wijzig daarna MX/SPF/DKIM-records en test verzenden, ontvangen, gedeelde mailboxen, mobiel gebruik en wachtwoordherstel.",
      "Verwijder de oude tenantkoppelingen pas nadat minimaal twee Earth Spas-beheerders zelfstandig kunnen beheren en herstellen.",
    ],
    links: [
      { label: "Microsoft 365 Business kopen", href: "https://www.microsoft.com/nl-nl/microsoft-365/business/compare-all-microsoft-365-business-products" },
      { label: "Microsoft 365 Admin Center", href: "https://admin.microsoft.com/" },
      { label: "Microsoft Entra beheerders", href: "https://entra.microsoft.com/" },
    ],
  },
  source: {
    intro: "Maak een Earth Spas GitHub-organisatie, koop het afgesproken Team-plan, voeg twee owners en een billing manager toe en draag daarna pas de repositories over.",
    steps: [
      "Log in met een zakelijk Earth Spas GitHub-account of maak dat account eerst aan.",
      "Open de pagina Nieuwe organisatie, kies Earth Spas als organisatienaam en selecteer GitHub Team wanneer het plan wordt gevraagd.",
      "Open Organization Settings > Billing and licensing, voeg de prepaidkaart en Earth Spas-factuurgegevens toe en stel waar mogelijk budgets en usage alerts in.",
      "Nodig Volker en minimaal één tweede Earth Spas-beheerder uit als owner; voeg eventueel een aparte billing manager toe.",
      "Draag repositories één voor één over en controleer teams, repositoryrechten, secrets, Actions, webhooks en gekoppelde apps.",
      "Verbind daarna de Earth Spas-organisatie met Vercel en test een productie-deployment voordat persoonlijke eigenaarschap wordt verwijderd.",
    ],
    links: [
      { label: "GitHub-account aanmaken", href: "https://github.com/signup" },
      { label: "Nieuwe GitHub-organisatie", href: "https://github.com/organizations/new" },
      { label: "GitHub-organisaties beheren", href: "https://github.com/settings/organizations" },
      { label: "GitHub billing beheren", href: "https://github.com/settings/billing" },
    ],
  },
  dns: {
    intro: "Maak een eigen Cloudflare-account voor Earth Spas en plaats daar alle domeinzones, beheerders en herstelgegevens onder. De Free-laag is voldoende voor de afgesproken DNS-basis.",
    steps: [
      "Open Cloudflare Sign Up en registreer met de centrale Earth Spas-mailbox.",
      "Activeer 2FA en nodig Volker plus een tweede Earth Spas-beheerder uit als account members.",
      "Voeg ieder domein afzonderlijk toe en laat Cloudflare de bestaande DNS-records importeren.",
      "Vergelijk A-, CNAME-, MX-, SPF-, DKIM- en verificatierecords met de huidige situatie voordat nameservers worden gewijzigd.",
      "Wijzig de nameservers bij TransIP en controleer website, mail en verificaties per domein.",
      "Leg toegang en herstel vast en verwijder persoonlijke Cloudflare-toegang pas na een volledige controle.",
    ],
    links: [
      { label: "Cloudflare-account aanmaken", href: "https://dash.cloudflare.com/sign-up" },
      { label: "Cloudflare Dashboard", href: "https://dash.cloudflare.com/" },
      { label: "TransIP Control Panel", href: "https://www.transip.nl/cp/" },
    ],
  },
  server: {
    intro: "Maak een eigen Hetzner-account voor Earth Spas, voeg de prepaidkaart toe en bouw de productieomgeving onder dat account. Volker kan daarna server, beveiliging, back-ups en migratie volledig uitvoeren zonder privé-billing.",
    steps: [
      "Open Hetzner Account Registration en registreer met Earth Spas-bedrijfs- en contactgegevens.",
      "Rond identiteits- en bedrijfsverificatie af en voeg de prepaidkaart of beschikbare betaalroute toe in de billinginstellingen.",
      "Maak een Earth Spas Cloud-project aan en voeg Volker plus een tweede beheerder toe.",
      "Maak de afgesproken productieserver aan en configureer firewall, SSH-keys, automatische updates, monitoring en back-ups.",
      "Installeer of migreer Directus, n8n en backendservices vanuit een actuele back-up.",
      "Test websitekoppelingen, workflows, back-up en restore voordat de oude serverroute wordt beëindigd.",
    ],
    links: [
      { label: "Hetzner-account registreren", href: "https://accounts.hetzner.com/signUp" },
      { label: "Hetzner Cloud Console", href: "https://console.hetzner.cloud/" },
    ],
  },
  database: {
    intro: "Maak een eigen Earth Spas Supabase-organisatie en productieproject, voeg Pro-billing en spend controls toe en migreer pas daarna productiedata.",
    steps: [
      "Open Supabase en registreer met een Earth Spas-mailaccount.",
      "Maak de organisatie Earth Spas en een afzonderlijk productieproject in de juiste regio aan.",
      "Open Organization Billing, activeer Supabase Pro met de prepaidkaart en stel spend controls en waarschuwingen in.",
      "Nodig Volker en minimaal één tweede Earth Spas-beheerder uit met passende rollen.",
      "Migreer schema, data, storage, policies, functions en secrets vanuit de huidige omgeving.",
      "Werk environment variables in Vercel en backend bij en test authenticatie, formulieren, uploads, back-up en herstel.",
    ],
    links: [
      { label: "Supabase-account en dashboard", href: "https://supabase.com/dashboard" },
      { label: "Supabase-organisatiebilling", href: "https://supabase.com/dashboard/org/_/billing" },
    ],
  },
  frontend: {
    intro: "Maak een Earth Spas Vercel-account en Team, voeg billing en beheerders toe, koppel de GitHub-organisatie en draag daarna projecten en domeinen over.",
    steps: [
      "Open Vercel Sign Up en registreer met een Earth Spas-mailaccount.",
      "Kies Create Team, gebruik Earth Spas als teamnaam en selecteer het afgesproken Pro-plan.",
      "Open Team Settings > Billing, voeg de prepaidkaart en Earth Spas-factuurgegevens toe en stel spend management in.",
      "Nodig Volker en minimaal één tweede Earth Spas-beheerder uit met de juiste teamrol.",
      "Installeer de GitHub-integratie voor uitsluitend de Earth Spas-organisatie en importeer of transfer de projecten.",
      "Draag domeinen en environment variables over en test productie, previews, logs, redirects en rollback.",
      "Verwijder projecten uit Volkers persoonlijke Vercel-account pas wanneer alle productiedomeinen op het Earth Spas-team werken.",
    ],
    links: [
      { label: "Vercel-account aanmaken", href: "https://vercel.com/signup" },
      { label: "Nieuw Vercel-team maken", href: "https://vercel.com/new/team" },
      { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
    ],
  },
  "transactional-email": {
    intro: "Maak een eigen Earth Spas Resend-account, activeer Pro-billing, verifieer alle verzenddomeinen en vervang daarna persoonlijke API-sleutels.",
    steps: [
      "Open Resend Sign Up en registreer met de centrale Earth Spas-mailbox.",
      "Maak of benoem het team Earth Spas en voeg Volker plus een tweede beheerder toe.",
      "Open Billing en activeer Resend Pro met de prepaidkaart en Earth Spas-factuurgegevens.",
      "Voeg earthspas.nl, earthspas.de en earthspas.lu toe onder Domains en plaats de gevraagde SPF- en DKIM-records in Cloudflare.",
      "Maak nieuwe productie-API-sleutels en vervang de persoonlijke sleutels in Vercel, formulieren en automatiseringen.",
      "Test contact-, showroom- en serviceflows inclusief ontvangst, logs, foutmeldingen en replies.",
    ],
    links: [
      { label: "Resend-account aanmaken", href: "https://resend.com/signup" },
      { label: "Resend Domains", href: "https://resend.com/domains" },
      { label: "Resend Billing", href: "https://resend.com/settings/billing" },
    ],
  },
  secrets: {
    intro: "Maak een Earth Spas Doppler-workspace zodat API-sleutels en productieconfiguratie niet langer aan persoonlijke accounts of losse documenten hangen.",
    steps: [
      "Registreer een Earth Spas Doppler-account en maak de workspace Earth Spas aan.",
      "Nodig Volker en minimaal één tweede beheerder uit.",
      "Maak projecten voor website, CMS en automatisering met development, preview en production-configuraties.",
      "Roteer bestaande API-sleutels en plaats alleen nieuwe waarden in Doppler.",
      "Koppel Vercel, server en workflows en test iedere omgeving.",
      "Verwijder oude persoonlijke sleutels pas nadat alle koppelingen aantoonbaar werken.",
    ],
    links: [
      { label: "Doppler-account registreren", href: "https://dashboard.doppler.com/register" },
      { label: "Doppler Dashboard", href: "https://dashboard.doppler.com/" },
    ],
  },
  meta: {
    intro: "Gebruik de bestaande Earth Spas-assets of maak één Earth Spas Business Portfolio. Voeg de prepaidkaart toe, wijs twee beheerders aan en controleer alle Facebook-, Instagram-, Pixel- en advertentie-assets.",
    steps: [
      "Open Meta Business en maak of selecteer het Earth Spas Business Portfolio.",
      "Voeg minimaal twee Earth Spas-beheerders toe en verplicht 2FA.",
      "Claim of voeg Facebook-pagina, Instagram-account, Pixel/dataset, advertentieaccount en WhatsApp-route toe.",
      "Open Payment Settings, voeg de prepaidkaart en Earth Spas-factuurgegevens toe en stel een account spending limit in.",
      "Controleer domeinverificatie en prioritaire events.",
      "Publiceer een testadvertentie en controleer billing, Pixel-events, leadregistratie en toegang voordat persoonlijke rollen verdwijnen.",
    ],
    links: [
      { label: "Meta Business openen", href: "https://business.facebook.com/" },
      { label: "Meta Business Settings", href: "https://business.facebook.com/settings" },
      { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com/" },
      { label: "Meta Events Manager", href: "https://business.facebook.com/events_manager2" },
    ],
  },
};

export const taskExecutionPlans: Record<string, TaskExecutionPlan> = {
  ...basePlans,
  ...detailedPlans,
};
