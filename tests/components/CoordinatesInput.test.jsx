import { afterEach, describe, expect, test, vi } from "vitest";
import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import CoordinatesInput from "../../src/components/CoordinatesInput";
import userEvent from "@testing-library/user-event";

describe("CoordinatesInput", () => {
    afterEach(cleanup);
    test("renders two numeric inputs", () => {
        render(<CoordinatesInput />);

        expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
    });
    test("renders a timestamp input", () => {
        render(<CoordinatesInput />);

        expect(screen.getByRole("time")).toBeInTheDocument();
    });
    test("renders the map popover button", () => {
        render(<CoordinatesInput />);

        expect(screen.getByTestId("map-picker")).toBeInTheDocument();
    });
    test("renders an x button to remove a CoordinatesInput", () => {
        render(<CoordinatesInput />);

        expect(screen.getByRole("button", { name: "❌" })).toBeInTheDocument();
    });
    test("by default the map popover is closed", () => {
        render(<CoordinatesInput />);

        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
    test("clicking the map button opens the map popover", () => {
        render(<CoordinatesInput />);

        fireEvent.click(screen.getByTestId("map-picker"));

        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
    test("clicking the map button twice closes the map popover", () => {
        render(<CoordinatesInput />);

        fireEvent.click(screen.getByTestId("map-picker"));
        fireEvent.click(screen.getByTestId("map-picker"));

        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
    test("Clicking on the map updates latitude and longitude inputs", async () => {
        render(<CoordinatesInput />);

        // Abre el mapa
        const mapToggleButton = screen.getByTestId("map-picker");
        fireEvent.click(mapToggleButton);

        // Verifica que el mapa esté visible
        const mapElement = screen.getByRole("navigation");
        expect(mapElement).toBeInTheDocument();

        // Encuentra los inputs de latitud y longitud
        const latitudeInput = screen.getByPlaceholderText("Latitud");
        const longitudeInput = screen.getByPlaceholderText("Longitud");

        // Simula un clic en el mapa en una posición específica
        const mapContainer = mapElement.querySelector(".leaflet-container");
        expect(mapContainer).not.toBeNull();

        // Coordenadas simuladas
        const simulatedLatLng = { lat: 40.7128, lng: -74.006 };

        // Simula el evento de clic usando `act` para asegurar que React actualiza el estado
        await act(() => {
            fireEvent.click(mapContainer, {
                bubbles: true,
                clientX: simulatedLatLng.lat,
                clientY: simulatedLatLng.lng,
            });
        });

        // Verifica que los inputs tengan los valores esperados
        expect(latitudeInput.value).not.toBe("");
        expect(longitudeInput.value).not.toBe("");
    });
});
