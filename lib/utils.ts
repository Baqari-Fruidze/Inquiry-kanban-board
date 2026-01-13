import { Inquiry } from "@/types/inquiryTypes";


 // delay in backend
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// sum of values in inquirys columns

 export const sum =(Inquiries:Inquiry[])=> Inquiries.reduce((acc,el)=> el.potentialValue + acc,0 )


    // count diference between days 
 export const  countDayDifference = (changeDate:string)=>{
  const divider = 86400000
const oldDate = Number(Date.parse(changeDate))
const currentDate = Number(Date.now())
const dif = Math.floor((currentDate - oldDate) / divider) 
return dif 
 }

 // format date to show
// const Olddate = Date.parse("2026-01-10T09:00:00Z");
// console.log(Olddate);

// const currentDATE = Date.now();
// console.log(currentDATE);

// const dif = parseInt((currentDATE - Olddate) / 86400000);
// console.log(dif);  
   export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // get phase label directly to show without joins and splitt 

     export const getPhaseLabel = (phase: string) => {
    const labels: Record<string, string> = {
      new: "New",
      sent_to_hotels: "Sent to Hotels",
      offers_received: "Offers Received",
      completed: "Completed",
    };
    return labels[phase] || phase;
  };
