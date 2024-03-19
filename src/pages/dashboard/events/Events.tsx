import React, { useEffect, useState } from "react"
import { buildRequest, getServerUrl,  fetchDataWrapper} from "@/common/utils/apiCall";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment'

const columns: GridColDef[] = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 90 },
  {
    field: 'eventType',
    headerName: 'Event Type',
    width: 150,
    editable: true,
  },
  {
    field: 'message',
    headerName: 'Message',
    width: 300,
    editable: true,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 400,
    editable: true,
  },
    {
    field: 'arrivalTime',
    headerName: 'Date',
    width: 200,
    editable: true,
    valueFormatter: params => 
    moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
];
interface EventDetails
{
  eventType: string,
  message: string,
  details: string,
  arrivalTime: string
}

const Events = () => {
    const[error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<EventDetails[]>([]);
    const urlEvents = `${getServerUrl()}/api/Events/`;
    
    useEffect(() => {
        async function getEventsDataAsync() {
          setIsLoading(true);

          const url = `${urlEvents}events`;
          const req = buildRequest("GET", true);

          let data;
          try {
            data = await fetchDataWrapper(url, req);
            //data = await fetch(url, { next: { revalidate: 2 } });
            let events = await data.json() as EventDetails[];
            setData(events);
          } catch (e: any) {
            setError(e);
            console.error(e);
          } finally {
            setIsLoading(false);  
          }
      }
      getEventsDataAsync()
    }, [urlEvents])

    if(isLoading)
      return <Typography>Loading...</Typography>;

    if(error)
      return <Typography>Something went wrong! Please try again.</Typography>;
    
    return (
        <Box sx={{ height: 800, width: '100%' }}>
          <Typography>All Events</Typography>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 13,
                },
              },
            }}
            pageSizeOptions={[13]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );
}

export default Events;
