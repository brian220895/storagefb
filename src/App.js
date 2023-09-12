import { useState,useEffect } from 'react';

import './App.css';
import {db} from './firebase-config'
import {collection, getDocs,addDoc,updateDoc,deleteDoc,doc,onSnapshot,query} from 'firebase/firestore'
// import {
//   collection,
//   addDoc,
//   where,
//   serverTimestamp,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore"
const usersRef=collection(db,"users")
// import {MessageFilled} from "@ant-design/icons"
// import { FloatButton} from 'antd'


function App() {
  const [user1s,setUser1s]=useState([])


  const [newName,setNewName]=useState("")
  const [newAge,setNewAge]=useState(0)
   const [users,setUsers]=useState([])

   const usersCollectionRef=collection(db,"users")

  const createUser=async()=>{
     await addDoc(usersCollectionRef,{name:newName, age:Number(newAge)})
  }

  const updateUser=async(id,age)=>{
    const userDoc=doc(db,"users",id)
  const newFields={age:age+1}
  await updateDoc(userDoc,newFields)
  }

  const deleteUser=async(id)=>{
    const userDoc=doc(db,"users",id)
    await deleteDoc(userDoc)

  }

  useEffect(()=>{
    const getUsers = async ()=>{
        const data = await getDocs(usersCollectionRef)
        // console.log(data)
        setUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
    }
    getUsers()

  },[])



  useEffect(() => {
    const queryUsers = query(
      usersRef
    );
    const unsuscribe = onSnapshot(queryUsers, (snapshot) => {      let user1s = [];
      snapshot.forEach((doc) => {
        user1s.push({ ...doc.data(), id: doc.id });
      });
        setUser1s(user1s);
    });
    return () => unsuscribe();
  }, []);




  return (
<>
<input type='text' placeholder='Name..' onChange={(event)=>setNewName(event.target.value)}/>
<input type='number' placeholder='Age..' onChange={(event)=>setNewAge(event.target.value)}/>
<button onClick={createUser}>Create user</button>
{users.map((user)=>{
  return (
    <div>
    <h1>Name:{user.name}</h1>
    <h1>Age:{user.age}</h1>
    <button onClick={()=>{updateUser(user.id,user.age)}}>Increase Age</button>
    <button onClick={()=>{deleteUser(user.id)}}>Delete user</button>
    </div>
  )
 
})}


{user1s.map((user1)=>{
  return (
    <div>
    <h1>Name:{user1.name}</h1>
    <h1>Age:{user1.age}</h1>
    {/* <button onClick={()=>{updateUser(user.id,user.age)}}>Increase Age</button> */}
    <button onClick={()=>{deleteUser(user1.id)}}>Delete user1</button>
    </div>
  )
 
})}

</>


  )
}

export default App;
