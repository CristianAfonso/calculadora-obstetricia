import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { hospitalGetWeight, hospitalAuxSD, hospitalGetZscore } from '../functions';
require("highcharts/highcharts-more")(Highcharts);

export default function LancetChart(props) {
    const [ga, setGa] = useState(props.ga);
    const [weight, setWeight] = useState(props.weight);
    const [genre, setGenre] = useState(props.genre);
    const { t } = useTranslation();
    const ejeXLancet = ['20+0', '20+1', '20+2', '20+3', '20+4', '20+5', '20+6',
        '21+0', '21+1', '21+2', '21+3', '21+4', '21+5', '21+6',
        '22+0', '22+1', '22+2', '22+3', '22+4', '22+5', '22+6',
        '23+0', '23+1', '23+2', '23+3', '23+4', '23+5', '23+6',
        '24+0', '24+1', '24+2', '24+3', '24+4', '24+5', '24+6',
        '25+0', '25+1', '25+2', '25+3', '25+4', '25+5', '25+6',
        '26+0', '26+1', '26+2', '26+3', '26+4', '26+5', '26+6',
        '27+0', '27+1', '27+2', '27+3', '27+4', '27+5', '27+6',
        '28+0', '28+1', '28+2', '28+3', '28+4', '28+5', '28+6',
        '29+0', '29+1', '29+2', '29+3', '29+4', '29+5', '29+6',
        '30+0', '30+1', '30+2', '30+3', '30+4', '30+5', '30+6',
        '31+0', '31+1', '31+2', '31+3', '31+4', '31+5', '31+6',
        '32+0', '32+1', '32+2', '32+3', '32+4', '32+5', '32+6',
        '33+0', '33+1', '33+2', '33+3', '33+4', '33+5', '33+6',
        '34+0', '34+1', '34+2', '34+3', '34+4', '34+5', '34+6',
        '35+0', '35+1', '35+2', '35+3', '35+4', '35+5', '35+6',
        '36+0', '36+1', '36+2', '36+3', '36+4', '36+5', '36+6',
        '37+0', '37+1', '37+2', '37+3', '37+4', '37+5', '37+6',
        '38+0', '38+1', '38+2', '38+3', '38+4', '38+5', '38+6',
        '39+0', '39+1', '39+2', '39+3', '39+4', '39+5', '39+6',
        '40+0', '40+1', '40+2', '40+3', '40+4', '40+5', '40+6']

    let weightData = [];
      
    let gregorioMaleSD;
    let gregorioMaleWeight;
    let gregorioMalep10;
    let gregorioMalep90;
    let rangesGregorioMale = [];
    let averagesGregorioMale = [];

    let gregorioFemaleSD;
    let gregorioFemaleWeight;
    let gregorioFemalep10;
    let gregorioFemalep90;
    let rangesGregorioFemale = [];
    let averagesGregorioFemale = [];

    let gregorioMaleLancetWeight;
    let gregorioMaleLancetSD;
    let gregorioMaleLancetp10;
    let gregorioMaleLancetp90;
    let rangesGregorioMaleLancet = [];
    let averagesGregorioMaleLancet = [];

    let gregorioFemaleLancetWeight;
    let gregorioFemaleLancetSD;
    let gregorioFemaleLancetp10;
    let gregorioFemaleLancetp90;
    let rangesGregorioFemaleLancet = [];
    let averagesGregorioFemaleLancet = [];

    let clinicMaleWeight;
    let clinicMalep10;
    let clinicMalep90;
    let rangesClinicMale = [];
    let averagesClinicMale = [];

    let clinicFemaleWeight;
    let clinicFemalep10;
    let clinicFemalep90;
    let rangesClinicFemale = [];
    let averagesClinicFemale = [];

    let talaveraMaleWeight;
    let talaveraMaleSD ;
    let talaveraMalep10;
    let talaveraMalep90;
    let rangesTalaveraMale = [];
    let averagesTalaveraMale= [];

    let talaveraFemaleWeight;
    let talaveraFemaleSD ;
    let talaveraFemalep10;
    let talaveraFemalep90;
    let rangesTalaveraFemale = [];
    let averagesTalaveraFemale= [];

    let fuenlabradaMaleWeight;
    let fuenlabradaMaleSD ;
    let fuenlabradaMalep10;
    let fuenlabradaMalep90;
    let rangesFuenlabradaMale = [];
    let averagesFuenlabradaMale= [];

    let fuenlabradaFemaleWeight;
    let fuenlabradaFemaleSD ;
    let fuenlabradaFemalep10;
    let fuenlabradaFemalep90;
    let rangesFuenlabradaFemale = [];
    let averagesFuenlabradaFemale= [];
    for (let i = 140, j = 0; i <= 286; i++, j++) {
        if(ejeXLancet[j] === ejeXLancet[(ga*7).toFixed(0)-140]){
            console.log(j + "--");
            console.log(ga*7-140);
            weightData.push([ejeXLancet[j], parseInt(weight)]);
        }else{
            weightData.push({ data:[ parseInt(weight), {marker: {
                    fillColor: '#FFF',
                    lineWidth: 0,
                    lineColor: "#FFFF",
                    visible: false}, y: ejeXLancet[j]}]});
            
        }
        //GregorioMale
        gregorioMaleWeight = Math.exp(hospitalGetWeight(i / 7, "male", "gregorio"));
        gregorioMaleSD = hospitalAuxSD(gregorioMaleWeight, "male", "gregorio2");
        gregorioMalep10 = (-1.28 * gregorioMaleSD) + gregorioMaleWeight;
        gregorioMalep90 = (1.28 * gregorioMaleSD) + gregorioMaleWeight;
        rangesGregorioMale.push([ejeXLancet[j], gregorioMalep10, gregorioMalep90]);
        averagesGregorioMale.push([ejeXLancet[j], gregorioMaleWeight]);
        //GregorioFemale
        gregorioFemaleWeight = Math.exp(hospitalGetWeight(i / 7, "female", "gregorio"));
        gregorioFemaleSD = hospitalAuxSD(gregorioFemaleWeight, "female", "gregorio2");
        gregorioFemalep10 = (-1.28 * gregorioFemaleSD) + gregorioFemaleWeight;
        gregorioFemalep90 = (1.28 * gregorioFemaleSD) + gregorioFemaleWeight;
        rangesGregorioFemale.push([ejeXLancet[j], gregorioFemalep10, gregorioFemalep90]);
        averagesGregorioFemale.push([ejeXLancet[j], gregorioFemaleWeight]);
        //GregorioLancetMale
        gregorioMaleLancetWeight = (hospitalGetWeight(i / 7, "male", "gregorio2"));
        gregorioMaleLancetSD = hospitalAuxSD(gregorioMaleLancetWeight, "male", "gregorio2");
        gregorioMaleLancetp10 = (-1.28 * gregorioMaleLancetSD) + gregorioMaleLancetWeight;
        gregorioMaleLancetp90 = (1.28 * gregorioMaleLancetSD) + gregorioMaleLancetWeight;
        rangesGregorioMaleLancet.push([ejeXLancet[j], gregorioMaleLancetp10, gregorioMaleLancetp90]);
        averagesGregorioMaleLancet.push([ejeXLancet[j], gregorioMaleLancetWeight]);
        //GregorioLancetFemale
        gregorioFemaleLancetWeight = (hospitalGetWeight(i / 7, "female", "gregorio2"));
        gregorioFemaleLancetSD = hospitalAuxSD(gregorioFemaleLancetWeight, "female", "gregorio2");
        gregorioFemaleLancetp10 = (-1.28 * gregorioFemaleLancetSD) + gregorioFemaleLancetWeight;
        gregorioFemaleLancetp90 = (1.28 * gregorioFemaleLancetSD) + gregorioFemaleLancetWeight;
        rangesGregorioFemaleLancet.push([ejeXLancet[j], gregorioFemaleLancetp10, gregorioFemaleLancetp90]);
        averagesGregorioFemaleLancet.push([ejeXLancet[j], gregorioFemaleLancetWeight]);
        //clinicMale
        clinicMaleWeight = (hospitalGetWeight(i / 7, "male", "clinic"));
        clinicMalep10 = (0.86) * clinicMaleWeight;
        clinicMalep90 = clinicMaleWeight + clinicMaleWeight - clinicMalep10;
        rangesClinicMale.push([ejeXLancet[j], clinicMalep10, clinicMalep90]);
        averagesClinicMale.push([ejeXLancet[j], clinicMaleWeight]);
        //clinicFemale
        clinicFemaleWeight = (hospitalGetWeight(i / 7, "female", "clinic"));
        clinicFemalep10 = (0.86) * clinicFemaleWeight;
        clinicFemalep90 = clinicFemaleWeight + clinicFemaleWeight - clinicFemalep10;
        rangesClinicFemale.push([ejeXLancet[j], clinicFemalep10, clinicFemalep90]);
        averagesClinicFemale.push([ejeXLancet[j], clinicFemaleWeight]);
        //talaveraMale
        talaveraMaleWeight = (hospitalGetWeight(i / 7, "male", "talavera"));
        talaveraMaleSD = hospitalAuxSD(talaveraMaleWeight, "male", "talavera");
        talaveraMalep10 = (-1.28 * talaveraMaleSD) + talaveraMaleWeight;
        talaveraMalep90 = (1.28 * talaveraMaleSD) + talaveraMaleWeight;
        rangesTalaveraMale.push([ejeXLancet[j], talaveraMalep10, talaveraMalep90]);
        averagesTalaveraMale.push([ejeXLancet[j], talaveraMaleWeight]);
        //talaveraFemale
        talaveraFemaleWeight = (hospitalGetWeight(i / 7, "female", "talavera"));
        talaveraFemaleSD = hospitalAuxSD(talaveraFemaleWeight, "female", "talavera");
        talaveraFemalep10 = (-1.28 * talaveraFemaleSD) + talaveraFemaleWeight;
        talaveraFemalep90 = (1.28 * talaveraFemaleSD) + talaveraFemaleWeight;
        rangesTalaveraFemale.push([ejeXLancet[j], talaveraFemalep10, talaveraFemalep90]);
        averagesTalaveraFemale.push([ejeXLancet[j], talaveraFemaleWeight]);
        //talaveraMale
        fuenlabradaMaleWeight = (hospitalGetWeight(i / 7, "male", "fuenlabrada"));
        fuenlabradaMaleSD = hospitalAuxSD(fuenlabradaMaleWeight, "male", "fuenlabrada");
        fuenlabradaMalep10 = (-1.28 * fuenlabradaMaleSD) + fuenlabradaMaleWeight;
        fuenlabradaMalep90 = (1.28 *  fuenlabradaMaleSD) + fuenlabradaMaleWeight;
        rangesFuenlabradaMale.push([ejeXLancet[j], fuenlabradaMalep10, fuenlabradaMalep90]);
        averagesFuenlabradaMale.push([ejeXLancet[j], fuenlabradaMaleWeight]);
        //talaveraFemale
        fuenlabradaFemaleWeight = (hospitalGetWeight(i / 7, "female", "fuenlabrada"));
        fuenlabradaFemaleSD = hospitalAuxSD(fuenlabradaFemaleWeight, "female", "fuenlabrada");
        fuenlabradaFemalep10 = (-1.28 * fuenlabradaFemaleSD) + fuenlabradaFemaleWeight;
        fuenlabradaFemalep90 = (1.28 * fuenlabradaFemaleSD) + fuenlabradaFemaleWeight;
        rangesFuenlabradaFemale.push([ejeXLancet[j], fuenlabradaFemalep10, fuenlabradaFemalep90]);
        averagesFuenlabradaFemale.push([ejeXLancet[j], fuenlabradaFemaleWeight]);
    }
    const options = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: t('percent')
        },
        xAxis: {
            categories: ejeXLancet,
            events: {
                setExtremes: function(event) {
                    let enabled = event.min === undefined ? false : true;
                    for(let i = 0; i < this.series.lenght; i++){
                        this.series[i].options.marker.enabled = enabled;
                    }
                    
                }
            }
        },
        yAxis: {
            title: {
                floor: 0,
                min: 0,
                text: null,
                max: 5000
            }
        },
        tooltip: {
            crosshairs: true,
            shared: false,
            valueSuffix: 'gr.',
            valueDecimals: 0
        },
        series: [
            
            {
                name: 'p50 HUGH ' + t('male'),
                data: averagesGregorioMale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[0],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }
            , {
                name: 'p10-p90 HUGH ' + t('male'),
                data: rangesGregorioMale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 HUGH ' + t('female'),
                data: averagesGregorioFemale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[1],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[1]
                }
            }
            ,
            {
                name: 'p10-p90 HUGH ' + t('female'),
                data: rangesGregorioFemale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[1],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 HUGH ' + t('male'),
                data: averagesGregorioMaleLancet,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[2],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[2]
                }
            }
            , {
                name: 'p10-p90 ' + t('male'),
                data: rangesGregorioMaleLancet,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[2],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 HUGH ' + t('female'),
                data: averagesGregorioFemaleLancet,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[3],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3]
                }
            }
            , {
                name: 'p10-p90 HUGH ' + t('female'),
                data: rangesGregorioFemaleLancet,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Clinic ' + t('male'),
                data: averagesClinicMale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[4],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[4]
                }
            }
            , {
                name: 'p10-p90 Clinic ' + t('male'),
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Clinic ' + t('female'),
                data: averagesClinicMale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[5],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[5]
                }
            }
            , {
                name: 'p10-p90 Clinic ' + t('female'),
                data: rangesClinicFemale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Talavera ' + t('male'),
                data: averagesTalaveraMale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[6],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[6]
                }
            }
            , {
                name: 'p10-p90 Talavera ' + t('male'),
                data: rangesTalaveraMale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[6],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Talavera ' + t('female'),
                data: averagesTalaveraFemale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[7],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[7]
                }
            }
            , {
                name: 'p10-p90 Talavera ' + t('female'),
                data: rangesTalaveraFemale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[7],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Fuenlabrada ' + t('male'),
                data: averagesFuenlabradaMale,
                zIndex: 1,
                marker: {
                    fillColor: Highcharts.getOptions().colors[8],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[8]
                }
            }
            , {
                name: 'p10-p90 Fuenlabrada ' + t('male'),
                data: rangesFuenlabradaMale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[8],
                fillOpacity: 0.1,
            },
            {
                name: 'p50 Fuenlabrada ' + t('female'),
                data: averagesFuenlabradaFemale,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[9]
                }
            }
            , {
                name: 'p10-p90 Fuenlabrada ' + t('female'),
                data: rangesFuenlabradaFemale,
                type: 'arearange',
                lineWidth: 0,
                marker:{enabled:false},
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[9],
                fillOpacity: 0.1,
            },
            {
                name: t('introduced_weight'),
                data: weightData,
                zIndex: 1,
                marker: {
                    enabled:true,
                    fillColor: Highcharts.getOptions().colors[10],
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[10],
                    
                },
                dataLabels: {
                    enabled:true,
                    formatter: function(){
                        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
                        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio");
                        return gregorioCalculatedZscore.toFixed(2) + ' z';
                    }
                }
            }]
    }
    useEffect(() =>{
        setWeight(props.weight);
        setGa(props.ga);
        setGenre(props.genre);
    }, [props.weight, props.ga, props.genre])
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}