import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND_NAME, WHATSAPP_DISPLAY, buildWhatsAppUrl } from "@/data/site";

const quick = [
  { href: "#acasa", label: "Acasă" },
  { href: "#momitoare", label: "Momitoare" },
  { href: "#plumbi", label: "Plumbi" },
  { href: "#cosulete-feeder", label: "Coșulețe feeder" },
  { href: "#despre", label: "Despre noi" },
  { href: "#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
];

export function Footer() {
  const wa = buildWhatsAppUrl(
    "Salut! Am o întrebare despre produsele voastre (plumbi / momitoare).",
  );

  return (
    <footer className="mt-auto border-t border-[#3D3028]/[0.08] bg-[#2A2420] text-[#F9F7F2]">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="relative block size-12 overflow-hidden">
              <Image src="/logo-2.png" alt="" fill className="object-contain p-1" sizes="48px" />
            </span>
            <div>
              <p className="font-heading text-lg font-semibold tracking-tight">{BRAND_NAME}</p>
              <p className="text-sm text-white/70">Precizie pe apă, din pasiune.</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">Meniu rapid</p>
          <ul className="mt-4 space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={wa} className="transition hover:text-white" target="_blank" rel="noopener noreferrer">
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>Comenzi și sfaturi de montură — răspuns rapid.</li>
          </ul>
        </div>
        <div className="lg:col-span-1">
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">Comandă</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Spune-ne modelul și gramajul — îți confirmăm disponibilitatea și livrarea.
          </p>
          <div className="mt-5">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">Informații legale</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/75">
              <li>Fishleads SRL</li>
              <li>J40/2676/2016</li>
              <li>CUI 35698748</li>
              <li>Vicina nr. 6, bl. 29B, scara A, etaj 5, ap. 32, sector 5</li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-start justify-between gap-3 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. Toate drepturile rezervate.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/55 transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <p className="text-white/45">Fabricat și verificat cu grijă pentru pescari.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
