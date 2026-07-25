export type ChoiceOption = {
  id: string;
  groupId: string;
  name: string;
  monthly: number;
  description: string;
  recommended?: boolean;
  caution?: boolean;
  logoSlug?: string;
  icon: string;
};

export type ChoiceGroup = {
  id: string;
  title: string;
  description: string;
  options: ChoiceOption[];
};

export type FeatureItem = {
  id: string;
  name: string;
  description: string;
  hoursLow: number;
  hoursHigh: number;
  marketLow: number;
  marketHigh: number;
  impact: "Verkoop" | "Marketing" | "Support" | "Data";
  icon: string;
};

export type ChecklistItem = {
  id: string;
  group: "Eigenaarschap" | "Techniek" | "Marketing" | "Afronding";
  title: string;
  description: string;
  owner: string;
  priority: "Nu" | "Daarna" | "Voor livegang";
  choiceGroupId?: string;
};

export const pricingReview = {
  reviewedAt: "25 juli 2026",
  note: "Bedragen zijn afgeronde planningsbedragen per maand. Valuta, btw, wisselkoers, jaarlijkse facturering, verbruik en prijswijzigingen kunnen het uiteindelijke factuurbedrag beïnvloeden. API- en andere verbruikskosten blijven afzonderlijk.",
};

export const choiceGroups: ChoiceGroup[] = [
  {
    id: "payment",
    title: "Betaalmethode",
    description: "Wie betaalt software, AI-credits en advertenties?",
    options: [
      { id: "earthspas-card", groupId: "payment", name: "Zakelijke Earth Spas-kaart", monthly: 0, description: "Eigen kaart of virtuele kaart met harde maandlimieten en duidelijke afschriften.", recommended: true, icon: "credit-card" },
      { id: "prepaid-card", groupId: "payment", name: "Prepaid / virtuele kaart", monthly: 0, description: "Los saldo voor digitale kosten, bruikbaar wanneer een normale zakelijke kaart nog niet geregeld is.", icon: "wallet" },
      { id: "personal-card", groupId: "payment", name: "Voorlopig persoonlijke kaart", monthly: 0, description: "Tijdelijke noodoplossing. Kosten en eigenaarschap blijven hierdoor onnodig door elkaar lopen.", caution: true, icon: "warning" },
    ],
  },
  {
    id: "workspace",
    title: "E-mail en bestanden",
    description: "Zakelijke mail, agenda, gedeelde documenten en hersteltoegang.",
    options: [
      { id: "m365", groupId: "workspace", name: "Microsoft 365 Business Basic", monthly: 5.2, description: "Mail, agenda, SharePoint en gedeelde bestanden in één zakelijke tenant.", recommended: true, logoSlug: "microsoft", icon: "envelope" },
      { id: "google-workspace", groupId: "workspace", name: "Google Workspace Starter", monthly: 7, description: "Gmail, Drive en agenda. Prima alternatief wanneer Google de voorkeur heeft.", logoSlug: "google", icon: "envelope" },
      { id: "workspace-current", groupId: "workspace", name: "Huidige mailoplossing behouden", monthly: 0, description: "Geen directe migratie. Eigenaarschap, back-up en gedeelde toegang moeten dan wel apart worden gecontroleerd.", icon: "archive" },
    ],
  },
  {
    id: "passwords",
    title: "Wachtwoorden en 2FA",
    description: "Gedeelde toegang zonder wachtwoorden via WhatsApp of geheugenacrobatiek.",
    options: [
      { id: "bitwarden", groupId: "passwords", name: "Bitwarden Teams", monthly: 7, description: "Gedeelde kluizen, 2FA, herstelcodes en noodtoegang voor twee beheerders.", recommended: true, logoSlug: "bitwarden", icon: "shield" },
      { id: "onepassword", groupId: "passwords", name: "1Password Business", monthly: 15, description: "Sterk beheer en gebruiksgemak, maar duurder voor een kleine beheerploeg.", logoSlug: "1password", icon: "shield" },
      { id: "passwords-current", groupId: "passwords", name: "Bestaande methode behouden", monthly: 0, description: "Geen nieuwe tool. Dan moeten eigenaarschap, herstelcodes en tweede toegang handmatig worden geregeld.", caution: true, icon: "key" },
    ],
  },
  {
    id: "source",
    title: "Broncode en repositories",
    description: "Waar website, agents en maatwerk aantoonbaar eigendom van Earth Spas zijn.",
    options: [
      { id: "github-team", groupId: "source", name: "GitHub Team", monthly: 4, description: "Earth Spas-organisatie, twee owners en extra repositoryregels.", recommended: true, logoSlug: "github", icon: "code" },
      { id: "github-free", groupId: "source", name: "GitHub Free", monthly: 0, description: "Voldoende voor de basis, met minder team- en governancefuncties.", logoSlug: "github", icon: "code" },
      { id: "source-current", groupId: "source", name: "Huidige repositories behouden", monthly: 0, description: "Kan tijdelijk, maar overdracht en minimaal twee beheerders blijven noodzakelijk.", caution: true, icon: "git" },
    ],
  },
  {
    id: "dns",
    title: "DNS en beveiliging",
    description: "Domeinen, SSL, CDN, redirects en bescherming van NL, DE en LU.",
    options: [
      { id: "cloudflare", groupId: "dns", name: "Cloudflare Free", monthly: 0, description: "Centrale DNS, SSL, CDN en basisbeveiliging met duidelijke overdracht.", recommended: true, logoSlug: "cloudflare", icon: "cloud" },
      { id: "transip-dns", groupId: "dns", name: "DNS bij registrar houden", monthly: 0, description: "Minder migratiewerk, maar beheer en beveiliging blijven verspreid.", icon: "globe" },
    ],
  },
  {
    id: "server",
    title: "Eigen server",
    description: "De kern voor Directus, n8n, agents en backendservices.",
    options: [
      { id: "hetzner-starter", groupId: "server", name: "Hetzner starterserver", monthly: 18, description: "Goedkope start voor lichte workflows en een beperkte productieomgeving.", logoSlug: "hetzner", icon: "server" },
      { id: "hetzner-production", groupId: "server", name: "Hetzner productieserver + back-ups", monthly: 46, description: "Aanbevolen capaciteit voor Directus, n8n, agents, monitoring en dagelijkse back-ups.", recommended: true, logoSlug: "hetzner", icon: "server" },
      { id: "managed-server", groupId: "server", name: "Volledig managed hosting", monthly: 95, description: "Minder technisch beheer voor Earth Spas, maar duurder en minder vrij in de inrichting.", icon: "cloud" },
      { id: "no-server", groupId: "server", name: "Nog geen eigen server", monthly: 0, description: "Alles blijft voorlopig verspreid over bestaande accounts en SaaS-diensten.", caution: true, icon: "warning" },
    ],
  },
  {
    id: "cms",
    title: "Contentbeheer",
    description: "Modellen, teksten, media, SEO en vertalingen centraal beheren.",
    options: [
      { id: "directus", groupId: "cms", name: "Directus self-hosted", monthly: 0, description: "Draait op de eigen server en vormt één bron voor alle landsites en agents.", recommended: true, logoSlug: "directus", icon: "database" },
      { id: "cms-current", groupId: "cms", name: "Huidige CMS-opzet behouden", monthly: 0, description: "Geen directe migratie; bestaande beperkingen en verspreide content blijven bestaan.", icon: "database" },
      { id: "no-cms", groupId: "cms", name: "Geen centraal CMS", monthly: 0, description: "Content blijft in code en losse bestanden. Goedkoop, maar onhandig voor groei en automatisering.", caution: true, icon: "file" },
    ],
  },
  {
    id: "automation",
    title: "Automatisering",
    description: "Workflows voor leads, content, meldingen, service en agents.",
    options: [
      { id: "n8n", groupId: "automation", name: "n8n self-hosted", monthly: 0, description: "Geen tarief per uitvoering en volledige controle op de eigen server.", recommended: true, logoSlug: "n8n", icon: "flow" },
      { id: "make", groupId: "automation", name: "Make Core", monthly: 10, description: "Snel en eenvoudig, maar kosten en limieten groeien mee met het gebruik.", logoSlug: "make", icon: "flow" },
      { id: "no-automation", groupId: "automation", name: "Nog geen automatiseringsplatform", monthly: 0, description: "Alle opvolging blijft handmatig tot een later moment.", icon: "pause" },
    ],
  },
  {
    id: "secrets",
    title: "API-sleutels en secrets",
    description: "Veilige, overdraagbare opslag van tokens en productieconfiguratie.",
    options: [
      { id: "doppler", groupId: "secrets", name: "Doppler Developer", monthly: 0, description: "Centrale secrets, rollen en deployments zonder sleutels in losse documenten.", recommended: true, logoSlug: "doppler", icon: "key" },
      { id: "platform-secrets", groupId: "secrets", name: "Secrets per platform beheren", monthly: 0, description: "Vercel, GitHub en servervariabelen apart beheren. Gratis, maar meer verspreid.", icon: "key" },
    ],
  },
  {
    id: "database",
    title: "Database en storage",
    description: "Data, bestanden, authenticatie en betrouwbare back-ups.",
    options: [
      { id: "supabase-pro", groupId: "database", name: "Supabase Pro", monthly: 25, description: "Beheerde database, storage, authenticatie, back-ups en spend controls.", recommended: true, logoSlug: "supabase", icon: "database" },
      { id: "supabase-free", groupId: "database", name: "Supabase Free", monthly: 0, description: "Prima voor testen en lage volumes, met beperktere garanties en capaciteit.", logoSlug: "supabase", icon: "database" },
      { id: "postgres-selfhosted", groupId: "database", name: "PostgreSQL op eigen server", monthly: 0, description: "Geen extra abonnement, maar back-ups, updates en beheer liggen volledig bij ons.", icon: "database" },
    ],
  },
  {
    id: "frontend",
    title: "Websitefrontend",
    description: "Hosting en deployment van de snelle Next.js-websites.",
    options: [
      { id: "vercel-pro", groupId: "frontend", name: "Vercel Pro", monthly: 20, description: "Snelle deployments, previews, logs en spend controls voor productie.", recommended: true, logoSlug: "vercel", icon: "globe" },
      { id: "vercel-free", groupId: "frontend", name: "Vercel Hobby", monthly: 0, description: "Goedkoopste route, met beperkingen voor zakelijk teamgebruik en support.", logoSlug: "vercel", icon: "globe" },
      { id: "frontend-selfhosted", groupId: "frontend", name: "Frontend ook self-hosted", monthly: 0, description: "Alles op de eigen server. Lagere SaaS-kosten, meer deployment- en beheerwerk.", icon: "server" },
    ],
  },
  {
    id: "transactional-email",
    title: "Formulier- en systeemmail",
    description: "Contactformulieren, afspraken, service en automatische notificaties.",
    options: [
      { id: "resend-pro", groupId: "transactional-email", name: "Resend Pro", monthly: 20, description: "Betrouwbare verzending, logs en meerdere geverifieerde domeinen.", recommended: true, logoSlug: "resend", icon: "envelope" },
      { id: "resend-free", groupId: "transactional-email", name: "Resend Free", monthly: 0, description: "Voldoende voor een rustige start en lage volumes.", logoSlug: "resend", icon: "envelope" },
      { id: "mail-smtp", groupId: "transactional-email", name: "Mail via bestaande mailbox", monthly: 0, description: "Geen extra account, maar minder inzicht, controle en schaalbaarheid.", icon: "envelope" },
    ],
  },
  {
    id: "ai-workspace",
    title: "ChatGPT-werkruimte",
    description: "Research, content, analyse, agents en Codexwerk. API-verbruik blijft altijd apart.",
    options: [
      { id: "chatgpt-plus", groupId: "ai-workspace", name: "ChatGPT Plus", monthly: 20, description: "Individueel abonnement met ruimere toegang dan Free, maar lagere limieten dan Pro.", logoSlug: "openai", icon: "robot" },
      { id: "chatgpt-pro5", groupId: "ai-workspace", name: "ChatGPT Pro", monthly: 200, description: "Voorkeurskeuze voor structureel en zeer intensief individueel gebruik binnen analyse, content en development.", recommended: true, logoSlug: "openai", icon: "rocket" },
      { id: "chatgpt-pro20", groupId: "ai-workspace", name: "ChatGPT Business, 2 seats · jaarlijks", monthly: 40, description: "Teamworkspace met centraal beheer. Dit bedrag gaat uit van twee seats en jaarlijkse facturering.", logoSlug: "openai", icon: "briefcase" },
      { id: "chatgpt-business", groupId: "ai-workspace", name: "ChatGPT Business, 2 seats · maandelijks", monthly: 50, description: "Teamworkspace met centraal beheer en maandelijkse facturering voor minimaal twee gebruikers.", logoSlug: "openai", icon: "briefcase" },
      { id: "no-chatgpt", groupId: "ai-workspace", name: "Geen apart Earth Spas-abonnement", monthly: 0, description: "Gebruik blijft via bestaande accounts lopen en is daardoor minder zuiver toe te wijzen.", caution: true, icon: "pause" },
    ],
  },
  {
    id: "design",
    title: "Design en prototypes",
    description: "Ontwerp, feedback en overdracht van website- en appschermen.",
    options: [
      { id: "figma-pro", groupId: "design", name: "Figma Professional", monthly: 14, description: "Volwaardige projectstructuur, prototypes en developer handoff.", recommended: true, logoSlug: "figma", icon: "layout" },
      { id: "figma-free", groupId: "design", name: "Figma Free", monthly: 0, description: "Voldoende zolang projecten en samenwerking beperkt blijven.", logoSlug: "figma", icon: "layout" },
      { id: "no-design-tool", groupId: "design", name: "Geen aparte designtool", monthly: 0, description: "Ontwerp direct in code; sneller voor kleine wijzigingen, minder overzichtelijk voor feedback.", icon: "layout" },
    ],
  },
  {
    id: "social-content",
    title: "Social en dagelijkse content",
    description: "Templates, korte video, posts en herbruikbare merkassets.",
    options: [
      { id: "canva-pro", groupId: "social-content", name: "Canva Pro", monthly: 11, description: "Snelste route voor socialcontent, presentaties en eenvoudige video.", recommended: true, logoSlug: "canva", icon: "image" },
      { id: "canva-free", groupId: "social-content", name: "Canva Free", monthly: 0, description: "Bruikbaar met minder merk- en exportmogelijkheden.", logoSlug: "canva", icon: "image" },
      { id: "no-content-tool", groupId: "social-content", name: "Geen aparte contenttool", monthly: 0, description: "Content volledig via andere ontwerp- en AI-tools maken.", icon: "image" },
    ],
  },
  {
    id: "coding-ai",
    title: "AI voor development",
    description: "Codingagents, premium modellen, code review en actieve bouwmaanden.",
    options: [
      { id: "copilot-pro", groupId: "coding-ai", name: "GitHub Copilot Pro", monthly: 10, description: "Goede basis voor dagelijkse code-aanvulling, chat en agentgebruik.", logoSlug: "githubcopilot", icon: "code" },
      { id: "copilot-proplus", groupId: "coding-ai", name: "GitHub Copilot Pro+", monthly: 39, description: "Meer inbegrepen AI-credits en toegang tot zwaardere modellen voor intensieve bouwmaanden.", recommended: true, logoSlug: "githubcopilot", icon: "magic" },
      { id: "copilot-max", groupId: "coding-ai", name: "GitHub Copilot Max", monthly: 100, description: "Voor structureel hoog agentgebruik met een grotere inbegrepen AI-creditpot.", logoSlug: "githubcopilot", icon: "rocket" },
      { id: "no-coding-ai", groupId: "coding-ai", name: "Geen apart codingabonnement", monthly: 0, description: "Development draait uitsluitend op de gekozen ChatGPT-werkruimte en losse API-credits.", icon: "code" },
    ],
  },
  {
    id: "stock",
    title: "Stock en commerciële assets",
    description: "Beeld, templates, muziek en effecten voor website en campagnes.",
    options: [
      { id: "envato", groupId: "stock", name: "Envato Core", monthly: 14, description: "Brede bibliotheek met commerciële licenties voor dagelijkse productie.", recommended: true, logoSlug: "envato", icon: "sparkle" },
      { id: "free-assets", groupId: "stock", name: "Alleen gratis / eigen assets", monthly: 0, description: "Lagere kosten, maar minder keuze en meer zoektijd.", icon: "image" },
    ],
  },
  {
    id: "voice",
    title: "AI-voice",
    description: "Meertalige voice-overs, uitlegvideo's en gesproken agents.",
    options: [
      { id: "elevenlabs", groupId: "voice", name: "ElevenLabs Starter", monthly: 5, description: "Goede meertalige voice-overs en bruikbare productiekwaliteit.", recommended: true, logoSlug: "elevenlabs", icon: "headphones" },
      { id: "no-voice", groupId: "voice", name: "Geen betaald voice-abonnement", monthly: 0, description: "Voice alleen incidenteel inkopen of via beschikbare gratis credits maken.", icon: "headphones" },
    ],
  },
  {
    id: "video-ai",
    title: "AI-video",
    description: "Video-effecten, varianten en snelle campagneproductie.",
    options: [
      { id: "runway", groupId: "video-ai", name: "Runway Pro", monthly: 25, description: "Vaste credits en productietools voor regelmatige videocontent.", recommended: true, logoSlug: "runway", icon: "video" },
      { id: "video-credits-only", groupId: "video-ai", name: "Alleen losse media-credits", monthly: 0, description: "Geen vast abonnement; alleen betalen in maanden waarin video wordt geproduceerd.", icon: "video" },
    ],
  },
];

export const features: FeatureItem[] = [
  { id: "crm", name: "CRM en commerciële pipeline", description: "Leads, bron, taal, modelinteresse, afspraken, offertes en omzet in één proces.", hoursLow: 120, hoursHigh: 220, marketLow: 12000, marketHigh: 25000, impact: "Verkoop", icon: "users" },
  { id: "booking", name: "Showroom booking en reminders", description: "Beschikbare tijden, bevestiging, route, reminders en opvolging.", hoursLow: 40, hoursHigh: 80, marketLow: 5000, marketHigh: 10000, impact: "Verkoop", icon: "calendar" },
  { id: "finder", name: "Spa Finder en productvergelijker", description: "Gestructureerd advies met maximaal drie passende modellen.", hoursLow: 60, hoursHigh: 120, marketLow: 8000, marketHigh: 15000, impact: "Verkoop", icon: "target" },
  { id: "advisor", name: "AI Spa Advisor", description: "Meertalige adviesagent op gevalideerde productdata, gekoppeld aan CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 30000, impact: "Verkoop", icon: "robot" },
  { id: "recovery", name: "Lead recovery en automatische opvolging", description: "E-mail, WhatsApp, reminders en nurture op basis van gedrag en voorkeuren.", hoursLow: 70, hoursHigh: 140, marketLow: 8000, marketHigh: 16000, impact: "Marketing", icon: "flow" },
  { id: "marketing-agent", name: "Marketing- en contentagent", description: "SEO, social posts, advertentievarianten, contentplanning en analyses.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Marketing", icon: "magic" },
  { id: "capture", name: "Mobiele installatie-capture app", description: "Foto- en videochecklist, tagging, crops, cases en publicatieworkflows.", hoursLow: 180, hoursHigh: 360, marketLow: 20000, marketHigh: 45000, impact: "Marketing", icon: "image" },
  { id: "support", name: "Supportagent en kennisbank", description: "Onderhoud, handleidingen, foutmeldingen, tickets en menselijke escalatie.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: "chat" },
  { id: "voice-agent", name: "Voice agent", description: "Gesproken advies via website of telefoon met samenvatting naar CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: "headphones" },
  { id: "analytics", name: "Attribution en managementdashboards", description: "Van campagne naar lead, afspraak, offerte, verkoop en omzet.", hoursLow: 90, hoursHigh: 200, marketLow: 10000, marketHigh: 25000, impact: "Data", icon: "chart" },
];

export const checklistItems: ChecklistItem[] = [
  { id: "billing-inventory", group: "Eigenaarschap", title: "Volledig account- en factuuroverzicht maken", description: "Per dienst eigenaar, login, herstelmail, betaalmethode, factuuradres, kosten, verlengdatum en opzegroute vastleggen.", owner: "Samen", priority: "Nu" },
  { id: "billing-email", group: "Eigenaarschap", title: "Centrale billing- en herstelmail vastleggen", description: "Eén zakelijke mailbox gebruiken voor facturen, waarschuwingen, herstelcodes en belangrijke accountmeldingen.", owner: "Earth Spas", priority: "Nu" },
  { id: "payment-card", group: "Eigenaarschap", title: "Betaalmethode kiezen en koppelen", description: "De gekozen betaalroute activeren, limieten instellen en alle facturen op Earth Spas laten landen.", owner: "Jeroen / Wim", priority: "Nu", choiceGroupId: "payment" },
  { id: "spend-alerts", group: "Eigenaarschap", title: "Budgetlimieten en verbruikswaarschuwingen instellen", description: "Per advertentie-, AI-, hosting- en API-account harde limieten of waarschuwingen activeren en maandelijks controleren.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "admins", group: "Eigenaarschap", title: "Twee vaste beheerders aanwijzen", description: "Primaire en tweede beheerder voor accounts, hersteltoegang en noodgevallen vastleggen.", owner: "Earth Spas", priority: "Nu" },
  { id: "passwords", group: "Eigenaarschap", title: "Wachtwoord- en 2FA-oplossing inrichten", description: "Gedeelde toegang, herstelcodes en noodtoegang volgens de gekozen optie migreren.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "passwords" },
  { id: "workspace", group: "Eigenaarschap", title: "E-mail- en bestandsomgeving voorbereiden", description: "Gebruikers, mailboxen, domeinen, bestanden en migratiemoment volgens de gekozen oplossing vastleggen.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "workspace" },
  { id: "source", group: "Eigenaarschap", title: "Broncode onder Earth Spas-eigendom plaatsen", description: "Repositories, twee beheerders en overdrachtsregels instellen in de gekozen omgeving.", owner: "Volker", priority: "Nu", choiceGroupId: "source" },
  { id: "registrar", group: "Techniek", title: "Domeinregistratie en verlenging overdragen", description: "Registrar-eigendom, contactgegevens, automatische verlenging, facturering en verhuiscodes voor alle Earth Spas-domeinen vastleggen.", owner: "Samen", priority: "Nu" },
  { id: "dns", group: "Techniek", title: "DNS en domeinen inventariseren", description: "Records exporteren, drie domeinen controleren en wijzigingen alleen met rollbackplan uitvoeren.", owner: "Volker", priority: "Nu", choiceGroupId: "dns" },
  { id: "server", group: "Techniek", title: "Gekozen serverroute inrichten", description: "Beveiliging, updates, monitoring en back-ups activeren of de bestaande route expliciet behouden.", owner: "Volker", priority: "Nu", choiceGroupId: "server" },
  { id: "backup-restore", group: "Techniek", title: "Back-up- en hersteltest uitvoeren", description: "Database, media, configuratie en secrets daadwerkelijk terugzetten in een testomgeving en de hersteltijd documenteren.", owner: "Volker", priority: "Voor livegang" },
  { id: "cms", group: "Techniek", title: "Contentbeheer vastleggen en migreren", description: "Schema, content en assets back-uppen en de gekozen CMS-route testen.", owner: "Volker", priority: "Daarna", choiceGroupId: "cms" },
  { id: "automation", group: "Techniek", title: "Automatiseringsplatform inrichten", description: "Workflows inventariseren, credentials koppelen en kritieke flows testen.", owner: "Volker", priority: "Daarna", choiceGroupId: "automation" },
  { id: "database", group: "Techniek", title: "Database en storage overzetten", description: "Back-ups, rechten, spend caps en productiegegevens controleren in de gekozen oplossing.", owner: "Volker", priority: "Nu", choiceGroupId: "database" },
  { id: "frontend", group: "Techniek", title: "Frontendhosting en deployments vastleggen", description: "Domeinen, environment variables, previews, logs en spend controls testen.", owner: "Volker", priority: "Daarna", choiceGroupId: "frontend" },
  { id: "transactional-email", group: "Techniek", title: "Formulier- en systeemmail testen", description: "Afzenders verifiëren en contact-, showroom- en serviceflows end-to-end testen.", owner: "Volker", priority: "Daarna", choiceGroupId: "transactional-email" },
  { id: "secrets", group: "Techniek", title: "Secrets en API-sleutels normaliseren", description: "Tokens roteren, toegang beperken en persoonlijke sleutels uit productie verwijderen.", owner: "Volker", priority: "Daarna", choiceGroupId: "secrets" },
  { id: "meta", group: "Marketing", title: "Meta Business volledig overzetten", description: "Pagina, Instagram, datasets, Pixel, betaalmethode, WhatsApp-route en twee beheerders controleren.", owner: "Samen", priority: "Nu" },
  { id: "google", group: "Marketing", title: "Google-accounts en billing normaliseren", description: "Business Profile, Cloud, Analytics, Tag Manager, Search Console en API-limieten onder Earth Spas.", owner: "Samen", priority: "Nu" },
  { id: "social", group: "Marketing", title: "Overige socialaccounts beveiligen", description: "TikTok, YouTube, Pinterest en LinkedIn met herstelmail, 2FA en twee beheerders.", owner: "Samen", priority: "Daarna" },
  { id: "ai-workspace", group: "Marketing", title: "ChatGPT-werkruimte activeren", description: "Het gekozen abonnement onder Earth Spas betalen en gebruik, toegang en limieten afspreken.", owner: "Jeroen + Volker", priority: "Nu", choiceGroupId: "ai-workspace" },
  { id: "creative-tools", group: "Marketing", title: "Creatieve productieaccounts kiezen", description: "Design, socialcontent, coding-AI, stock, voice en video volgens de gemaakte keuzes activeren.", owner: "Jeroen + Volker", priority: "Daarna" },
  { id: "tracking", group: "Marketing", title: "Conversiemeting en CRM-events instellen", description: "Lead, showroomafspraak, offerte en verkoop terugkoppelen naar bron en campagne.", owner: "Volker", priority: "Voor livegang" },
  { id: "privacy", group: "Afronding", title: "AVG en toestemmingen vastleggen", description: "Marketingtoestemming, klantfoto's, WhatsApp, voice-transcripten en agent-escalaties goedkeuren.", owner: "Earth Spas", priority: "Voor livegang" },
  { id: "acceptance", group: "Afronding", title: "Acceptatietest en rollback uitvoeren", description: "Website, mail, formulieren, database, workflows, back-ups en herstelprocedure samen testen.", owner: "Samen", priority: "Voor livegang" },
  { id: "budgets", group: "Afronding", title: "Definitieve maandlimieten vastleggen", description: "Platform, AI/API, development-AI, media-AI, Meta Ads en Google Ads apart goedkeuren.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "workform", group: "Afronding", title: "Vorm van structurele betrokkenheid kiezen", description: "Vrij en incidenteel of een structureel aantal uren per week; tegenprestatie blijft buiten dit document.", owner: "Jeroen + Volker", priority: "Nu" },
  { id: "personal-payments", group: "Afronding", title: "Persoonlijke betaalmethoden verwijderen", description: "Pas nadat iedere gekozen account-, billing- en herstelroute aantoonbaar werkt.", owner: "Volker", priority: "Voor livegang" },
];

export const recommendedChoices = Object.fromEntries(
  choiceGroups.map((group) => [group.id, group.options.find((option) => option.recommended)?.id ?? group.options[0].id]),
);

export const defaultFeatureSelections = Object.fromEntries(
  features.map((feature) => [feature.id, ["crm", "booking", "finder", "advisor", "recovery", "marketing-agent", "analytics"].includes(feature.id)]),
);

export const defaultChecklist = Object.fromEntries(checklistItems.map((item) => [item.id, false]));