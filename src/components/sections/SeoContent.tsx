import { Container } from "@/components/ui/Container";

export function SeoContent() {
  return (
    <section className="py-14 sm:py-16">
      <Container className="max-w-4xl">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
          Plumbi și momitoare pentru pescuit la crap și feeder
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#3D3028]/80 sm:text-base">
          <p>
            La Fishleads găsești plumbi pentru pescuit și momitoare construite pentru precizie reală pe apă: plumbi
            inline, plumbi fixați cu vârtej, plumbi grippa, plumbi pastă, plumbi pentru bag și plumbi pentru sondare.
            Pentru pescuit la feeder, ai acces la gamă variată de momitoare longcast, momitoare cilindrice, momitoare
            conice, momitoare cu placă și momitoare method pellet.
          </p>
          <p>
            Fie că pescuiești pe lac sau pe râu, alegerea corectă a gramajului și a profilului influențează direct
            distanța de lansare, stabilitatea monturii și prezentarea nadei. De aceea, fiecare model de plumb sau
            momitor este selectat pentru comportament previzibil în lansare și pe substrat.
          </p>
          <p>
            Dacă nu ești sigur ce model ți se potrivește, te ajutăm direct pe WhatsApp cu recomandări pentru montură,
            gramaj și tipul de apă pe care pescuiești. Astfel comanzi rapid, fără ghicit.
          </p>
        </div>

        <h3 className="font-heading mt-10 text-2xl font-semibold tracking-tight text-[#3D3028]">Întrebări frecvente</h3>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#3D3028]/80 sm:text-base">
          <div className="rounded-2xl border border-[#3D3028]/10 bg-white/60 p-4">
            <p className="font-semibold text-[#3D3028]">Ce plumb este bun pentru distanță mare?</p>
            <p className="mt-2">
              Pentru lanseuri lungi, cele mai căutate sunt plumbii inline și plumbii cu profil aerodinamic (de exemplu
              modele longcast), aleși în funcție de lansetă și condițiile de vânt.
            </p>
          </div>
          <div className="rounded-2xl border border-[#3D3028]/10 bg-white/60 p-4">
            <p className="font-semibold text-[#3D3028]">Ce momitoare aleg pentru pescuit la feeder?</p>
            <p className="mt-2">
              Pentru feeder, alegerea depinde de distanță și curent: momitoare cilindrice pentru control bun, momitoare
              conice sau longcast pentru distanță, iar method pellet pentru nadire rapidă.
            </p>
          </div>
          <div className="rounded-2xl border border-[#3D3028]/10 bg-white/60 p-4">
            <p className="font-semibold text-[#3D3028]">Cum comand plumbi și momitoare?</p>
            <p className="mt-2">
              Comanda se face simplu, pe WhatsApp. Trimiți modelele și gramajele dorite, iar noi confirmăm
              disponibilitatea și livrarea.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
