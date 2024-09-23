import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, it } from "vitest";
import RegisterForm from "../../src/components/auth/RegisterForm";

describe("RegisterForm component", () => {
    it("renders registration form correctly", () => {
        render(<RegisterForm onRegister={() => {}} />);

        // Check if form elements are present
        expect(screen.getByText("Symbol (username):")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByLabelText("Faction:")).toBeInTheDocument();
        expect(screen.getByLabelText("Password:")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
    });

    it("handles user input and calls onRegister callback", async () => {
        // Mock the onRegister callback
        const mockOnRegister = vi.fn();
        const user = userEvent.setup();

        render(<RegisterForm onRegister={mockOnRegister} />);

        // Simulate user input
        await user.type(
            screen.getByLabelText("Symbol (username):"),
            "testSymbol"
        );
        await user.type(screen.getByLabelText("Email:"), "test@example.com");
        await user.selectOptions(screen.getByLabelText("Faction:"), "VOID");
        await user.type(screen.getByLabelText("Password:"), "testPassword");

        // Simulate button click
        await user.click(screen.getByRole("button"));
        // Verify that the onRegister callback was called with the correct values
        expect(mockOnRegister).toHaveBeenCalledTimes(1);
        expect(mockOnRegister).toHaveBeenCalledWith(
            "testSymbol",
            "test@example.com",
            "VOID",
            "testPassword"
        );
    });
});
