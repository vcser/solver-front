import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion.jsx";
import ResultsTable from "./ResultsTable.jsx";

export default function ResultsSection({ results }) {
    return (
        <>
            <h2 className="mt-8 text-2xl font-bold text-center">
                Resultados
            </h2>
            <Accordion type="single" collapsible className="w-full px-8">
                {results.fires.map((fire) => (
                    <AccordionItem value={String(fire.id)} key={fire.id}>
                        <AccordionTrigger className="bg-slate-200">Incendio {fire.id}</AccordionTrigger>
                        <AccordionContent className="">
                            <ResultsTable fire={fire} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}
