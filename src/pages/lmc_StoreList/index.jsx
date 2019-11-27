import React from 'react';
import { withAuth } from '@/components/Auth';
import Table from './components/Table';

function BasicList(props) {
  return (
    <div className="list-page">
      <Table history={props.history} />
    </div>
  );
}

export default withAuth({
  authorities: ['admin', 'user']
})(BasicList);
