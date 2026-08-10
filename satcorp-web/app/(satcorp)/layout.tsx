import { DivisionShell } from "@/components/system/DivisionShell";

export default function SatcorpLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="satcorp">{children}</DivisionShell>;
}
