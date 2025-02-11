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
    test.skip("Clicking on the map updates latitude and longitude inputs", async () => {
        render(<CoordinatesInput />);

    // Abre el mapa
    fireEvent.click(screen.getByTestId("map-picker"));

    // Encuentra el mapa y los inputs
    const map = screen.getByRole("navigation");
    const latitudeInput = screen.getAllByRole("spinbutton")[0];
    const longitudeInput = screen.getAllByRole("spinbutton")[1];

    // Mock del evento de clic en el mapa
    await act(async () => {
        // Simula un clic en el mapa con coordenadas ficticias
        fireEvent.click(map, {
            latlng: { lat: 10.123, lng: 20.456 },
        });
    });

    // Asegúrate de que los inputs se hayan actualizado correctamente
    expect(latitudeInput.value).toBe("10.123");
    expect(longitudeInput.value).toBe("20.456");
    });
        
});
