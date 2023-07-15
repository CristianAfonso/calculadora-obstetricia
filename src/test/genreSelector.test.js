import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import GenreSelector from '../components/singleComponent/genreSelector'
test('renders content', () => {
    const mockHandler = jest.fn()
    const component = render(<GenreSelector handleSelectGenre={mockHandler}/>)
    const maleButton = component.getByText('male')
    const femaleButton = component.getByText('female')
    fireEvent.click(maleButton) //click on male
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(femaleButton) //click on female
    expect(mockHandler.mock.calls).toHaveLength(2)
    expect(mockHandler.mock.lastCall[0]["target"]).toBe(femaleButton) //The last should be female
})