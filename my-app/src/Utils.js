export function getPoints(amount){
    if(amount<50){
        return 0;
    }else if(amount<100){
        return amount-50;
    }else{
        return (amount-100)*2+50;
    }
}