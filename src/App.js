import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default  function App(){
  const [friendlist,setnewfriend]=useState([...initialFriends]);
  const [doselect,setselect]=useState(false);
  const[Name,setname] =useState(""); //for changing name of friend with respected to selected friend
  
  function Addfriend(newfriend){ //it is the function to add new friends to the existing friends list.
    console.log(newfriend); 
    setnewfriend((friendlist)=>[...friendlist,newfriend]);
  }
  function isSelect(n){ //for opening split bill and changing name of person.
    if(doselect){
      setselect(false);
    }
    else{
      setselect(true);
      setname((Name)=>n);
    }
  }
  function Rembill(diffexp,biller){
    if(biller==="user"){
      diffexp=diffexp;
    }
    else{
      diffexp=-diffexp;
    }
  setnewfriend((friendlist)=>friendlist.map((friend)=>friend.name===Name?{...friend,balance:diffexp}:friend));
  }
 

  return <div className="App">
    <Friendslist friendlist={friendlist} Addfriend={Addfriend} isSelect={isSelect}/>
    { doselect?<Split person={Name} Rembill={Rembill}/>:" "}
  </div>
}

function Friendslist({friendlist,Addfriend,isSelect}){
  const [form,setform]=useState(false);
  function Toggleform(){
    if(form){
      setform(false);
    }
    else{
      setform(true);
    }
  }
  return <ul className="sidebar">
    <div className="eat">EAT AND SPLIT</div>
    {friendlist.map((friend)=><Friend frienddata={friend} isSelect={isSelect}></Friend>)}
    { form?< FriendForm Toggleform={Toggleform} Addfriend={Addfriend} />:" "}
    <button className="button" onClick={()=>Toggleform()}>{form?"close":"AddFriend"}</button>
  </ul>
}

function Friend({frienddata,isSelect}){
  return <li>
    <img src={frienddata.image}></img>
    <div>
    <h3>{frienddata.name}</h3>
    {
      frienddata.balance<=0 ? 
         frienddata.balance===0?<p>{`You and ${frienddata.name} are even`}</p>
                               :<p className="red">{`You owe ${frienddata.name} ${Math.abs(frienddata.balance)}💰`}</p>
        :<p className="green">{`${frienddata.name} owes You ${frienddata.balance}💰`}</p>
    
    }</div>
    <button className="button" onClick={()=>{isSelect(frienddata.name)}}>Select</button>
    
  </li>

}
function FriendForm({Toggleform,Addfriend}){
  const [friendname,setfriendname]=useState("");
  const[friendimage,setfriendimage]=useState("");
  function handlesubmit(e){
    e.preventDefault();
    const newfriend={id:Math.floor(Math.random()*100),
      name:friendname,image:friendimage,balance:0};
      Addfriend(newfriend); //parent method to get data from child ,so passed as prop to child.
      setfriendname(" ");
      setfriendimage("");
  };
  return(
    <form className="form-add-friend" onSubmit={(e)=>handlesubmit(e)}>
     <div><label>👩🏿‍🤝‍🧑🏿Friend name</label>
      <input type="text" onChange={(e)=>setfriendname(e.target.value)}></input></div>

      <div><label>😎Image URL</label>
      <input type="text" onChange={(e)=>setfriendimage(e.target.value)}></input></div>
      <button className="button">Add</button>

    </form>
  )

}
function Split({person,Rembill}){
  const [bill,setbill]=useState(0);// for reterving the data from form or input
  const [expense,setexpense]=useState(0);
  const [biller,setbiller]=useState("user");
  const diffexp=bill-expense; //other person share
  
  return(
    <div className="form-add-friend">
      <h2>{`SPLIT A BILL WITH ${person}`}</h2>
      <div><label>🍕Bill value</label>
      <input type="number"onChange={(e)=>setbill(e.target.value)}></input></div>

      <div><label>🤑Your expenses</label>
      <input type="number"onChange={(e)=>setexpense(e.target.value)}></input></div>

      <div><label>{`🤑 ${person}'s expense`} </label>
      <input type="number" disabled placeholder={diffexp}></input></div>

      <div><label>🤔Who is paying the bill</label>
      <select value={biller} onChange={(e)=>setbiller(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{person}</option>
      </select></div>
      <button className="button" onClick={()=>Rembill(diffexp,biller)}>Split bill</button> 
    </div>
  );
}