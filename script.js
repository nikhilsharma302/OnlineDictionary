const input=document.querySelector(".search-input");
const btn=document.querySelector(".btn");
const histbtn=document.querySelector(".hist");
const answerdisp=document.querySelector(".answer");
const display=document.querySelector(".display-answer");
const displayDiv=document.querySelector(".display");
const word=document.querySelector(".word");
const meaning=document.querySelector(".meaning");
const delbtn=document.querySelector(".delete");
const card=document.querySelector(".display-items");
function getDetails(){
    let history=JSON.parse(localStorage.getItem("searchHistory"))
    return history===null?[]:history;
}

btn.addEventListener('click',fetchApi);
async function fetchApi(){
    try{
    answerdisp.innerText="";
    let key=input.value;
    let response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${key}`);
    let finalResponse=await response.json();
    let answer=finalResponse[0].meanings[0].definitions[0].definition;
    let answerObj={
       "word":`${key}`,
       "answer":answer
    }
    let prevHistory=getDetails();
    let valexist=prevHistory.some(obj=>obj.word===answerObj.word)
    
    if(!valexist){
        localStorage.setItem("searchHistory",JSON.stringify([...prevHistory,answerObj]))
    }
    let symp=getDetails();
    answerdisp.append(`${key} : ${answer}`);
    }
    catch(err){
        alert("Word not found");
        return;
    }
}


