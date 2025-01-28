import { afterEach, describe, expect, test, vi } from "vitest";
import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import MapSelector from "../../src/components/MapSelector";

describe("MapSelector", () => {
    afterEach(cleanup);
    test.skip("Clicking on the map calls setPosition", async () => {
        const setPosition = vi.fn(); // Mock de setPosition

        // Renderiza el componente MapSelector
        render(
            <MapSelector
                position={[-37.38997332696627, -72.35919919536599]}
                setPosition={setPosition}
            />,
        );

        const mapElement = screen.getByRole("navigation");
        expect(mapElement).toBeInTheDocument();

        // Inicializa el mapa de Leaflet dentro del contenedor
        const mapContainer = mapElement.querySelector(".leaflet-container");
        expect(mapContainer).not.toBeNull();

        // Simula el evento de Leaflet manualmente
        await act(() => {
            fireEvent.click(mapContainer, {
                bubbles: true,
                clientX: simulatedLatLng.lat,
                clientY: simulatedLatLng.lng,
            });
        });

        // Verifica que setPosition haya sido llamado
        expect(setPosition).toHaveBeenCalled();
    });
});
