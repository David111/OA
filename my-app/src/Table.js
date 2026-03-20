import { useState, useEffect, useMemo } from 'react';
import  getMockData from '../src/mockApi';
import Item from './Item';

export default function Table(){
    const [records, setRecords] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                    const data = await getMockData();
                    setRecords(data);
                }catch(e){
                    console.error(e);
                }
            }
            fetchData();
    },[])


    const groupedByCustomerId = useMemo(()=>{
        return records?.reduce((accumulator, currentItem) => {
                    const id = currentItem.customer_id;
                    // If the accumulator doesn't have an entry for this ID, create an empty array
                    if (!accumulator[id]) {
                        accumulator[id] = [];
                    }
                    // Push the current object into the corresponding customer ID array
                    accumulator[id].push(currentItem);
                
                    return accumulator;
                }, {}); // Start with an empty object as the initial accumulator value
    }, [records])

    return (
        <>
            {!records? <div>loading...</div> : 
            <div>
                <h1>customer record</h1>
                <ul>
                    {Object.keys(groupedByCustomerId).map((key)=>
                        <li key={key}><Item customerRecord = {groupedByCustomerId[key]} customerId={key}/></li>
                    )}
                </ ul>
            </div>}
        </>
    );
}