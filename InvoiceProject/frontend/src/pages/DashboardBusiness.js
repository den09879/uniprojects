import ViewHeader from '../components/ViewHeader';
import Typography from '@mui/material/Typography';
import BasicTable from '../components/DashboardTable1';

import './DashboardBusiness.css';

const DashboardBusiness = () => {
    return (
    <>
        <ViewHeader /> 

        <div class="circle1" >
        </div>

        <div class="circle2" >
        </div>

        <div class="circle3" >
        </div>	

        <div class="money" >
            <h2 style={{ color: 'black',  fontSize: "4rem" }}>$59,398</h2>
        </div>	

        <div class="middle" >
            <Typography className='middle' variant="h5" style={{color: '#666666', fontSize: "2.25rem"}}>
                This Month's Income
            </Typography>
        </div>	

        <div class="seller" >
            <h2 style={{ color: 'black',  fontSize: "2.5rem" }}>Pens</h2>
        </div>

        <div class="left" >	
            <Typography className='left' variant="h5" style={{color: '#666666', fontSize: "1.5rem"}}>
                Top Seller This Month
            </Typography>
        </div>	

        <div class="purchase" >
            <h2 style={{ color: 'black',  fontSize: "2.5rem" }}>Paper</h2>
        </div>

        <div class="right" >		
        <Typography className='right' variant="h5" style={{color: '#666666', fontSize: "1.5rem", textAlign: "center" }}>
            Biggest Purchase <br /> This Month
        </Typography>
        </div>	

        <div class="ttitle1" >
            <h2 style={{ color: 'black',  fontSize: "1.5rem" }}>This month you've sold:</h2>
        </div>

        <div class="ttitle2" >
            <h2 style={{ color: 'black',  fontSize: "1.5rem" }}>This month you've spent:</h2>
        </div>

        <div class="table1">
            <BasicTable></BasicTable>
        </div>

        <div class="table2">
            <BasicTable></BasicTable>
        </div> 

        <div class="earnings" >
            <h2 style={{ color: 'black',  fontSize: "2.5rem" }}>Monthly Earnings: $900,000</h2>
        </div>
       
        <div class="spendings" >
            <h2 style={{ color: 'black',  fontSize: "2.5rem" }}>Monthly Spending: $900,000</h2>
        </div>
    </>
    )
}

export default DashboardBusiness