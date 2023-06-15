
    export const displayBar = (percentile, elementId) => {
        if(percentile>0 && percentile < 100){
            if(percentile > 10 && percentile < 90){
                document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #00960a, #00bd0d)';
            }else if(percentile <= 10 || percentile >= 90){
                document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#d97321, #d98600)';
            }
            document.getElementById(elementId).style.width = percentile + "%";
        }else{
            document.getElementById(elementId).style.width = "100%";
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#e33922, #e30f00)';
        }
    }
    export const matchingGA = (data,from) => {
            let iterator;
            switch(from){
                case 'DBP':
                    iterator = 800;
                    break;
                case 'CC':
                    iterator = 800;
                    break;
                case 'CA':
                    iterator = 450;
                    break;
                case 'LF':
                    iterator = 450;
                    break;
            }
            let media_anterior;
            switch(from){
                case 'DBP':
                    media_anterior = bpd_mean(1);
                    break;
                case 'CC':
                    media_anterior = cc_mean(1);
                    break;
                case 'CA':
                    media_anterior = ca_mean(1);
                    break;
                case 'LF':
                    media_anterior = lf_mean(1);
                    break;
            }
            let ga;
            for (let i = 7; i < iterator; i++) {
                let media;
                switch(from){
                    case 'DBP':
                        media = bpd_mean(i/7.0);
                        break;
                    case 'CC':
                        media = cc_mean(i/7.0);
                        break;
                    case 'CA':
                        media = ca_mean(i/7.0);
                        break;
                    case 'LF':
                        media = lf_mean(i/7.0);
                        break;
                }
                if (data < media) {
                    if ((data - media_anterior) <= (data - media)) {
                        ga = (i - 1);
                        return ga;
                    } else {
                        ga = i;
                        return ga;
                    }
                } else {
                    switch(from){
                        case 'DBP':
                            media_anterior = bpd_mean(i/7.0);
                            break;
                        case 'CC':
                            media_anterior = cc_mean(i/7.0);
                            break;
                        case 'CA':
                            media_anterior = ca_mean(i/7.0);
                            break;
                        case 'LF':
                            media_anterior = lf_mean(i/7.0);
                            break;
                    }
                }
            }
    }
    export const getZPercent = (z) => {
        if (z < -3.5)
            return 0;
        if (z > 3.5)
            return 100;
    
        let factK = 1;
        let sum = 0;
        let term = 1;
        let k = 0;
        let loopStop = Math.exp(-23);
        while (Math.abs(term) > loopStop) {
            term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
            sum += term;
            k++;
            factK *= k;
    
        }
        sum += 0.5;
    
        return sum * 100;
    }
    export const bpd_mean = (ga) => {
        let mean = 5.60878 + 0.158369 * Math.pow(ga,2) - 0.00256379 * Math.pow(ga,3);
        return mean;
    }
    
    export const bpd_sd = (ga) => {
        let sd = Math.exp(0.101242 + 0.00150557 * Math.pow(ga,3) - 0.000771535 * Math.pow(ga,3) * Math.log(ga) + 0.0000999638 * Math.pow(ga,3) * (Math.log(ga) * Math.log(ga)));
        return sd;
    }
    export const cc_mean = (ga) => {
        let mean = -28.2849 + 1.69267 * Math.pow(ga,2) - 0.397485 *Math.pow(ga,2)* Math.log(ga);
        return mean;
    }
    
    export const cc_sd = (ga) => {
        let sd = 1.98735 + 0.0136772 *  Math.pow(ga,3) - 0.00726264 * Math.pow(ga,3)* Math.log(ga) + 0.000976253 * ga * ga * ga * Math.pow((Math.log(ga)), 2);
        return sd;
    }
    export const ca_mean = (ga) => {
        let mean = -81.3243 + 11.6772 * ga - 0.000561865 * Math.pow(ga,3);
        return mean;
    }
    
    export const ca_sd = (ga) => {
        let sd = -4.36302 + 0.121445 * Math.pow(ga,2) - 0.0130256 * Math.pow(ga,3) + 0.00282143 * Math.pow(ga,3) * Math.log(ga);
        return sd;
    }
    
    export const lf_mean = (ga) => {
        let mean = -39.9616 + 4.32298 * ga - 0.0380156 * Math.pow(ga,2);
        return mean;
    }
    
    export const lf_sd = (ga) => {
        let sd = Math.pow(Math.E, 0.605843 - 42.0014 * Math.pow(ga, -2) + 0.00000917972 * Math.pow(ga,3));
        return sd;
    }

