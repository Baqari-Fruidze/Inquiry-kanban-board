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
