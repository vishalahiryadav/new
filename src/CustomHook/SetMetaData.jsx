import React, { useEffect, } from "react"
export function SetMetaData(description,content,pageTitle){
    useEffect(()=>{
   const metaDescription = document.createElement("meta");
   metaDescription.name =description;
  metaDescription.content = content;
  document.head.appendChild(metaDescription);
  document.title = pageTitle;
  return ()=>{
    console.log("Cleaning Up MetaData");
 document.head.removeChild(metaDescription);
  }
    },[description, content, pageTitle])
}