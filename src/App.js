import logo from './logo.svg';
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
import { subDays } from 'date-fns';

function App() {
  const {t} = useTranslation();
  const [actualComponent, setActualComponent] = useState("");
  const [lastPeriodDate, setLastPeriodDate] =useState(new Date());
  const [newPeriodDate, setNewPeriodDate] = useState("");
  const [lastEcoDate, setLastEcoDate] =useState(new Date());
  const [weeks, setWeeks] = useState("");
  const [days, setDays] = useState("");
  const [newWeeks, setNewWeeks] = useState("");
  const [newDays, setNewDays] = useState("");
  let GetTime = (timeWeeks, timeDays)=>{
    setWeeks(timeWeeks);
    setDays(timeDays);
  }
  const GetDesiredComponent=(component)=>{
    setActualComponent(component);
  }
  const GetLastEcoDate = (date) =>{
    setLastEcoDate(date);
  }
  let GetNewTime = (timeWeeks, timeDays)=>{
    setNewWeeks(timeWeeks);
    setNewDays(timeDays);
  }
  function stopUpdateWeeksandDays(){
    setNewWeeks("");
    setNewDays("");
  }
  function stopUpdateFUR(){
    setNewPeriodDate("");
  }

  return (
    
    <div className="container">
      <Nav 
      updateLastPeriod={setLastPeriodDate} SetLastEcoDate={GetLastEcoDate} 
      GetDesiredComponentValue={GetDesiredComponent} GiveTime={GetTime}
      stopUpdateFUR={stopUpdateFUR} stopUpdateWeeksandDays={stopUpdateWeeksandDays}
      lastPeriodDateUpdated={lastPeriodDate} weeks={weeks} days={days}
      newPeriodDate={newPeriodDate} newWeeks={newWeeks} newDays={newDays}></Nav>
        {actualComponent == "datation" && <Datation updateNewPeriod={setNewPeriodDate} GiveNewTime={GetNewTime} ecoDate={lastEcoDate} lastPeriodDate={lastPeriodDate} weeks={weeks} days={days}/> }
        {actualComponent == "biometric" && <Biometric weeks={weeks} days={days}/>}
        {actualComponent == "hemodinamic" && <Hemodinamic weeks={weeks} days={days}/>}
        {actualComponent == "bones" && <Bones weeks={weeks} days={days}/>}
        {actualComponent == "lancet" && <Lancet weeks={weeks} days={days}/>}
        {actualComponent == "unicvsmulti" && <Unicvsmulti weeks={weeks} days={days}/>}
    </div>
  );
}

export default App;
