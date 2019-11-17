import React, { useEffect } from 'react';
import Overivew from './components/Overivew';
import TabChart from './components/TabChart';
import EditableTable from './components/EditableTable';
import LatestActivity from './components/LatestActivity';
import ProjectAnalysis from './components/ProjectAnalysis';
import PieDoughnutChart from './components/PieDoughnutChart';
import { getToken } from '@/utils/user';

export default function Dashboard(props) {
  useEffect(() => {
    if (!getToken()) {
      props.history.push('/user/login');
    }
  });
  return (
    <div className="dashboard-page">
      <Overivew />
      <TabChart />
      <LatestActivity />
      <ProjectAnalysis />
      <EditableTable />
      <PieDoughnutChart />
    </div>
  );
}
