import { getPoints } from "./Utils";
import { useMemo } from 'react';

export default function Item({customerRecord, customerId}){

    const groupByMonth =  useMemo(()=>{
        return customerRecord.reduce((accumulator, currentItem) => {
                        const timeStamp = currentItem.timestamp;
                        const dateObj = new Date(timeStamp);
                        const year = dateObj.getUTCFullYear();

                        // Get month (0-11, so add 1)
                        const month = dateObj.getUTCMonth() + 1; 
                        // If the accumulator doesn't have an entry for this ID, create an empty array
                        if (!accumulator[`${year}-${month}`]) {
                            accumulator[`${year}-${month}`] = {points:0};
                        }
                        const pointsPerMonth = getPoints(currentItem.amount);
                        // Push the current object into the corresponding customer ID array
                        accumulator[`${year}-${month}`].points += pointsPerMonth;
                        return accumulator;
                    }, {});
                }, [customerRecord])
    
    const totalByMonth =useMemo(()=>{
            return Object.keys(groupByMonth).reduce((acc,cur)=>{
                        return acc + groupByMonth[cur].points
                    }, 0)
    },[groupByMonth]);



    return (
        <>
           <h2>customer id: {customerId}</h2>
           <h3>total: {totalByMonth}</h3>
           <ul>
            {Object.keys(groupByMonth).map(key=>
            <li>
                <span>month: {key}</span>
                <span>(points: {groupByMonth[key].points})</span>
            </li>
            )}
           </ul>
        </>
    )
}