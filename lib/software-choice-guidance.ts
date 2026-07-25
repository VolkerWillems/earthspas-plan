export type SoftwareGroupGuidance = {
  simple: string;
  reason: string;
  benefits: string[];
  drawbacks: string[];
};

export type SoftwareAlternativeGuidance = {
  fitsWhen: string;
  tradeoff: string;
};

export const softwareGroupGuidance: Record<string, SoftwareGroupGuidance> = {
  payment: {
    simple: "Dit bepaalt van welke kaart alle software, advertenties en AI-kosten worden betaald.",
    reason: "Een prepaid of virtuele Earth Spas-kaart met een vooraf vastgesteld saldo geeft direct controle en voorkomt dat digitale kosten via een persoonlijke kaart lopen.",
    benefits: ["Kosten staan los van privé-uitgaven.", "Het saldo vormt een harde bestedingsgrens.", "Software en advertenties kunnen na akkoord direct worden geactiveerd."],
    drawbacks: ["De kaart moet tijdig worden opgewaardeerd.", "Saldo en terugkerende betalingen moeten maandelijks worden gecontroleerd."],
  },
  workspace: {
    simple: "Dit is de centrale plek voor zakelijke e-mail, agenda's en gedeelde documenten.",
    reason: "Microsoft 365 vormt voor €14 per maand de zakelijke mail- en bestandsomgeving. Wachtwoorden blijven in Microsoft Edge, waardoor geen extra wachtwoordtool of abonnement nodig is.",
    benefits: ["Mail, agenda en bestanden zitten in één zakelijke omgeving.", "Gedeelde mailboxen zijn goed te beheren.", "Geen losse kosten voor een wachtwoordmanager."],
    drawbacks: ["De bestaande mail moet zorgvuldig worden gemigreerd.", "Hersteltoegang en tweede beheerder moeten correct worden ingesteld."],
  },
  source: {
    simple: "Hier staat de broncode van de website, agents en andere software.",
    reason: "GitHub Team maakt eigenaarschap, toegang en wijzigingen duidelijk zonder de code afhankelijk te maken van één persoonlijk account.",
    benefits: ["Earth Spas is aantoonbaar eigenaar van de repositories.", "Er kunnen minimaal twee beheerders worden ingesteld.", "Wijzigingen en herstel zijn goed te volgen."],
    drawbacks: ["Er zijn kleine maandkosten.", "Repositoryregels moeten eerst correct worden ingericht."],
  },
  dns: {
    simple: "DNS vertelt internet waar de websites en e-mail van Earth Spas te vinden zijn.",
    reason: "Cloudflare brengt domeinen, SSL, beveiliging en redirects op één plek samen zonder vaste maandkosten.",
    benefits: ["Snelle en centrale DNS voor alle domeinen.", "Gratis SSL en basisbeveiliging.", "Wijzigingen zijn goed terug te draaien."],
    drawbacks: ["De nameservers moeten zorgvuldig worden overgezet.", "Een verkeerde wijziging kan tijdelijk website of e-mail raken."],
  },
  server: {
    simple: "De server is de eigen computer op internet waarop het CMS, workflows en agents draaien.",
    reason: "De Earth Spas-productieserver is begroot op €103 per maand voor de benodigde capaciteit, back-ups en monitoring.",
    benefits: ["Directus, n8n en agents draaien onder eigen beheer.", "Vaste kosten in plaats van betalen per workflow.", "Dagelijkse back-ups en monitoring zijn mogelijk."],
    drawbacks: ["Updates en beveiliging moeten worden onderhouden.", "Bij storingen is technisch beheer nodig."],
  },
  cms: {
    simple: "Het CMS is de plek waar modellen, teksten, foto's en vertalingen worden beheerd.",
    reason: "Directus maakt één centrale gegevensbron voor website, agents en toekomstige apps, terwijl de data op de eigen infrastructuur blijft.",
    benefits: ["Content hoeft maar één keer te worden bijgehouden.", "Meerdere talen en websites gebruiken dezelfde gegevens.", "Agents kunnen werken met gecontroleerde productinformatie."],
    drawbacks: ["Het datamodel moet zorgvuldig worden ingericht.", "Beheer en back-ups horen bij de eigen server."],
  },
  automation: {
    simple: "Automatisering laat systemen automatisch taken uitvoeren, zoals een lead opvolgen of een melding sturen.",
    reason: "n8n self-hosted geeft volledige controle en rekent niet per uitgevoerde stap, wat gunstig is zodra er veel workflows draaien.",
    benefits: ["Geen oplopende kosten per uitvoering.", "Gegevens blijven in de eigen omgeving.", "Workflows en agents kunnen samen worden opgebouwd."],
    drawbacks: ["Workflows moeten worden onderhouden en getest.", "Fouten en meldingen moeten zelf goed worden ingericht."],
  },
  secrets: {
    simple: "Secrets zijn geheime sleutels waarmee systemen met elkaar mogen praten.",
    reason: "Doppler houdt API-sleutels centraal, zodat ze niet in code, documenten of persoonlijke accounts terechtkomen.",
    benefits: ["Sleutels staan op één veilige plek.", "Toegang kan per persoon en omgeving worden beperkt.", "Nieuwe deployments krijgen automatisch de juiste instellingen."],
    drawbacks: ["Bestaande sleutels moeten worden verhuisd en vernieuwd.", "De inrichting moet goed worden gedocumenteerd."],
  },
  database: {
    simple: "De database bewaart leads, formulieren, gebruikers en andere belangrijke gegevens.",
    reason: "Supabase Pro neemt dagelijkse back-ups, opslag, authenticatie en een groot deel van het databasebeheer uit handen.",
    benefits: ["Back-ups en herstel zijn professioneel geregeld.", "Database, bestanden en loginfuncties werken samen.", "Capaciteit en kosten zijn zichtbaar te bewaken."],
    drawbacks: ["Er zijn vaste maandkosten.", "De omgeving blijft deels afhankelijk van een externe leverancier."],
  },
  frontend: {
    simple: "De frontend is het zichtbare deel van de website dat bezoekers gebruiken.",
    reason: "Vercel Pro geeft betrouwbare deployments, previews en logs voor Next.js zonder dat de eigen server ook al het websiteverkeer hoeft af te handelen.",
    benefits: ["Nieuwe versies kunnen veilig vooraf worden bekeken.", "Snelle wereldwijde levering van de website.", "Fouten en deployments zijn eenvoudig terug te vinden."],
    drawbacks: ["Er zijn vaste maandkosten.", "De frontend draait bij een externe leverancier."],
  },
  "transactional-email": {
    simple: "Dit verstuurt automatische e-mails na formulieren, afspraken en serviceaanvragen.",
    reason: "Resend Pro geeft duidelijke verzendlogs en ondersteunt meerdere Earth Spas-domeinen, waardoor fouten sneller te vinden zijn.",
    benefits: ["Formuliermails zijn apart van gewone mailboxen te volgen.", "Meerdere domeinen kunnen worden geverifieerd.", "Problemen met bezorging zijn zichtbaar in logs."],
    drawbacks: ["Er zijn vaste maandkosten.", "Domeinrecords moeten correct worden ingesteld."],
  },
  "ai-workspace": {
    simple: "Dit bepaalt of Earth Spas nu al een eigen vast AI-abonnement neemt.",
    reason: "Er wordt standaard geen apart Earth Spas-abonnement opgenomen. Een betaald plan wordt pas geactiveerd wanneer gebruik, eigendom en budget concreet zijn goedgekeurd.",
    benefits: ["Geen onnodige vaste maandkosten.", "Gebruik kan eerst via bestaande omgevingen worden beoordeeld.", "Een betaald plan blijft later direct selecteerbaar."],
    drawbacks: ["Kosten en gebruik zijn voorlopig minder zuiver toe te wijzen.", "Intensief gebruik kan later alsnog een eigen abonnement vereisen."],
  },
  design: {
    simple: "Dit is de ontwerpomgeving voor websites, apps en feedback voordat iets wordt gebouwd.",
    reason: "Figma Free is voorlopig voldoende zolang projecten en samenwerking beperkt blijven.",
    benefits: ["Geen vaste maandkosten.", "Ontwerpen en prototypes blijven centraal beschikbaar.", "Later opschalen naar Professional blijft mogelijk."],
    drawbacks: ["Teamfuncties en geschiedenis zijn beperkter.", "Grotere samenwerking kan later een betaald plan vragen."],
  },
  "social-content": {
    simple: "Dit is de werkplaats voor social posts, presentaties en eenvoudige video's.",
    reason: "Canva Free is voldoende voor de eerste contentproductie; Pro wordt pas geactiveerd wanneer merkbeheer en productievolume dat rechtvaardigen.",
    benefits: ["Geen vaste maandkosten.", "Eenvoudige posts en presentaties blijven uitvoerbaar.", "Pro blijft later als directe upgrade beschikbaar."],
    drawbacks: ["Merkbeheer en premium assets zijn beperkter.", "Sommige exports en templates ontbreken."],
  },
  "coding-ai": {
    simple: "Dit bepaalt of er naast de bestaande AI-omgeving een apart codingabonnement nodig is.",
    reason: "Er wordt standaard geen apart codingabonnement opgenomen. Dat voorkomt dubbele vaste kosten totdat structureel gebruik aantoonbaar is.",
    benefits: ["Geen dubbele AI-abonnementen.", "Losse credits blijven apart inzichtelijk.", "Een Copilot-plan kan per actieve bouwperiode worden gekozen."],
    drawbacks: ["Directe AI-hulp in de ontwikkelomgeving is beperkter.", "Intensieve bouwmaanden kunnen later een abonnement vereisen."],
  },
  stock: {
    simple: "Dit levert foto's, video, muziek en templates voor campagnes en websites.",
    reason: "Eigen en gratis assets zijn de standaard. Een betaald stockabonnement wordt alleen geactiveerd wanneer concrete productie dat nodig maakt.",
    benefits: ["Geen vaste maandkosten.", "Bestaand Earth Spas-materiaal krijgt voorrang.", "Een betaald abonnement kan per productieperiode worden aangezet."],
    drawbacks: ["De keuze is kleiner.", "Zoeken en licentiecontrole kunnen meer tijd kosten."],
  },
  voice: {
    simple: "AI-voice maakt gesproken uitleg en voice-overs zonder iedere tekst opnieuw op te nemen.",
    reason: "Er wordt geen vast voice-abonnement opgenomen zolang voice slechts incidenteel nodig is.",
    benefits: ["Geen vaste maandkosten.", "Productie kan met losse credits of bestaande middelen.", "Een abonnement blijft later selecteerbaar."],
    drawbacks: ["Iedere productie vraagt een losse oplossing.", "Beschikbare stemmen en credits zijn minder voorspelbaar."],
  },
  "video-ai": {
    simple: "AI-video helpt bij effecten, korte varianten en het aanpassen van campagnebeelden.",
    reason: "Losse media-credits passen beter zolang video alleen in specifieke campagneperioden wordt geproduceerd.",
    benefits: ["Geen doorlopend abonnement.", "Kosten ontstaan alleen bij echte productie.", "De keuze kan per campagne worden opgeschaald."],
    drawbacks: ["Kosten zijn per productiemaand minder voorspelbaar.", "Niet alle vaste productietools zijn altijd beschikbaar."],
  },
};

export const softwareAlternativeGuidance: Record<string, SoftwareAlternativeGuidance> = {
  "earthspas-card": { fitsWhen: "een normale zakelijke kaart al direct beschikbaar is", tradeoff: "de kaartlimiet moet apart worden bewaakt" },
  "personal-card": { fitsWhen: "een account tijdelijk direct moet blijven werken", tradeoff: "privé- en bedrijfskosten blijven door elkaar lopen" },
  "google-workspace": { fitsWhen: "Gmail en Google Drive duidelijk de voorkeur hebben", tradeoff: "de overstap sluit minder goed aan op gedeelde Microsoft-mailboxen" },
  "workspace-current": { fitsWhen: "een mailmigratie nu te veel risico of tijd kost", tradeoff: "bestaande eigendoms- en toegangsproblemen blijven langer bestaan" },
  "github-free": { fitsWhen: "alleen de basisfuncties van GitHub nodig zijn", tradeoff: "er zijn minder regels en teamfuncties voor beheer en controle" },
  "source-current": { fitsWhen: "de repositories tijdelijk nog niet kunnen worden overgedragen", tradeoff: "de software blijft afhankelijk van de huidige eigenaar en toegang" },
  "transip-dns": { fitsWhen: "zo min mogelijk aan de huidige domeininstellingen moet veranderen", tradeoff: "DNS, beveiliging en redirects blijven verspreid beheerd" },
  "hetzner-starter": { fitsWhen: "alleen lichte workflows en testen worden gedraaid", tradeoff: "de capaciteit kan snel te klein worden bij agents, media of meerdere services" },
  "no-server": { fitsWhen: "de serverbeslissing bewust wordt uitgesteld", tradeoff: "data en workflows blijven verspreid over losse diensten" },
  "cms-current": { fitsWhen: "de huidige contentopzet eerst stabiel moet blijven", tradeoff: "verspreide content en bestaande beperkingen blijven bestaan" },
  "no-cms": { fitsWhen: "content zelden verandert en alleen door developers wordt aangepast", tradeoff: "groei, vertalingen en automatisering worden veel lastiger" },
  make: { fitsWhen: "snel eenvoudige automatiseringen zonder serverbeheer nodig zijn", tradeoff: "kosten en limieten groeien mee met iedere uitvoering" },
  "no-automation": { fitsWhen: "processen eerst handmatig moeten worden uitgewerkt", tradeoff: "opvolging blijft tijd kosten en is makkelijker te vergeten" },
  "platform-secrets": { fitsWhen: "er weinig sleutels zijn en iedere omgeving apart beheerd kan worden", tradeoff: "sleutels raken sneller verspreid over meerdere systemen" },
  "supabase-free": { fitsWhen: "de database nog in testfase zit of nauwelijks verkeer heeft", tradeoff: "capaciteit, back-ups en garanties zijn beperkter" },
  "postgres-selfhosted": { fitsWhen: "volledige controle belangrijker is dan gemak", tradeoff: "updates, beveiliging en herstel liggen volledig bij technisch beheer" },
  "vercel-free": { fitsWhen: "de website nog experimenteel is en weinig teamfuncties nodig heeft", tradeoff: "zakelijk gebruik, support en limieten zijn beperkter" },
  "frontend-selfhosted": { fitsWhen: "alles bewust op één eigen server moet draaien", tradeoff: "deployments, schaalbaarheid en storingsbeheer vragen meer werk" },
  "resend-free": { fitsWhen: "het aantal formulieren en automatische mails nog laag is", tradeoff: "capaciteit en uitgebreide logs zijn beperkter" },
  "mail-smtp": { fitsWhen: "er geen extra verzenddienst gewenst is", tradeoff: "bezorgproblemen en automatische mails zijn lastiger te controleren" },
  "chatgpt-plus": { fitsWhen: "het gebruik licht en vooral individueel blijft", tradeoff: "de limieten zijn sneller bereikt tijdens intensieve werkweken" },
  "chatgpt-pro5": { fitsWhen: "één gebruiker structureel zeer intensief met AI werkt", tradeoff: "de vaste maandkosten zijn aanzienlijk" },
  "chatgpt-pro20": { fitsWhen: "twee gebruikers een beheerde workspace met jaarlijkse facturering nodig hebben", tradeoff: "er geldt een minimum van twee seats" },
  "chatgpt-business": { fitsWhen: "meerdere actieve gebruikers één maandelijks beheerde teamomgeving nodig hebben", tradeoff: "de maandprijs is hoger dan bij jaarlijkse facturering" },
  "figma-pro": { fitsWhen: "meerdere projecten, geschiedenis en teamfuncties structureel nodig zijn", tradeoff: "er ontstaat een extra vast abonnement" },
  "no-design-tool": { fitsWhen: "kleine wijzigingen direct in code kunnen worden gemaakt", tradeoff: "feedback en vooraf vergelijken worden onoverzichtelijker" },
  "canva-pro": { fitsWhen: "merktemplates, premium assets en veel exports nodig zijn", tradeoff: "er ontstaat een extra vast abonnement" },
  "no-content-tool": { fitsWhen: "alle content door andere professionele tools wordt gemaakt", tradeoff: "dagelijkse socialproductie wordt trager en afhankelijker van technisch werk" },
  "copilot-pro": { fitsWhen: "dagelijkse codehulp nodig is zonder zeer intensief premiumgebruik", tradeoff: "premium requests kunnen in drukke bouwmaanden sneller opraken" },
  "copilot-proplus": { fitsWhen: "actieve bouwmaanden meer premium modellen en requests vragen", tradeoff: "verbruik en overage moeten strikt worden bewaakt" },
  "copilot-max": { fitsWhen: "structureel zeer hoog agentgebruik nodig is", tradeoff: "de vaste kosten zijn veel hoger" },
  envato: { fitsWhen: "structureel veel commerciële assets nodig zijn", tradeoff: "licenties en projectregistratie moeten worden bijgehouden" },
  elevenlabs: { fitsWhen: "regelmatig meertalige voice-overs worden geproduceerd", tradeoff: "credits kunnen in drukke maanden opraken" },
  runway: { fitsWhen: "regelmatig AI-video en effecten worden geproduceerd", tradeoff: "het abonnement loopt ook door in rustige maanden" },
};
