import React,{useEffect} from 'react'
import "../Style/Home.css"
import axios from "axios"
import { useState } from 'react'
import Card from '../Components/Card/Card'
import Footer from '../Components/Footer/Footer.jsx'
import Navbar from '../Components/Navbar/Navbar'
const Home = () => {
    const [Loading,SetLoading] =useState(false)
    const [Message,SetMessage] =useState("Loading...")
    const API_Key="ShQoEK8jjf4yiVBUpwV8_drGUTQTP-EcI2EOZWRp3TE"
    const API_Secret="nEy37OQ3lQwuPbwMiMUCKf3On-q-_UYdpKAT9Ku6WPQ"
    const [Inputval,SetInputval]=useState("")
    const [Result,SetResult]=useState([])
    const ApiCall=async()=>{
      try {
        SetLoading(true)
        let query="";
        if(Inputval=="")
        {
            query="Car"
        }
        else{
            query=Inputval
        }
        const {data} = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${API_Key}`)
        const result= data.results;
        if (result.length === 0) {
          SetMessage("No results found");
      }
      else{
        SetResult(result)
        SetInputval("");
        SetLoading(false)
      }
      } catch (error) {
        SetLoading(true)
        SetMessage("Error!!!!")
      }
    }
    useEffect(() => {
     ApiCall()
    }, [])
    
  return (
    <>
    <Navbar/>
    <div className="search-div">
    <input placeholder='Search your Image' type="text"  value={Inputval} onChange={(e)=>{
        SetInputval(e.target.value)
    }}  />
    <button onClick={ApiCall} >Search</button>
    </div>
    {
        Loading==true?<div className='Loading-div' ><h1>{Message}</h1></div>:
    <div className="result-imges">
        {
            Result.map((i,index)=>{
                return(
                    <Card key={index} data={i} />
                )
            })
        }
    </div>
    }
    <Footer/>
    </>
  )
}

export default Home