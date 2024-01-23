
const displayDiv=document.querySelector(".display");
const card=document.querySelector(".display-items");
function getDetails(){
    let history=JSON.parse(localStorage.getItem("searchHistory"))
    return history===null?[]:history;
}
displayDiv.innerHTML="";
function historyItems(){
    let localvalues=getDetails();
    console.log(localvalues);
    if(localvalues.length===0){
        displayDiv.innerHTML="No Search History Found, Please search for some words.";
        return;
    }
        displayDiv.innerHTML="";
        for(value of localvalues){
            let card=document.createElement("div")
            let words=document.createElement("div")
            let meaning=document.createElement("div")
            let itag=document.createElement("i");
            const delbtn=document.createElement("button")
            delbtn.setAttribute("class","delete")
            card.setAttribute("class","display-items")
            words.setAttribute("class","word")
            meaning.setAttribute("class","meaning")
            words.innerText=`word : ${value.word}`
            meaning.innerText=`${value.answer}`
            card.appendChild(words)
            card.appendChild(meaning)
            delbtn.innerHTML=`<i class="fa fa-trash" aria-hidden="true"> `
            card.appendChild(delbtn)
            displayDiv.append(card)     
            delbtn.addEventListener('click',(e)=>{
            let key=e.target.parentElement.parentElement.querySelector(".word").innerText.split(": ")[1];
            displayDiv.innerHTML="";
            let updatedValues=getDetails();
            let newArr=[];
            newArr=updatedValues.filter((value)=>{
                return (value.word!==key);
            })
            updatedValues=newArr;
            localStorage.clear();
            localStorage.setItem("searchHistory",JSON.stringify([...updatedValues]))
            historyItems();
            })
        }
    }
historyItems();

