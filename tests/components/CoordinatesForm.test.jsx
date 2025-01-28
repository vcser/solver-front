import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import CoordinatesForm from "../../src/components/CoordinatesForm";


describe("CoordinatesForm", () => {
    afterEach(cleanup);
    test("renders a form", () => {
        render(<CoordinatesForm />);

        expect(screen.getByRole("form")).toBeInTheDocument();
    });
    test("renders a button to add more CoordinatesInput", () => {
        render(<CoordinatesForm />);

        expect(screen.getByRole("button", { name: "➕" })).toBeInTheDocument();
    });
    test("clicking the Add button adds another CoordinatesInput", () => {
        render(<CoordinatesForm />);

        fireEvent.click(screen.getByRole("button", { name: "➕" }));

        expect(screen.getAllByRole("spinbutton")).toHaveLength(4);
    });
    test("clicking the x button removes a CoordinatesInput", () => {
        render(<CoordinatesForm />);

        fireEvent.click(screen.getByRole("button", { name: "❌" }));

        expect(screen.queryAllByRole("spinbutton")).toHaveLength(0);
    });
    test("renders a submit button", () => {
        render(<CoordinatesForm />);

        expect(screen.getByTestId("submit")).toBeInTheDocument();
    });
    test.skip("clicking the submit button after filling the form logs the correct data", () => {
        render(<CoordinatesForm />);

        const consoleSpy = vi.spyOn(console, "log");

        fireEvent.change(screen.getAllByRole("spinbutton")[0], { target: { value: 40.7128 } });
        fireEvent.change(screen.getAllByRole("spinbutton")[1], { target: { value: 74.0060 } });
        fireEvent.change(screen.getByRole("time"), { target: { value: "2021-07-14T16:00" } });
        fireEvent.click(screen.getByTestId("submit"));

        expect(consoleSpy).toHaveBeenCalledWith({ latitude: 40.7128, longitude: 74.006, timestamp: "2021-07-14T16:00" });
    })
}); 
