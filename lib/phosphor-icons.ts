import * as React from "react";
import {
  Archive as ArchiveIcon,
  ArrowClockwise as ArrowClockwiseIcon,
  ArrowRight as ArrowRightIcon,
  Briefcase as BriefcaseIcon,
  CalendarBlank as CalendarBlankIcon,
  CaretRight as CaretRightIcon,
  ChartBar as ChartBarIcon,
  ChartLine as ChartLineIcon,
  ChatText as ChatTextIcon,
  Check as CheckIcon,
  ClipboardText as ClipboardTextIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
  CreditCard as CreditCardIcon,
  CurrencyEur as CurrencyEurIcon,
  Database as DatabaseIcon,
  DownloadSimple as DownloadSimpleIcon,
  EnvelopeSimple as EnvelopeSimpleIcon,
  FadersHorizontal as FadersHorizontalIcon,
  FileText as FileTextIcon,
  FloppyDisk as FloppyDiskIcon,
  FlowArrow as FlowArrowIcon,
  Gauge as GaugeIcon,
  GitBranch as GitBranchIcon,
  Globe as GlobeIcon,
  HardDrives as HardDrivesIcon,
  Headphones as HeadphonesIcon,
  Image as ImageIcon,
  Info as InfoIcon,
  Key as KeyIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MagicWand as MagicWandIcon,
  Pause as PauseIcon,
  Pulse as PulseIcon,
  Robot as RobotIcon,
  RocketLaunch as RocketLaunchIcon,
  ShieldCheck as ShieldCheckIcon,
  Sparkle as SparkleIcon,
  Target as TargetIcon,
  Users as UsersIcon,
  Video as VideoIcon,
  Wallet as WalletIcon,
  Warning as WarningIcon,
  X as XIcon,
} from "@phosphor-icons/react/ssr";

type PhosphorProps = Record<string, unknown> & {
  weight?: string;
};

function filled(Icon: React.ElementType) {
  const FilledIcon = React.forwardRef<SVGSVGElement, PhosphorProps>((props, ref) =>
    React.createElement(Icon, {
      ...props,
      ref,
      weight: "fill",
    }),
  );

  FilledIcon.displayName = "FilledPhosphorIcon";
  return FilledIcon;
}

export const Activity = filled(PulseIcon);
export const ArchiveBox = filled(ArchiveIcon);
export const ArrowClockwise = filled(ArrowClockwiseIcon);
export const ArrowRight = filled(ArrowRightIcon);
export const Briefcase = filled(BriefcaseIcon);
export const CalendarBlank = filled(CalendarBlankIcon);
export const CaretRight = filled(CaretRightIcon);
export const ChartBar = filled(ChartBarIcon);
export const ChartLine = filled(ChartLineIcon);
export const ChatText = filled(ChatTextIcon);
export const Check = filled(CheckIcon);
export const ClipboardText = filled(ClipboardTextIcon);
export const Cloud = filled(CloudIcon);
export const Code = filled(CodeIcon);
export const CreditCard = filled(CreditCardIcon);
export const CurrencyEur = filled(CurrencyEurIcon);
export const Database = filled(DatabaseIcon);
export const DownloadSimple = filled(DownloadSimpleIcon);
export const EnvelopeSimple = filled(EnvelopeSimpleIcon);
export const FileText = filled(FileTextIcon);
export const FloppyDisk = filled(FloppyDiskIcon);
export const FlowArrow = filled(FlowArrowIcon);
export const FadersHorizontal = filled(FadersHorizontalIcon);
export const Gauge = filled(GaugeIcon);
export const GitBranch = filled(GitBranchIcon);
export const Globe = filled(GlobeIcon);
export const Server = filled(HardDrivesIcon);
export const Headphones = filled(HeadphonesIcon);
export const Image = filled(ImageIcon);
export const Info = filled(InfoIcon);
export const Key = filled(KeyIcon);
export const Layout = filled(LayoutIcon);
export const List = filled(ListIcon);
export const MagicWand = filled(MagicWandIcon);
export const Pause = filled(PauseIcon);
export const Robot = filled(RobotIcon);
export const RocketLaunch = filled(RocketLaunchIcon);
export const ShieldCheck = filled(ShieldCheckIcon);
export const Sparkle = filled(SparkleIcon);
export const Target = filled(TargetIcon);
export const Users = filled(UsersIcon);
export const Video = filled(VideoIcon);
export const Wallet = filled(WalletIcon);
export const Warning = filled(WarningIcon);
export const X = filled(XIcon);
