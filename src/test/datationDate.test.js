import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import DatationDates from '../components/singleComponent/datationDates'
import { subDays } from "date-fns";
import { matchingGA } from "../components/functions";

const date = new Date('July 15, 2023'); //create date for tests 
function getFur(calculatedDays) {
    const newDate = subDays(date, calculatedDays);
    return (newDate);
}
test('renders content and calcs lcc', () => {
    const lcc = 100
    const lccGa = matchingGA(lcc, "LCC")
    const lccDate = getFur(lccGa)
    const component = render(<DatationDates lastFur={date} displayedNewFur={lccDate}/>)
    component.getByText('28/3/2023') //(newFur) calcs obtined by original calculator
    component.getByText('15/7/2023') //(lastFur) first date
})
test('renders content and calcs dbp', () => {
    const dbp = 95
    const dbpGa = matchingGA(dbp, "DBP")
    const dbpDate = getFur(dbpGa)
    const component = render(<DatationDates lastFur={date} displayedNewFur={dbpDate}/>)
    component.getByText('6/10/2022') //(newFur) calcs obtined by original calculator
    component.getByText('15/7/2023') //(lastFur) calcs obtined by original calculator
})
test('renders content and calcs lf', () => {
    const lf = 75
    const lfGa = matchingGA(lf, "LF")
    const lfDate = getFur(lfGa)
    const component = render(<DatationDates lastFur={date} displayedNewFur={lfDate}/>)
    component.getByText('21/9/2022') //(newFur) calcs obtined by original calculator
    component.getByText('15/7/2023') //(lastFur) calcs obtined by original calculator
})