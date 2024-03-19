import React, { useEffect, useState } from "react"
//import { getEventsPerMonthForAYear} from "@/common/utils/apiCall";
import scss from "./TransactionsPerDay.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/pages/components/DataChart";
import { eventData } from "@/pages/components/eventData";


export type TransactionCardType = {
  title: string;
  value: string;
  changeValue: string;
};

const TransactionsPerDay = () => {
  const theme = useTheme();

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Events per day</Typography>
          <DataChart type={"line"} data={eventData}/>
        </div>
      </Paper>
    </Grid>
  );
};

export default TransactionsPerDay;