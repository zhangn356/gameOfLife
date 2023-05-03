/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import Board from "../Board";

describe("Board", () => {

  it ("renders the simulation board", () => {
    render(<Board rows={5} cols={5} />);
  });

  it ("toggles cell state from dead to alive or alive to dead when clicked", () => {
      /* store the getByTestId method from render object */
    const { getByTestId } = render(< Board rows = {5} cols = {5}/>); 
    const cell = getByTestId('cell-0-0');
    fireEvent.click(cell);
    expect (cell.getAttribute('class')).toMatch(/alive/);
    fireEvent.click(cell);
    expect (cell.getAttribute('class')).not.toMatch(/alive/);
});

it ("navigates through cells in the direction of the corresponding arrow keys", () => {
    const { getByTestId } = render(< Board rows = {5} cols = {5}/>); 
    const testCell = getByTestId('cell-0-0');
    const cell1 = getByTestId('cell-1-0');
    const cell2 = getByTestId('cell-1-1');
    const cell3 = getByTestId('cell-0-1'); 

    fireEvent.keyDown(testCell, {key: 'ArrowDown'});
    expect (document.activeElement).toBe(cell1);
    fireEvent.keyDown(cell1, {key: 'ArrowRight'});
    expect (document.activeElement).toBe(cell2); 
    fireEvent.keyDown(cell2, {key: 'ArrowUp'});
    expect (document.activeElement).toBe(cell3);
    fireEvent.keyDown(cell3, {key: 'ArrowLeft'});
    expect (document.activeElement).toBe(testCell);
})

it ("brings user to beginning of row or end of row when going past board's horizontal borders", () => {
        const { getByTestId } = render(< Board rows = {5} cols = {5}/>); 
        const testCell = getByTestId('cell-0-0'); 
        const cell1 = getByTestId('cell-0-4');
        fireEvent.keyDown(testCell, {key: 'ArrowLeft'});
        expect (document.activeElement).toBe(cell1)
        fireEvent.keyDown(cell1, {key: 'ArrowRight'});
        expect (document.activeElement).toBe(testCell);
})

it ("brings user to beginning of col or end of col when going past board's vertical borders", () => {
    const { getByTestId } = render(< Board rows = {5} cols = {5}/>); 
    const testCell = getByTestId('cell-0-0'); 
    const cell1 = getByTestId('cell-4-0');
    fireEvent.keyDown(testCell, {key: 'ArrowUp'});
    expect (document.activeElement).toBe(cell1)
    fireEvent.keyDown(cell1, {key: 'ArrowDown'});
    expect (document.activeElement).toBe(testCell);  
} )

})
