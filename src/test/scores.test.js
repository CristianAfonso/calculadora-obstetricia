import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Scores from '../components/singleComponent/scores'

test('renders basic element', () => {
    const zscore = 0.55;
    const percent = 99;
    const component = render(<Scores zscore={zscore} percent={percent}/>)
    component.getByText("0.55 z");
    component.getByText("99 p");
})
test('renders with weeks and days', () => {
    const zscore = 4;
    const percent = 70;
    const weeks = 15;
    const days = 3;
    const component = render(<Scores zscore={zscore} percent={percent} weeks={weeks} days={days} />)
    component.getByText("4 z");
    component.getByText("70 p");
    component.getByText("15 w 3 d");
})
test('renders MoM', () => {
    const zscore = 2;
    const mom = 80;
    const component = render(<Scores zscore={zscore} mom={mom} />)
    component.getByText("2 z");
    component.getByText("MoM 80");
})
