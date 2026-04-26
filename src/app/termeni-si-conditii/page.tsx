import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND_NAME } from "@/data/site";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: `Termeni și condiții de utilizare pentru ${BRAND_NAME}.`,
};

export default function TermeniSiConditiiPage() {
  const actualizatLa = "26 aprilie 2026";

  return (
    <main className="py-14 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm text-[#3D3028]/70">
          <Link href="/" className="underline-offset-4 transition hover:underline">
            Înapoi la pagina principală
          </Link>
        </p>

        <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
          Termeni și condiții
        </h1>
        <p className="mt-3 text-sm text-[#3D3028]/70">Ultima actualizare: {actualizatLa}</p>

        <div className="mt-8 space-y-7 text-sm leading-relaxed text-[#3D3028]/90">
          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">1. Informații generale</h2>
            <p className="mt-2">
              Site-ul este administrat de Fishleads SRL, J40/2676/2016, CUI 35698748, cu sediul în Vicina nr. 6,
              bl. 29B, scara A, etaj 5, ap. 32, sector 5. Prin accesarea și utilizarea acestui site, confirmați că ați
              citit, înțeles și acceptat acești termeni și condiții.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">2. Scopul site-ului</h2>
            <p className="mt-2">
              Site-ul are rol de prezentare a produselor comercializate de Fishleads SRL și de facilitare a contactului
              pentru solicitări de ofertă și comenzi, în principal prin WhatsApp. Informațiile afișate (descrieri,
              gramaje și prețuri) sunt orientative și pot fi actualizate fără notificare prealabilă.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">3. Comenzi și disponibilitate</h2>
            <p className="mt-2">
              Comenzile se confirmă individual, în urma discuției directe cu un reprezentant. Disponibilitatea
              produselor poate varia în funcție de stoc. Ne rezervăm dreptul de a refuza sau anula o solicitare în
              situații justificate, inclusiv lipsa stocului, erori de preț sau informații incomplete din partea
              clientului.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">4. Prețuri și plată</h2>
            <p className="mt-2">
              Prețurile sunt exprimate în lei (RON). Costurile de livrare, metodele de plată și condițiile comerciale
              finale sunt comunicate la momentul confirmării comenzii. Fishleads SRL poate modifica prețurile fără o
              notificare prealabilă, modificările neafectând comenzile deja confirmate.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">5. Livrare și retur</h2>
            <p className="mt-2">
              Termenele de livrare sunt estimate și pot varia în funcție de curier și de localitate. În cazul
              produselor deteriorate la transport sau livrate eronat, vă rugăm să ne contactați cât mai rapid pentru
              soluționare. Condițiile concrete de retur sau înlocuire sunt comunicate în funcție de natura produsului
              și de situația semnalată.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">6. Drepturi de proprietate intelectuală</h2>
            <p className="mt-2">
              Conținutul site-ului (texte, imagini, elemente grafice, logo-uri) aparține Fishleads SRL sau este
              utilizat cu acordul titularilor de drepturi. Copierea, reproducerea, distribuirea sau utilizarea fără
              acordul prealabil scris este interzisă.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">7. Limitarea răspunderii</h2>
            <p className="mt-2">
              Depunem eforturi pentru ca informațiile afișate să fie corecte și actualizate, dar nu garantăm absența
              erorilor. Fishleads SRL nu răspunde pentru eventuale prejudicii rezultate din utilizarea site-ului sau
              din indisponibilitatea temporară a acestuia.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">8. Legea aplicabilă</h2>
            <p className="mt-2">
              Acești termeni și condiții sunt guvernați de legislația din România. Eventualele litigii se soluționează
              pe cale amiabilă, iar în caz contrar de instanțele competente din România.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
