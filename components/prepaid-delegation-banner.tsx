import Link from "next/link";
import { ArrowRight, Check, CreditCard } from "@/lib/phosphor-icons";

const steps = [
  "Earth Spas bepaalt het budget",
  "Earth Spas vult de prepaidkaart",
  "Volker regelt en test alles",
];

export function PrepaidDelegationBanner() {
  return (
    <section className="prepaid-delegation-section theme-secondary">
      <div className="content-shell">
        <div className="prepaid-delegation-card">
          <span className="prepaid-delegation-icon" aria-hidden="true">
            <CreditCard className="h-7 w-7" weight="duotone" />
          </span>
          <div className="prepaid-delegation-copy">
            <p className="eyebrow">Wat Earth Spas zelf moet doen</p>
            <h2>Budget goedkeuren en prepaidkaart vullen</h2>
            <p>
              Daarna kan Volker de volledige digitale inrichting namens Earth Spas uitvoeren: accounts aanmaken, organisaties en teams opzetten, licenties kopen, de kaart koppelen, factuurgegevens instellen, beheerders uitnodigen, limieten activeren en bestaande omgevingen migreren. Earth Spas hoeft dus niet zelf door alle technische portalen en instellingen te werken.
            </p>
            <p>
              Alle accounts, facturen, domeinen, data en herstelroutes worden wel direct eigendom van Earth Spas. Het saldo op de kaart vormt de harde bestedingsgrens en nieuwe kosten worden alleen binnen het afgesproken budget geactiveerd.
            </p>
            <div className="prepaid-delegation-steps">
              {steps.map((step, index) => (
                <div key={step}>
                  <span className="prepaid-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <div className="prepaid-delegation-actions">
              <Link href="/calculator" className="action-link">
                <span>Controleer het budget</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="prepaid-delegation-proof">
                <Check className="h-4 w-4" weight="bold" />
                Geen privévoorschotten meer nodig
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
