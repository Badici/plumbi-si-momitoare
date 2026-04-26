import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND_NAME, WHATSAPP_DISPLAY } from "@/data/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: `Politica de confidențialitate pentru ${BRAND_NAME}.`,
};

export default function PoliticaDeConfidentialitatePage() {
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
          Politica de confidențialitate
        </h1>
        <p className="mt-3 text-sm text-[#3D3028]/70">Ultima actualizare: {actualizatLa}</p>

        <div className="mt-8 space-y-7 text-sm leading-relaxed text-[#3D3028]/90">
          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">1. Operatorul datelor</h2>
            <p className="mt-2">
              Operatorul datelor cu caracter personal este Fishleads SRL, J40/2676/2016, CUI 35698748, cu sediul în
              Vicina nr. 6, bl. 29B, scara A, etaj 5, ap. 32, sector 5.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">2. Ce date putem colecta</h2>
            <p className="mt-2">
              Putem prelucra date furnizate direct de dumneavoastră în conversațiile de comandă sau solicitare de
              informații, precum: nume, număr de telefon, adresă de livrare, detalii de comandă și orice alte informații
              transmise voluntar.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">3. Scopurile prelucrării</h2>
            <p className="mt-2">Datele sunt prelucrate pentru:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>preluarea, confirmarea și livrarea comenzilor;</li>
              <li>comunicarea cu clienții privind produsele și comenzile;</li>
              <li>îndeplinirea obligațiilor legale (contabile, fiscale, arhivare).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">4. Temeiul legal</h2>
            <p className="mt-2">
              Prelucrarea datelor se bazează, după caz, pe executarea unui contract, îndeplinirea obligațiilor legale
              și interesul legitim de a răspunde solicitărilor primite și de a desfășura activitatea comercială în
              condiții normale.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">5. Durata stocării</h2>
            <p className="mt-2">
              Datele sunt păstrate atât timp cât este necesar pentru scopurile menționate mai sus sau conform termenelor
              prevăzute de lege. După expirarea perioadelor legale, datele sunt șterse sau anonimizate, după caz.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">6. Cui putem transmite datele</h2>
            <p className="mt-2">
              Datele pot fi transmise către furnizori implicați în procesul de livrare, servicii de contabilitate sau
              alte entități către care avem obligații legale de raportare. Nu vindem date personale către terți.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">7. Drepturile dumneavoastră</h2>
            <p className="mt-2">
              Aveți dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate, în limitele
              prevăzute de legislația aplicabilă. De asemenea, aveți dreptul de a depune o plângere la autoritatea
              competentă pentru protecția datelor.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">8. Contact pentru confidențialitate</h2>
            <p className="mt-2">
              Pentru orice solicitare privind datele personale, ne puteți contacta la numărul de WhatsApp{" "}
              {WHATSAPP_DISPLAY}. Vom răspunde într-un termen rezonabil, conform obligațiilor legale.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[#3D3028]">9. Modificări ale politicii</h2>
            <p className="mt-2">
              Putem actualiza această politică periodic pentru a reflecta modificări legislative sau operaționale.
              Versiunea actualizată va fi publicată pe această pagină.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
