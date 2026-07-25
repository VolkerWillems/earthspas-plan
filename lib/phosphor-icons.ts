import * as React from "react";
import * as Icons from "@phosphor-icons/react/ssr";

const phosphor = Icons as Record<string, any>;

type PhosphorProps = Record<string, unknown> & {
  weight?: string;
};

function filled(Icon: any) {
  const FilledIcon = React.forwardRef<SVGSVGElement, PhosphorProps>((props, ref) =>
    React.createElement(Icon, {
      ...props,
      ref,
      weight: "fill",
    }),
  );

  FilledIcon.displayName = `Filled${Icon?.displayName ?? Icon?.name ?? "PhosphorIcon"}`;
  return FilledIcon;
}

export const Activity = filled(phosphor.PulseIcon ?? phosphor.Pulse);
export const ArchiveBox = filled(phosphor.ArchiveIcon ?? phosphor.Archive);
export const ArrowClockwise = filled(phosphor.ArrowClockwiseIcon ?? phosphor.ArrowClockwise);
export const ArrowRight = filled(phosphor.ArrowRightIcon ?? phosphor.ArrowRight);
export const Briefcase = filled(phosphor.BriefcaseIcon ?? phosphor.Briefcase);
export const CalendarBlank = filled(phosphor.CalendarBlankIcon ?? phosphor.CalendarBlank);
export const CaretRight = filled(phosphor.CaretRightIcon ?? phosphor.CaretRight);
export const ChartBar = filled(phosphor.ChartBarIcon ?? phosphor.ChartBar);
export const ChartLine = filled(phosphor.ChartLineIcon ?? phosphor.ChartLine);
export const ChatText = filled(phosphor.ChatTextIcon ?? phosphor.ChatText);
export const Check = filled(phosphor.CheckIcon ?? phosphor.Check);
export const ClipboardText = filled(phosphor.ClipboardTextIcon ?? phosphor.ClipboardText);
export const Cloud = filled(phosphor.CloudIcon ?? phosphor.Cloud);
export const Code = filled(phosphor.CodeIcon ?? phosphor.Code);
export const CreditCard = filled(phosphor.CreditCardIcon ?? phosphor.CreditCard);
export const CurrencyEur = filled(phosphor.CurrencyEurIcon ?? phosphor.CurrencyEur);
export const Database = filled(phosphor.DatabaseIcon ?? phosphor.Database);
export const DownloadSimple = filled(phosphor.DownloadSimpleIcon ?? phosphor.DownloadSimple);
export const EnvelopeSimple = filled(phosphor.EnvelopeSimpleIcon ?? phosphor.EnvelopeSimple);
export const FileText = filled(phosphor.FileTextIcon ?? phosphor.FileText);
export const FloppyDisk = filled(phosphor.FloppyDiskIcon ?? phosphor.FloppyDisk);
export const FlowArrow = filled(phosphor.FlowArrowIcon ?? phosphor.FlowArrow);
export const FadersHorizontal = filled(phosphor.FadersHorizontalIcon ?? phosphor.FadersHorizontal);
export const Gauge = filled(phosphor.GaugeIcon ?? phosphor.Gauge);
export const GitBranch = filled(phosphor.GitBranchIcon ?? phosphor.GitBranch);
export const Globe = filled(phosphor.GlobeIcon ?? phosphor.Globe);
export const Server = filled(phosphor.HardDrivesIcon ?? phosphor.HardDrives);
export const Headphones = filled(phosphor.HeadphonesIcon ?? phosphor.Headphones);
export const Image = filled(phosphor.ImageIcon ?? phosphor.Image);
export const Info = filled(phosphor.InfoIcon ?? phosphor.Info);
export const Key = filled(phosphor.KeyIcon ?? phosphor.Key);
export const Layout = filled(phosphor.LayoutIcon ?? phosphor.Layout);
export const List = filled(phosphor.ListIcon ?? phosphor.List);
export const MagicWand = filled(phosphor.MagicWandIcon ?? phosphor.MagicWand);
export const Pause = filled(phosphor.PauseIcon ?? phosphor.Pause);
export const Robot = filled(phosphor.RobotIcon ?? phosphor.Robot);
export const RocketLaunch = filled(phosphor.RocketLaunchIcon ?? phosphor.RocketLaunch);
export const ShieldCheck = filled(phosphor.ShieldCheckIcon ?? phosphor.ShieldCheck);
export const Sparkle = filled(phosphor.SparkleIcon ?? phosphor.Sparkle);
export const Target = filled(phosphor.TargetIcon ?? phosphor.Target);
export const Users = filled(phosphor.UsersIcon ?? phosphor.Users);
export const Video = filled(phosphor.VideoIcon ?? phosphor.Video);
export const Wallet = filled(phosphor.WalletIcon ?? phosphor.Wallet);
export const Warning = filled(phosphor.WarningIcon ?? phosphor.Warning);
export const X = filled(phosphor.XIcon ?? phosphor.X);
