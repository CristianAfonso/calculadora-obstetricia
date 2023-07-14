export const displayBar = (percentile, elementId) => {
    if (percentile > 0 && percentile < 100) {
        if (percentile > 10 && percentile < 90) {
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #00960a, #00bd0d)';
        } else if (percentile <= 5 || percentile >= 95) {
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#e33922, #e30f00)';
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
        document.getElementById(elementId).style.width = parseFloat((mom / 1.6) * 100) + "%";
    } else if (mom > 1.3) {
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#d9cf21, #d98600)';
        document.getElementById(elementId).style.width = parseFloat((mom / 1.6) * 100) + "%";
    } else {
        document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #00960a, #00bd0d)';
        document.getElementById(elementId).style.width = parseFloat((mom / 1.6) * 100) + "%";
    }

}
export const matchingGA = (data, from) => {
    let iterator;
    let media_anterior;
    let ga;
    switch (from) {
        case 'LCC':
            iterator = 388;
            media_anterior = crl_mean(1);
            break;
        case 'DBP':
            iterator = 800;
            media_anterior = bpd_mean(1);
            break;
        case 'CC':
            iterator = 800;
            media_anterior = cc_mean(1);
            break;
        case 'CA':
            iterator = 450;
            media_anterior = ca_mean(1);
            break;
        case 'LF':
            iterator = 450;
            media_anterior = lf_mean(1);
            break;
        default:
            return;
    }
    for (let i = 7; i < iterator; i++) {
        let media;
        switch (from) {
            case 'LCC':
                media = crl_mean(i);
                break;
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
                case 'LCC':
                    media_anterior = crl_mean(i / 7.0);
                    break;
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
export const crl_mean = (ga) => {
	let mean = -50.6562 + (0.815118 * ga) + (0.00535302 * Math.pow(ga,2));
	return mean;
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
    let sd = 1.98735 + 0.0136772 * Math.pow(ga, 3) - 0.00726264 * Math.pow(ga, 3) * Math.log(ga) + 0.000976253 * Math.pow(ga, 3) * Math.pow((Math.log(ga)), 2);
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
const calculateHadlock = (ga) => {
    return Math.exp(0.578 + (0.332 * ga) - (0.00354 * Math.pow(ga, 2)));
}
const expectedHadlock = () => {
    return calculateHadlock(40.5);
}
export const EFW_Hadlock2Weight = (ac, hc, fl) => {
    const efw = hadlock2_mean(ac, hc, fl);
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

export const hadlock3 = (ac, fl, bpd) => {
    const efw = Math.pow(10, 1.335 - (0.0034 * ac / 10 * fl / 10) + (0.0316 * bpd / 10) + (0.0457 * ac / 10) + (0.1623 * fl / 10));
    return efw;
}

export const hospitalGetWeight = (ga, genre, hospital) => {
    if (!genre) {
        genre = 'male';
    }
    let genreValue = 0;
    let expectedWeight = 0;
    switch (hospital) {
        case "gregorio":
            const eg = 0.00920217;        //Estandarizar
            const eg2 = 0.00645354;        //Estandarizar
            const eg3 = -0.00010245;        //Estandarizar
            if (genre === "male") {
                genreValue = 0.03942451;        //Estandarizar
            }
            const constant = 3.9486685;        //Estandarizar
            expectedWeight = constant + (eg * ga) + (eg2 * Math.pow(ga, 2)) + (eg3 * Math.pow(ga, 3)) + (genreValue);
            break;
        case "gregorio2":
            if (genre === "male") {
                genreValue = 3440.23;        //Estandarizar
            } else {
                genreValue = 3308.16;        //Estandarizar
            }
            expectedWeight = (calculateHadlock(ga) * (genreValue / expectedHadlock()));
            break;
        case "fuenlabrada":
            if (genre === "male") {
                genreValue = 3394.11;        //Estandarizar
            } else {
                genreValue = 3271.64;        //Estandarizar
            }
            expectedWeight = (calculateHadlock(ga) * (genreValue / expectedHadlock()));
            break;
        case "talavera":
            if (genre === "male") {
                genreValue = 3480.33;        //Estandarizar
            } else {
                genreValue = 3326.044;        //Estandarizar
            }
            expectedWeight = (calculateHadlock(ga) * (genreValue / expectedHadlock()));
            break;
        case "alcazar":
            if (genre === "male") {
                genreValue = 3411.61;        //Estandarizar
            } else {
                genreValue = 2365.1;      //Estandarizar
            }
            expectedWeight = (calculateHadlock(ga) * (genreValue / expectedHadlock()));
            break;
        case "clinic":
            if (genre === 'male') {
                genreValue = Math.round(3431.640);        //Estandarizar
            } else {
                genreValue = Math.round(3431.640 - 103.056);        //Estandarizar
            }
            expectedWeight = genreValue * (2.991 - (ga * 0.3185) + (Math.pow(ga, 2) * 0.01094) - (Math.pow(ga, 3) * 0.0001055));
            break;
        default:
            return 0;
    }
    return expectedWeight;
}
export const hospitalAuxSD = (expectedWeight, genre, hospital) => {
    let genreValue = 0;
    let genreMean = 0;
    let sd = 0;
    switch (hospital) {
        case "gregorio2":
            if (genre === "male") {
                genreValue = 394.7;        //Estandarizar
                genreMean = 3440.23;        //Estandarizar
            } else {
                genreValue = 381.5;        //Estandarizar
                genreMean = 3308.16;        //Estandarizar
            }
            break;
        case "fuenlabrada":
            if (genre === "male") {
                genreValue = 390.38;        //Estandarizar
                genreMean = 3394.11;        //Estandarizar
            } else {
                genreValue = 378.25;        //Estandarizar
                genreMean = 3271.64;        //Estandarizar
            }
            break;
        case "talavera":
            if (genre === "male") {
                genreValue = 395.4;        //Estandarizar
                genreMean = 3480.33;        //Estandarizar
            } else {
                genreValue = 415.98;        //Estandarizar
                genreMean = 3326.044;        //Estandarizar
            }
            break;
        default:
            return null;


    }
    sd = expectedWeight * (genreValue / genreMean);
    return sd;
}
export const hospitalGetZscore = (weight, referenceWeight, hospital, genre) => {
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
            const zscore = (weight - referenceWeight) / hospitalAuxSD(referenceWeight, genre, hospital);
            return zscore;
    }
}
// twins 

export const hospitalGetTwinsWeight = (ga, genre, hospital) => {
    if (!genre) {
        genre = 'male';
    }
    let genreValue = 0;
    let expectedWeight = 0;
    switch (hospital) {
        case "gregorio":
            const eg = -0.4602458;
            const eg2 = 0.01879654;
            const eg3 = -0.00020637;
            if (genre === "male") {
                genreValue = 0.04579971;        //Estandarizar
            }
            const constant = 9.6297115;        //Estandarizar
            expectedWeight = constant + (eg * ga) + (eg2 * Math.pow(ga, 2)) + (eg3 * Math.pow(ga, 3)) + (genreValue);
            break;
        case "clinic":
            ga *= 7;
            if (genre === 'male') {
                genreValue = 2953;        //Estandarizar
            } else {
                genreValue = 2953 - 120;        //Estandarizar
            }
            expectedWeight = genreValue * (-0.1266838 + (Math.pow(ga, 2) * 1.06618E-5) + (Math.pow(ga, 3) * 1.3196E-8));
            break;
        default:
            return 0;
    }
    return expectedWeight;
}

//triplets
export const hospitalGetTriplets = (ga, genre, hospital) => {
    const eg = 2.0200247;
    const eg2 = -0.05827472;
    const eg3 = 0.00058056;
    const constant = -16.676953;
    let genreValue = 0;
    if (genre === "male") {
        genreValue = 0.11269155;
    }
    const expectedWeight = constant + (eg * ga) + (eg2 * Math.pow(ga, 2)) + (eg3 * Math.pow(ga, 3)) + (genreValue);
    return expectedWeight;
}

/*
    Hemodinamic
    */
export const ua_mean = (ga) => {
    const mean = (3.55219 - (0.13558 * ga)) + (0.00174 * Math.pow(ga, 2));
    return mean;
}

export const ua_sd = (ga) => {
    const sd = 0.299; //????????????
    return sd;
}

export const mca_mean = (ga) => {
    const mean = -2.7317 + (0.3335 * ga) - (0.0058 * Math.pow(ga, 2));
    return mean;
}

export const mca_sd = (ga) => {
    const sd = -0.88005 + (0.08182 * ga) - (0.00133 * Math.pow(ga, 2));
    return sd;
}
export const cpr_mean = (ga) => {
    const mean = -4.0636 + (0.383 * ga) - (0.0059 * Math.pow(ga, 2));
    return mean;
}

export const cpr_sd = (ga) => {
    const sd = -0.9664 + (0.09027 * ga) - (0.0014 * Math.pow(ga, 2));
    return sd;
}
export const avpi_mean = (ga) => {
    const mean = 1.39 - (0.012 * ga) + (0.0000198 * Math.pow(ga, 2));
    return mean;
}
export const avpi_sd = (ga) => {
    const sd = 0.272 - (0.000259 * ga);
    return sd;
}

export const vdpi_mean = (ga) => {
    const mean = 0.903 + (-0.0116 * ga);
    return mean;
}

export const vdpi_sd = (ga) => {
    const sd = 0.1483;
    return sd;
}

export const aipi_mean = (ga) => {
    const mean = 2.2562 + (0.0154 * ga);
    return mean;
}

export const aipi_sd = (ga) => {
    const sd = 0.014199 + (0.011635 * ga);
    return sd;
}

export const getUAZscore = (ga, ua) => {
    const uaMean = ua_mean(ga);
    const uaSD = ua_sd(ga);
    const uaZscore = ((ua - uaMean) / uaSD);
    return uaZscore;
}
export const getMCAZscore = (ga, mca) => {
    const mcaMean = mca_mean(ga);
    const mcaSD = mca_sd(ga);
    const mcaZscore = ((mca - mcaMean) / mcaSD);
    return mcaZscore;
}
export const getCPRZscore = (mca, ua, ga) => {
    const cpr = mca / ua;
    const cprMean = cpr_mean(ga);
    const cprSD = cpr_sd(ga);
    const cprZscore = ((cpr - cprMean) / cprSD);
    return cprZscore;

}
export const getUAZscore_GregorioFormula = (ga, ua) => {
    const mean = 1.74 - (ga * 0.0238731473944725);
    const sd = 0.25825;
    const zscore = (ua - mean) / sd;
    return zscore;
}
export const getMCAZscore_GregorioFormula = (ga, mca) => {
    const mean = -0.885496 + (ga * 0.209341) - (0.003686 * Math.pow(ga, 2));
    const sd = 0.7217442 - (0.0080618 * ga);
    const zscore = (mca - mean) / sd;
    return zscore;
}

export const mcaExpectedSpeed = (ga) => {
    const expectedSpeed = Math.exp(2.31 + (0.046 * ga));
    return expectedSpeed;
}
export const mcaMOM = (mcaSV, acmEV) => {
    return (mcaSV / acmEV);
}
export const getUAMeanZscore = (ga, mean) => {
    const uaExpected = avpi_mean(ga * 7);
    const uaSd = avpi_sd(ga * 7);
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

// BONES 
const hum_mean = (ga) => {
    const mean = (11.459 * ga - 2.2362 * ga * Math.log(ga) - 63.704);
    return mean;
}

const hum_sd = (ga) => {
    const sd = (0.040292 * ga + 1.3464);
    return sd;
}

const cub_mean = (ga) => {
    const mean = (11120 / (Math.pow(ga, 2))) - (2146.3 / ga) + 108.94;
    return mean;
}

const cub_sd = (ga) => {
    const sd = 0.049218 * ga + 1.2021;
    return sd;
}

const rad_mean = (ga) => {
    const mean = (7983 / (Math.pow(ga, 2))) - (1698.6 / ga) + 91.634;
    return mean;
}

const rad_sd = (ga) => {
    const sd = 0.046386 * ga + 1.1933;
    return sd;
}

const fem_mean = (ga) => {
    const mean = 3.4162 * ga - 0.0004791 * Math.pow(ga, 3) - 32.425;
    return mean;
}

const fem_sd = (ga) => {
    const sd = 0.058328 * ga + 1.0605;
    return sd;
}

const fib_mean = (ga) => {
    const mean = (13697 / (Math.pow(ga, 2))) - (2458.0 / ga) + 116.51;
    return mean;
}

const fib_sd = (ga) => {
    const sd = 0.053841 * ga + 1.0451;
    return sd;
}
const tib_mean = (ga) => {
    const mean = (14451 / (Math.pow(ga, 2))) - (2553.2 / ga) + 120.05;
    return mean;
}

const tib_sd = (ga) => {
    const sd = 0.049978 * ga + 1.1102;
    return sd;
}


const foot_mean = (ga) => {
    const mean = 0.36909 * Math.pow(ga, 2) - 0.084175 * Math.pow(ga, 2) * Math.log(ga) - 14.158;
    return mean;
}

const foot_sd = (ga) => {
    const sd = 0.10865 * ga + 0.27971;
    return sd;
}
export const getHumerusZscore = (ga, humerusValue) => {
    const mean = hum_mean(ga);
    const sd = hum_sd(ga);
    const zscore = (humerusValue - mean) / sd;
    return zscore;
}
export const getUlnaZscore = (ga, ulnaValue) => {
    const mean = cub_mean(ga);
    const sd = cub_sd(ga);
    const zscore = (ulnaValue - mean) / sd;
    return zscore;
}
export const getRadiusZscore = (ga, radiusValue) => {
    const mean = rad_mean(ga);
    const sd = rad_sd(ga);
    const zscore = (radiusValue - mean) / sd;
    return zscore;
}

export const getFemurZscore = (ga, femurValue) => {
    const mean = fem_mean(ga);
    const sd = fem_sd(ga);
    const zscore = (femurValue - mean) / sd;
    return zscore;
}
export const getTibiaZscore = (ga, tibiaValue) => {
    const mean = tib_mean(ga);
    const sd = tib_sd(ga);
    const zscore = (tibiaValue - mean) / sd;
    return zscore;
}
export const getFibulaZscore = (ga, fibulaValue) => {
    const mean = fib_mean(ga);
    const sd = fib_sd(ga);
    const zscore = (fibulaValue - mean) / sd;
    return zscore;
}
export const getFootZscore = (ga, footValue) => {
    const mean = foot_mean(ga);
    const sd = foot_sd(ga);
    const zscore = (footValue - mean) / sd;
    return zscore;
}