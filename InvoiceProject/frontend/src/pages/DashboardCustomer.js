import ViewHeader from '../components/ViewHeader';
import Typography from '@mui/material/Typography';
import BasicTable from '../components/DashboardTable1';

import './DashboardCustomer.css';

const DashboardCustomer = () => {
    return (
    <>
        <ViewHeader /> 

        <div class="circle1C" >
        </div>

        <div class="moneyC" >
            <h2 style={{ color: 'black',  fontSize: "4rem" }}>$21,398</h2>
        </div>	

        <div class="middleC" >
            <Typography className='middle' variant="h5" style={{color: '#666666', fontSize: "2.25rem"}}>
                This Month's Spending
            </Typography>
        </div>	


        <div class="ttitle1C" >
            <h2 style={{ color: 'black',  fontSize: "1.5rem" }}>This month you've spent:</h2>
        </div>

        <div class="table1C">
            <BasicTable></BasicTable>
        </div>

        <div class="spendingsC" >
            <h2 style={{ color: 'black',  fontSize: "2.5rem" }}>Monthly Spending: $900,000</h2>
        </div>
    </>
    )
}

export default DashboardCustomer