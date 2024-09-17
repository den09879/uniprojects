import ViewHeader from '../components/ViewHeader';
import BasicTable from '../components/Table';

import './View.css';

const View = () => {
    return (
    <>
        <ViewHeader /> 
        <div className='viewTable'>
            <BasicTable />   
        </div>		
        
    </>
    )
}

export default View