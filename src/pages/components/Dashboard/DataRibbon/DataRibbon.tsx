import React, { useEffect, useState } from "react"
import { Grid } from "@mui/material";
import DataCard from "@/pages/components/Dashboard/DataCard";
import scss from "./DataRibbon.module.scss";
import { buildRequest, getServerUrl,  fetchDataWrapper} from "@/common/utils/apiCall";

interface EventPerYearDetails
{
  year : string,
  month: string,
  eventType: string,
  total: string
}

interface EventPeYearSummary
{
  total : string,
  event1: string,
  event2: string,
  event3: string
}

//export const getTotalEventsPerYear = () => {

const DataRibbon = () => {
    const [grandTotal, setGrandTotal] = useState(0);
    const [highTotal, setHighTotal] = useState(0);
    const [mediumTotal, setMediumTotal] = useState(0);
    const [lowTotal, setLowTotal] = useState(0);
    const urlEvents = `${getServerUrl()}/api/Events/`;
     useEffect(() => {
       async function GetEventsPerMonthForAYear() {
          const url = `${urlEvents}eventsPerMonthCurrentYear`;
          const req = buildRequest("GET", true);
          let data;
          try {
            let grandTotal = 0;
            let highTotal = 0; 
            let medTotal = 0; 
            let lowTotal = 0; 
            data = await fetchDataWrapper(url, req);
            let events = await data.json() as EventPerYearDetails[];
            events.forEach(el => {
              let total = parseInt(el.total);
              if(el.eventType == 'High')
              {
                highTotal += total;
                setHighTotal(highTotal) ;
              }
              else if(el.eventType == 'Medium')
              {
                medTotal += total;
                setMediumTotal(medTotal) ;
              }
              else {
                lowTotal += total;
                setLowTotal(lowTotal) ;
              }
              grandTotal += total;
            })
            setGrandTotal(grandTotal) ;
          } catch (e: any) {
            console.error(e);
          } 
      }
      GetEventsPerMonthForAYear()
    }, [urlEvents])

  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title={"Total Events"}
          value={grandTotal.toString()}
          description={
            "The totals of all Events in the current year"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"High Priority Events"}
          value={highTotal.toString()}
          description={"High Priority Events"}
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Medium Priority Events"}
          value={mediumTotal.toString()}
          description={"Medium Priority Events"}
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Low Priorty Events"}
          value={lowTotal.toString()}
          description={"Low Priorty Events"}
        />
      </Grid>
    </Grid>
  );
};

export default DataRibbon;