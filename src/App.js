import './App.css';
import { useTranslation } from "react-i18next";
import Nav from './components/nav';
import Datation from './components/datation';
import Biometric from './components/biometric';
import Hemodinamic from './components/hemodinamic';
import Lancet from './components/lancet';
import Bones from './components/bones';
import Unicvsmulti from './components/unicvsmulti';
import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

function App(props) {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = props.languages.find(l => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const [actualComponent, setActualComponent] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState(new Date());
  const [newPeriodDate, setNewPeriodDate] = useState("");
  const [lastEcoDate, setLastEcoDate] = useState(new Date());
  const [genre, setGenre] = useState("male");
  const [weeks, setWeeks] = useState("");
  const [days, setDays] = useState("");
  const [newWeeks, setNewWeeks] = useState("");
  const [newDays, setNewDays] = useState("");
  const [weight, setWeight] = useState("");
  const [mca, setMCA] = useState("");
  const [ua, setUA] = useState("");
  const [lcc, setLCCData] = useState("");
  const [dbp, setDBPData] = useState("");
  const [lf, setLFData] = useState("");
  let GetTime = (timeWeeks, timeDays) => {
    setWeeks(timeWeeks);
    setDays(timeDays);
  }
  const GetDesiredComponent = (component) => {
    setActualComponent(component);
  }
  const GetLastEcoDate = (date) => {
    setLastEcoDate(date);
  }
  let GetNewTime = (timeWeeks, timeDays) => {
    setNewWeeks(timeWeeks);
    setNewDays(timeDays);
    setWeeks(timeWeeks);
    setDays(timeDays);
  }
  function stopUpdateWeeksandDays() {
    setNewWeeks("");
    setNewDays("");
  }
  function stopUpdateFUR() {
    setNewPeriodDate("");
  }
  useEffect(() => {
    document.getElementById("page_title").innerHTML = t('page_title');
    document.body.dir = currentLanguage.dir || 'ltr';
    setWeeks(weeks);
    setDays(days);
  }, [days, t, weeks, currentLanguage])
  return (

    <div className="container">
      <Nav
        updateLastPeriod={setLastPeriodDate} SetLastEcoDate={GetLastEcoDate}
        GetDesiredComponentValue={GetDesiredComponent} GiveTime={GetTime}
        stopUpdateFUR={stopUpdateFUR} stopUpdateWeeksandDays={stopUpdateWeeksandDays}
        lastPeriodDateUpdated={lastPeriodDate} weeks={weeks} days={days}
        newPeriodDate={newPeriodDate} newWeeks={newWeeks} newDays={newDays} lcc={lcc}
        setLCC={setLCCData}></Nav>
      {actualComponent === "datation" && <Datation updateNewPeriod={setNewPeriodDate}
        GiveNewTime={GetNewTime} ecoDate={lastEcoDate} lastPeriodDate={lastPeriodDate}
        setDBP={setDBPData} setLF={setLFData} setLCC={setLCCData} weeks={weeks} days={days}
        lcc={lcc} dbp={dbp} lf={lf} />}
      {actualComponent === "biometric" && <Biometric weeks={weeks} days={days}
        setMCA={setMCA} setUA={setUA} ua={ua} mca={mca} weight={weight}
        genre={genre} setGenre={setGenre} setWeight={setWeight} />}
      {actualComponent === "hemodinamic" && <Hemodinamic weeks={weeks} days={days}
        setMCA={setMCA} setUA={setUA} ua={ua} mca={mca} />}
      {actualComponent === "bones" && <Bones weeks={weeks} days={days} />}
      {actualComponent === "lancet" && <Lancet weeks={weeks} days={days} weight={weight}
        genre={genre} setGenre={setGenre} setWeight={setWeight} />}
      {actualComponent === "unicvsmulti" && <Unicvsmulti weeks={weeks} days={days} weight={weight}
        genre={genre} setGenre={setGenre} setWeight={setWeight} />}
    </div>
  );
}

export default App;
