/* eslint-disable no-undef */
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";
import Board from "../Board";

describe("Board", () => {
  it("renders the simulation board", () => {
    render(<Board rows={5} cols={5} />);
  });

  let board;

  beforeEach(() => {
    board = render(<Board rows={5} cols={5} />);
  });

  it("toggles cell state when clicked", () => {
    /* store the getByTestId method from render object */
    const { getByTestId } = board;
    const cell = getByTestId("cell-0-0");
    fireEvent.click(cell);
    expect(cell.getAttribute("class")).toMatch(/alive/);
    fireEvent.click(cell);
    expect(cell.getAttribute("class")).not.toMatch(/alive/);
  });

  it("toggles cell state with enter key", () => {
    const { getByTestId } = board;
    const cell = getByTestId("cell-0-0");
    fireEvent.keyDown(cell, { key: "Enter" });
    expect(cell.getAttribute("class")).toMatch(/alive/);
  });

  it("navigates through cells in the direction of the corresponding arrow keys", () => {
    const { getByTestId } = board;
    const testCell = getByTestId("cell-0-0");
    const cell1 = getByTestId("cell-1-0");
    const cell2 = getByTestId("cell-1-1");
    const cell3 = getByTestId("cell-0-1");

    fireEvent.keyDown(testCell, { key: "ArrowDown" });
    expect(document.activeElement).toBe(cell1);
    fireEvent.keyDown(cell1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(cell2);
    fireEvent.keyDown(cell2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(cell3);
    fireEvent.keyDown(cell3, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(testCell);
  });

  it("brings user to beginning of row or end of row when going past board's horizontal borders", () => {
    const { getByTestId } = board;
    const testCell = getByTestId("cell-0-0");
    const cell1 = getByTestId("cell-0-4");
    fireEvent.keyDown(testCell, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(cell1);
    fireEvent.keyDown(cell1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(testCell);
  });

  it("brings user to beginning of col or end of col when going past board's vertical borders", () => {
    const { getByTestId } = board;
    const testCell = getByTestId("cell-0-0");
    const cell1 = getByTestId("cell-4-0");
    fireEvent.keyDown(testCell, { key: "ArrowUp" });
    expect(document.activeElement).toBe(cell1);
    fireEvent.keyDown(cell1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(testCell);
  });

  it("starts and stops the game when start button is clicked", () => {
    const { getByTitle, getByLabelText } = board;
    jest.useFakeTimers();
    const start = getByLabelText("Start Game");
    fireEvent.click(start);
    const pause = getByTitle("Pause");
    expect(pause).toBeInTheDocument();
    fireEvent.click(pause);
    expect(start).toBeInTheDocument();
  });

  test("randomizer button sets state to grid with alive cells", () => {
    const { getByTestId } = board;
    const button = getByTestId("randomizer");
    const testBoard = getByTestId("grid");
    fireEvent.click(button);
    const cells = testBoard.children;
    let setGrid = false;
    for (const cell of cells) {
      if (cell.getAttribute("class").includes("alive")) {
        setGrid = true;
        break;
      }
    }
    expect(setGrid).toBe(true);
  });

  test("reset button resets grid to initial state", () => {
    const { getByTestId } = board;
    const cell = getByTestId("cell-0-0");
    const reset = getByTestId("reset-button");
    const randomizer = getByTestId("randomizer");
    /* ensures all updates to a component are apploed before continuing with further tests */
    act(() => {
      fireEvent.click(cell);
      fireEvent.click(reset);
    });
    expect(cell.getAttribute("class")).not.toMatch(/alive/);

    act(() => {
      fireEvent.click(randomizer);
      fireEvent.click(reset);
    });
    const totalCells = getByTestId("grid").querySelectorAll("[class*=alive]");
    expect(totalCells.length).toEqual(0);
  });
});
