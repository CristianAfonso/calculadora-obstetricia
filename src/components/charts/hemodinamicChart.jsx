import { useTranslation } from "react-i18next";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { aipi_mean, aipi_sd, mca_mean, mca_sd, cpr_mean, cpr_sd, ua_mean, ua_sd, vdpi_mean, vdpi_sd, avpi_mean, avpi_sd } from '../functions';
require("highcharts/highcharts-more")(Highcharts);

export default function HemodinamicChart() {
    const { t } = useTranslation();
    const xAxis = ['20+0', '20+1', '20+2', '20+3', '20+4', '20+5', '20+6',
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

    let averagesUAPI = [];
    let rangesUAPI = [];
    let averagesMCAPI = [];
    let rangesMCAPI = [];
    let averagesCPR = [];
    let rangesCPR = [];
    let averagesUAAPI = [];
    let rangesUAAPI = [];
    let averagesVDPI = [];
    let rangesVDPI = [];
    let averagesAIPI = [];
    let rangesAIPI = [];
    function getP05(sd, mean) {
        return (-1.645 * sd) + mean;
    }
    function getP95(sd, mean) {
        return (1.645 * sd) + mean;
    }
    for (let i = 140, j = 0; i <= 286; i++, j++) {

        let aipiMean = aipi_mean(i / 7);
        let aipiSD = aipi_sd(i / 7);
        rangesAIPI.push([xAxis[j], getP05(aipiSD, aipiMean), getP95(aipiSD, aipiMean)]);
        averagesAIPI.push([xAxis[j], aipiMean]);

        let mcaMean = mca_mean(i / 7);
        let mcaSD = mca_sd(i / 7);
        rangesMCAPI.push([xAxis[j], getP05(mcaSD, mcaMean), getP95(mcaSD, mcaMean)]);
        averagesMCAPI.push([xAxis[j], mcaMean]);

        let cprMean = cpr_mean(i / 7);
        let cprSD = cpr_sd(i / 7);
        rangesCPR.push([xAxis[j], getP05(cprSD, cprMean), getP95(cprSD, cprMean)]);
        averagesCPR.push([xAxis[j], cprMean]);

        let uaaMean = avpi_mean(i / 7);
        let uaaSD = avpi_sd(i / 7);
        rangesUAAPI.push([xAxis[j], getP05(uaaSD, uaaMean), getP95(uaaSD, uaaMean)]);
        averagesUAAPI.push([xAxis[j], uaaMean]);

        let uapiMean = ua_mean(i / 7);
        let uapiSD = ua_sd(i / 7);
        rangesUAPI.push([xAxis[j], getP05(uapiSD, uapiMean), getP95(uapiSD, uapiMean)]);
        averagesUAPI.push([xAxis[j], uapiMean]);

        let vdpiMean = vdpi_mean(i / 7);
        let vdpiSD = vdpi_sd(i / 7);
        rangesVDPI.push([xAxis[j], getP05(vdpiSD, vdpiMean), getP95(vdpiSD, vdpiMean)]);
        averagesVDPI.push([xAxis[j], vdpiMean]);


    }
    const options = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: t('percents')
        },

        xAxis: {
            categories: xAxis
        },

        yAxis: {
            title: {
                floor: 0,
                min: 0,
                text: null,
                max: 4000
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: 'IP',
            valueDecimals: 3
        },

        legend: {
        },
        series: [
            {
                name: t('UA_help'),
                data: averagesUAPI,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }
            ,
            {
                name: 'p05-p95 ' + t('UA_help'),
                data: rangesUAPI,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
            ,
            {
                name: t('MCA_help'),
                data: averagesMCAPI,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[1]
                }
            }
            , {
                name: 'p05-p95 ' + t('MCA_help'),
                data: rangesMCAPI,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[1],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
            ,
            {
                name: t('ratio_help'),
                data: averagesCPR,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[2]
                }
            }
            , {
                name: 'p05-p95 ' + t('ratio_help'),
                data: rangesCPR,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[2],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
            ,
            {
                name: t('uterine_artery_help'),
                data: averagesUAAPI,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3]
                }
            }
            , {
                name: 'p05-p95 ' + t('uterine_artery_help'),
                data: rangesUAAPI,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
            ,
            {
                name: t('DV_help'),
                data: averagesVDPI,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[4]
                }
            }
            , {
                name: 'p05-p95 ' + t('DV_help'),
                data: rangesVDPI,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
            ,
            {
                name: t('AI_help'),
                data: averagesAIPI,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[5]
                }
            }
            , {
                name: 'p05-p95 ' + t('AI_help'),
                data: rangesAIPI,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.1,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }

        ]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}
