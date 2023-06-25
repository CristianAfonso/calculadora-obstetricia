import { useTranslation } from "react-i18next";
export const displayBar = (percentile, elementId) => {
    if (percentile > 0 && percentile < 100) {
        if (percentile > 10 && percentile < 90) {
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #00960a, #00bd0d)';
        } else if (percentile <= 10 || percentile >= 90) {
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#d97321, #d98600)';
        }
        document.getElementById(elementId).style.width = percentile + "%";
    } else {
        document.getElementById(elementId).style.width = "100%";
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#e33922, #e30f00)';
    }
}
export const displayMoMBar = (mom, elementId) => {
    if (mom > 1.6) {
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#e33922, #e30f00)';
        document.getElementById(elementId).style.width = "100%";
    } else if (mom > 1.5) {
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#d97321, #d98600)';
        document.getElementById(elementId).style.width = parseFloat((mom/1.6)*100) + "%";
    } else if (mom > 1.3) {
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#d9cf21, #d98600)';
        document.getElementById(elementId).style.width = parseFloat((mom/1.6)*100) + "%";
    }else{
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #00960a, #00bd0d)';
        document.getElementById(elementId).style.width = parseFloat((mom/1.6)*100) + "%";
    }
    
}
export const matchingGA = (data, from) => {
    let iterator;
    switch (from) {
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
        default:
            return;
    }
    let media_anterior;
    switch (from) {
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
        default:
            return;
    }
    let ga;
    for (let i = 7; i < iterator; i++) {
        let media;
        switch (from) {
            case 'DBP':
                media = bpd_mean(i / 7.0);
                break;
            case 'CC':
                media = cc_mean(i / 7.0);
                break;
            case 'CA':
                media = ca_mean(i / 7.0);
                break;
            case 'LF':
                media = lf_mean(i / 7.0);
                break;
            default:
                return;
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
            switch (from) {
                case 'DBP':
                    media_anterior = bpd_mean(i / 7.0);
                    break;
                case 'CC':
                    media_anterior = cc_mean(i / 7.0);
                    break;
                case 'CA':
                    media_anterior = ca_mean(i / 7.0);
                    break;
                case 'LF':
                    media_anterior = lf_mean(i / 7.0);
                    break;
                default:
                    return;
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
    let mean = 5.60878 + 0.158369 * Math.pow(ga, 2) - 0.00256379 * Math.pow(ga, 3);
    return mean;
}

export const bpd_sd = (ga) => {
    let sd = Math.exp(0.101242 + 0.00150557 * Math.pow(ga, 3) - 0.000771535 * Math.pow(ga, 3) * Math.log(ga) + 0.0000999638 * Math.pow(ga, 3) * (Math.log(ga) * Math.log(ga)));
    return sd;
}
export const cc_mean = (ga) => {
    let mean = -28.2849 + 1.69267 * Math.pow(ga, 2) - 0.397485 * Math.pow(ga, 2) * Math.log(ga);
    return mean;
}

export const cc_sd = (ga) => {
    let sd = 1.98735 + 0.0136772 * Math.pow(ga, 3) - 0.00726264 * Math.pow(ga, 3) * Math.log(ga) + 0.000976253 * ga * ga * ga * Math.pow((Math.log(ga)), 2);
    return sd;
}
export const ca_mean = (ga) => {
    let mean = -81.3243 + 11.6772 * ga - 0.000561865 * Math.pow(ga, 3);
    return mean;
}

export const ca_sd = (ga) => {
    let sd = -4.36302 + 0.121445 * Math.pow(ga, 2) - 0.0130256 * Math.pow(ga, 3) + 0.00282143 * Math.pow(ga, 3) * Math.log(ga);
    return sd;
}

export const lf_mean = (ga) => {
    let mean = -39.9616 + 4.32298 * ga - 0.0380156 * Math.pow(ga, 2);
    return mean;
}

export const lf_sd = (ga) => {
    let sd = Math.pow(Math.E, 0.605843 - 42.0014 * Math.pow(ga, -2) + 0.00000917972 * Math.pow(ga, 3));
    return sd;
}

export const EFW_Hadlock2Weight = (ac, hc, fl) => {
    const efw = hadlock2_mean(ac, hc, fl);
    const ds = hadlock2_sd(efw);
    return efw;
}
export const EFW_Hadlock2Age = (ac, hc, fl) => {
    const Hadlock2GA = ((matchingGA(ac, "CA") + matchingGA(hc, "CC") + matchingGA(fl, "LF")) / 3);
    return Hadlock2GA;
}
export const EFW_Hadlock3Weight = (ac, fl, bpd) => {
    const efw = hadlock3(ac, fl, bpd);
    return efw;
}
export const EFW_Hadlock3Age = (ac, fl, bpd) => {
    const Hadlock3GA = ((matchingGA(ac, "CA") + matchingGA(fl, "LF") + matchingGA(bpd, "DBP")) / 3);
    return Hadlock3GA;
}

const hadlock2_mean = (ac, hc, fl) => {
    const efw = Math.pow(10, 1.326 - (0.00326 * ac / 10 * fl / 10) + (0.0107 * hc / 10) + (0.0438 * ac / 10) + (0.158 * fl / 10));
    return efw;
}

const hadlock2_sd = (efw) => {
    if (efw < 1500) {
        return 109.0;
    } else if ((efw >= 1500) && (efw < 2000)) {
        return 173.0;
    } else if ((efw >= 2000) && (efw < 2500)) {
        return 221.0;
    } else if ((efw >= 2500) && (efw < 3000)) {
        return 258.0;
    } else if ((efw >= 3000) && (efw < 3500)) {
        return 290.0;
    } else if ((efw >= 3500) && (efw < 4000)) {
        return 333.0;
    } else if (efw >= 4000) {
        return 382.0;
    }
}

export const hadlock3 = (ac, fl, bpd) => {
    const efw = Math.pow(10, 1.335 - (0.0034 * ac / 10 * fl / 10) + (0.0316 * bpd / 10) + (0.0457 * ac / 10) + (0.1623 * fl / 10));
    return efw;
}

export const hospitalGetWeight = (ga, genre, hospital) => {
    if (!genre) {
        genre = 'male';
    }
    let genreValue = 0;
    switch (hospital) {
        case "gregorio":
            const eg = 0.00920217;
            const eg2 = 0.00645354;
            const eg3 = -0.00010245;
            if (genre === "male") {
                genreValue = 0.03942451;
            }
            const constant = 3.9486685;
            return constant + (eg * ga) + (eg2 * Math.pow(ga, 2)) + (eg3 * Math.pow(ga, 3)) + (genreValue);
        case "clinic":
            if (genre === 'male') {
                genreValue = Math.round(3431.640);
            } else {
                genreValue = Math.round(3431.640 - 103.056);
            }
            const mean_weight = genreValue * (2.991 - (ga * 0.3185) + (Math.pow(ga, 2) * 0.01094) - (Math.pow(ga, 3) * 0.0001055));
            return mean_weight;
        default:
            return 2;
    }
}

export const hospitalGetZscore = (weight, referenceWeight, hospital) => {
    switch (hospital) {
        case "gregorio":
            const mse = 0.12801644;
            return ((Math.log(weight) - referenceWeight) / mse);
        case "clinic":
            const p10_weight = (0.86 * referenceWeight);
            const standardDeviation = (referenceWeight - p10_weight) / 1.28;
            const error = weight - (69.906 - (0.023 * weight));
            const zScore = (error - referenceWeight) / standardDeviation;
            return zScore;
        default:
            return 0;
    }
}
	/*
* 
* 
* UNICOS
* eg = 0.00920217;
* eg2 = 0.00645354;
* eg3 = -0.00010245;
* sexo = 0.03942451;
* constante = 3.9486685;
* mse = 0.12801644;
* 
* 
* GEMELOS
* eg = -0.4602458;
* eg2 = 0.01879654;
* eg3 = -0.00020637;
* sexo = 0.04579971;
* constante = 9.6297115;
* mse = 0.1391164;
* 
* TRIPLES
* eg = 2.0200247;
* eg2 = -0.05827472;
* eg3 = 0.00058056;
* sexo = 0.11269155;
* constante = -16.676953;
* mse = 0.16071315;
* 
* */

/*
    Hemodinamic
    */
const ua_mean = (ga) => {
    const mean = (3.55219 - (0.13558 * ga)) + (0.00174 * Math.pow(ga,2));
    return mean;
}
    
const ua_sd = (ga) => {
    const sd = 0.299; //????????????
    return sd;
}

const mca_mean = (ga) => {
	const mean = -2.7317 + (0.3335 * ga) - (0.0058 * ga * ga);
	return mean;
}

const mca_sd = (ga) => {
	const sd = -0.88005 + (0.08182 * ga) - (0.00133 * ga * ga);
	return sd;
}
const cpr_mean = (ga)  => {
	const mean = -4.0636 + (0.383 * ga) - (0.0059 * ga * ga);
	return mean;
}

const cpr_sd = (ga)  => {
	const sd = -0.9664 + (0.09027 * ga) - (0.0014 * ga * ga);
	return sd;
}
const avpi_mean = (ga) => {
	const mean = 1.39 - (0.012 * ga) + (0.0000198 * ga * ga);
	return mean;
}
const avpi_sd = (ga) => {
	const sd = 0.272 - (0.000259 * ga);
	return sd;
}

const vdpi_mean = (ga) => {
	const mean = 0.903 + (-0.0116 * ga);
	return mean;
}

const vdpi_sd = (ga) => {
	const sd = 0.1483;
	return sd;
}

const aipi_mean = (ga) => {
	const mean = 2.2562 + (0.0154 * ga);
	return mean;
}

const aipi_sd = (ga) => {
	const sd = 0.014199 + (0.011635 * ga);
	return sd;
}

export const getUAZscore = (ga, ua) => {
    const uaMean    = ua_mean(ga);
    const uaSD      = ua_sd(ga);
    const uaZscore  = ((ua - uaMean)/uaSD);
    return uaZscore;
}
export const getMCAZscore = (ga, mca) => {
    const mcaMean    = mca_mean(ga);
    const mcaSD      = mca_sd(ga);
    const mcaZscore  = ((mca - mcaMean)/mcaSD);
    return mcaZscore;
}
export const getCPRZscore = (mca, ua, ga) => {
    const cpr = mca/ua;
    const cprMean    = cpr_mean(ga);
    const cprSD      = cpr_sd(ga);
    const cprZscore  = ((cpr - cprMean)/cprSD);
    return cprZscore;

}
export const getUAZscore_GregorioFormula = (ga, ua) => {
    const mean = 1.74 - (ga * 0.0238731473944725);
	const sd = 0.25825;
	const zscore = (ua - mean) / sd;
    return zscore;
}
export const getMCAZscore_GregorioFormula = (ga, mca) => {
    const mean = -0.885496 + (ga * 0.209341) - (0.003686 * Math.pow(ga,2));
	const sd = 0.7217442 - (0.0080618 * ga);
	const zscore = (mca - mean) / sd;
    return zscore;
}

export const mcaExpectedSpeed = (ga)  => {
    const expectedSpeed = Math.exp(2.31 + (0.046 * ga));
    return expectedSpeed;
}
export const mcaMOM = (mcaSV, acmEV)  => {
    return (mcaSV/acmEV);
}
export const getUAMeanZscore = (ga, mean) => {
    const uaExpected = avpi_mean(ga * 7);
    const uaSd = avpi_sd(ga* 7);
    const uaZscore = ((Math.log(mean)) - uaExpected) / uaSd;
    return uaZscore;
}

export const getDVZscore = (ga, dv) => {
	const mean = vdpi_mean(ga);
	const sd = vdpi_sd(ga);
	const zscore = (dv - mean) / sd;
    return zscore;
}

export const getAIZscore = (ga, ai) => {
    const mean = aipi_mean(ga);
	const sd = aipi_sd(ga);
	const zscore = (ai - mean) / sd; 
    return zscore;
}
