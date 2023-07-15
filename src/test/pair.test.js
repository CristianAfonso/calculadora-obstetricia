import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Pair from '../components/singleComponent/pair'
import { getValue } from "@testing-library/user-event/dist/utils";

test('renders basic element', () => {
    const help = "this is the help"
    const title = "this is the title"
    const measure = "this is a measure"
    const value = 44
    const mockHandler = jest.fn(x => value - x) //we check the change on the status via: intial value - new value
    let component = render(<Pair help={help} title={title} measure={measure} min={0.44} max={99} value={value} onChange={mockHandler}/>)
    mockHandler.mockReturnValueOnce(value - 98)
    const inputElement = component.getByLabelText("code")
    component.getByTitle("this is the help")
    component.getByText("this is the title:")
    component.getByPlaceholderText("this is a measure")
    component.getByDisplayValue(44)
    fireEvent.change(inputElement, {
        target: {value: 98}
    }) 
    expect(mockHandler.mock.calls).toHaveLength(1) //We have done one update
    expect(mockHandler.mock.lastCall[0]["target"]).toBe(inputElement) //The last change should be the update on inputElement
}) 