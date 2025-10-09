import { redirect } from "next/navigation";
import { defaultLang } from "@/i18n";

export default function RootPage() {
  // 重定向到默认语言路径
  redirect(`/${defaultLang}`);
}
