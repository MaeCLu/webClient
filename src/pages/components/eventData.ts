import { months } from "@/helper/Util";
import { getServerUrl } from "@/common/utils/apiCall";

interface EventPerYearDetails
{
  year : string,
  month: string,
  eventType: string,
  total: string
}

export const getEventsPerMonthForAYear = () => {
  const urlEvents = `${getServerUrl()}/api/Events/`;
  const url = `${urlEvents}eventsPerMonthCurrentYear`;
  let record : any = [];
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    var events = data as EventPerYearDetails[];
    for(let i = 0; i < 12; i++)
    {
      var total = 0;
      const month = i + 1;
        events.forEach(element => {
          if(parseInt(element.month) == month)
            total += parseInt(element.total);
        });
        record[i] = total;
    }
  })
  .catch(error => console.error(error));
  return record;
}

export const eventData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Events",
      data: getEventsPerMonthForAYear(),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};
