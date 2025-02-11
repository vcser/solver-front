import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion.jsx";
import ResultsTable from "./ResultsTable.jsx";

export default function ResultsSection({ results, selection, setSelection }) {
    return (
        <>
            <h2 className="mt-8 mb-4 text-2xl font-bold text-center">
                Resultados
            </h2>
            <Accordion type="multiple" collapsible className="w-full px-10">
                {results.fires.map((fire) => (
                    <AccordionItem value={String(fire.id)} key={fire.id}>
                        <AccordionTrigger>Incendio {fire.id}</AccordionTrigger>
                        <AccordionContent>
                            <ResultsTable fire={fire} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}
