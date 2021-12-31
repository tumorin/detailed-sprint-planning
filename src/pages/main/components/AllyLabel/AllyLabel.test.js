import { render, screen } from "@testing-library/react";
import AllyLabel from "./AllyLabel";

describe("AllyLabel", () => {
    it('render AllyLabel', () => {
        render(<AllyLabel  label={"BG"}/> );
        expect(screen.getByText("BG")).toBeInTheDocument();
        expect(screen.getByText("BG")).toHaveClass('ally-label');
    })

});