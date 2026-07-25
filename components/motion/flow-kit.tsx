"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./motion-flow.module.css";

export type FlowIcon = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  weight?: "regular" | "duotone" | "fill";
}>;

export type FlowConnector = {
  id: string;
  path: string;
  delay?: number;
  duration?: number;
  accent?: string;
  reverse?: boolean;
  showPacket?: boolean;
};

export type FlowMobileStep = {
  number: string;
  title: string;
  text: string;
  icon: FlowIcon;
};

type FlowStageProps = {
  label: string;
  children: React.ReactNode;
  mobileSteps: FlowMobileStep[];
  className?: string;
};

type FlowNodeProps = {
  x: number;
  y: number;
  width?: number;
  icon: FlowIcon;
  title: string;
  eyebrow?: string;
  text?: string;
  variant?: "card" | "hub" | "output";
  delay?: number;
};

type AnimatedConnectorLayerProps = {
  connectors: FlowConnector[];
  viewBox?: string;
};

export function FlowStage({ label, children, mobileSteps, className }: FlowStageProps) {
  return (
    <div className={[styles.stage, className].filter(Boolean).join(" ")} aria-label={label} role="group">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.desktopCanvas}>{children}</div>
      <ol className={styles.mobileFlow} aria-label={`${label} in stappen`}>
        {mobileSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={`${step.number}-${step.title}`}>
              <motion.li
                className={styles.mobileStep}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.48, delay: index * 0.04 }}
              >
                <span className={styles.mobileStepIcon}><Icon aria-hidden="true" weight="duotone" /></span>
                <span className={styles.mobileStepCopy}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <small>{step.text}</small>
                </span>
              </motion.li>
              {index < mobileSteps.length - 1 && <li className={styles.mobileArrow} aria-hidden="true">↓</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}

export function FlowNode({
  x,
  y,
  width = 18,
  icon: Icon,
  title,
  eyebrow,
  text,
  variant = "card",
  delay = 0,
}: FlowNodeProps) {
  const positionStyle = {
    "--flow-x": `${x}%`,
    "--flow-y": `${y}%`,
    "--flow-width": `${width}%`,
  } as React.CSSProperties;

  if (variant === "hub") {
    return (
      <div className={styles.nodePosition} style={positionStyle}>
        <motion.div
          className={styles.hubNode}
          initial={{ opacity: 0, scale: 0.76 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay }}
          whileHover={{ y: -5, scale: 1.025 }}
        >
          <span className={styles.hubOrb}><Icon aria-hidden="true" weight="duotone" /></span>
          {eyebrow && <span className={styles.hubEyebrow}>{eyebrow}</span>}
          <strong>{title}</strong>
          {text && <small>{text}</small>}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.nodePosition} style={positionStyle}>
      <motion.article
        className={[styles.nodeCard, variant === "output" ? styles.outputNode : ""].filter(Boolean).join(" ")}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -7, scale: 1.012 }}
      >
        <span className={styles.nodeIcon}><Icon aria-hidden="true" weight="duotone" /></span>
        <span className={styles.nodeCopy}>
          {eyebrow && <span>{eyebrow}</span>}
          <strong>{title}</strong>
          {text && <small>{text}</small>}
        </span>
      </motion.article>
    </div>
  );
}

export function AnimatedConnectorLayer({ connectors, viewBox = "0 0 1000 620" }: AnimatedConnectorLayerProps) {
  const reducedMotion = useReducedMotion();
  const instanceId = React.useId().replace(/:/g, "");
  const glowId = `flow-glow-${instanceId}`;

  return (
    <svg className={styles.connectorLayer} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connectors.map((connector, index) => {
        const accent = connector.accent ?? "var(--brand-primary)";
        const duration = connector.duration ?? 1.15;
        const dashOffset = connector.reverse ? 70 : -70;

        return (
          <g key={connector.id}>
            <path className={styles.connectorBase} d={connector.path} />
            <motion.path
              d={connector.path}
              fill="none"
              stroke={accent}
              strokeLinecap="round"
              strokeWidth="2"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.72 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration, delay: connector.delay ?? index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reducedMotion && (
              <motion.path
                d={connector.path}
                fill="none"
                stroke={accent}
                strokeDasharray="3 18"
                strokeLinecap="round"
                strokeWidth="3"
                filter={`url(#${glowId})`}
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{
                  opacity: { duration: 0.35, delay: (connector.delay ?? 0) + 0.35 },
                  strokeDashoffset: { duration: 1.9, ease: "linear", repeat: Infinity },
                }}
              />
            )}
            {!reducedMotion && connector.showPacket !== false && (
              <circle r="4.5" fill={accent} filter={`url(#${glowId})`}>
                <animateMotion
                  begin={`${(connector.delay ?? index * 0.04) + 0.55}s`}
                  dur={`${2.8 + (index % 3) * 0.35}s`}
                  path={connector.path}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}
