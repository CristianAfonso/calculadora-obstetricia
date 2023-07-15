import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Bar from '../components/singleComponent/percentileBar'
import { displayBar } from "../components/functions";
test('renders content', () => {
    const percent  = 25;
    const id = 'percentile-bar';
    const component = render(<Bar percent={percent} id={id}/>)
    component.getByText('p25') //Must show p25
})
test('bar width 100%', () =>{
    const percent  = 112;
    const id = 'percentile-bar';
    render(<Bar percent={percent} id={id}/>)
    displayBar(112, id);
    const content = document.getElementById(id);
    expect(content).toHaveStyle('width:100%'); //Expected width 100% for p112
})
test('both test, p44', () =>{
    const percent  = 44;
    const id = 'percentile-bar';
    const component = render(<Bar percent={percent} id={id}/>)
    displayBar(44, id);
    const content = document.getElementById(id);
    expect(content).toHaveStyle('width:44%'); //Expected width 44% for p44
    component.getByText('p44') //Must show p44
})

