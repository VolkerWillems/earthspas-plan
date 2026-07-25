"use client";

import * as React from "react";
import { ArrowDown, Check, DeviceMobile, ShareNetwork, X } from "@/lib/phosphor-icons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const DISMISS_KEY = "earth-spas-install-prompt-dismissed";
const DISMISS_DURATION = 30 * 24 * 60 * 60 * 1000;

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches
    || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [ios, setIos] = React.useState(false);
  const [installed, setInstalled] = React.useState(false);

  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is useful, but a failed registration must never block the plan site.
      });
    }

    const mobile = window.matchMedia("(max-width: 820px) and (pointer: coarse)").matches;
    if (!mobile || isStandalone()) return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DURATION) return;

    const iosDevice = isIosDevice();
    setIos(iosDevice);

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setInstalled(true);
      setVisible(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    let timer: number | undefined;
    if (iosDevice) timer = window.setTimeout(() => setVisible(true), 900);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
      setVisible(true);
    } else {
      dismiss();
    }
    setInstallEvent(null);
  };

  if (!visible) return null;

  return (
    <div className="install-prompt" role="dialog" aria-modal="true" aria-labelledby="install-prompt-title">
      <button type="button" className="install-prompt-backdrop" onClick={dismiss} aria-label="Installatiemelding sluiten" />
      <div className="install-prompt-card">
        <button type="button" className="install-prompt-close" onClick={dismiss} aria-label="Sluiten"><X aria-hidden="true" /></button>
        <span className="install-prompt-icon">{installed ? <Check aria-hidden="true" /> : <DeviceMobile aria-hidden="true" />}</span>
        <div>
          <p className="eyebrow">Earth Spas op je telefoon</p>
          <h2 id="install-prompt-title">{installed ? "App geïnstalleerd" : "Installeer deze keuzehulp als app"}</h2>
          <p>
            {installed
              ? "De keuzehulp staat nu tussen je apps en opent voortaan zonder browserbalken."
              : ios
                ? "Open het deelmenu in Safari en kies daarna ‘Zet op beginscherm’. Apple laat websites dit helaas nog steeds niet met één fatsoenlijke knop doen."
                : "Open sneller, gebruik het volledige scherm en bewaar je ingevulde keuzes lokaal op dit apparaat."}
          </p>
        </div>

        {!installed && (
          <div className="install-prompt-actions">
            {ios ? (
              <div className="install-prompt-ios-step"><ShareNetwork aria-hidden="true" /><span>Tik op delen</span><ArrowDown aria-hidden="true" /><strong>Zet op beginscherm</strong></div>
            ) : installEvent ? (
              <button type="button" className="install-prompt-primary" onClick={install}>Nu installeren</button>
            ) : (
              <p className="install-prompt-waiting">De installatieknop verschijnt zodra je browser de app gereed heeft gemaakt.</p>
            )}
            <button type="button" className="install-prompt-secondary" onClick={dismiss}>Niet nu</button>
          </div>
        )}
      </div>
    </div>
  );
}
