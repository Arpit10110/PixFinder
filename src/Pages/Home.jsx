import React, { useEffect, useState } from 'react';
import "../Style/Home.css";
import axios from "axios";
import Card from '../Components/Card/Card';
import Footer from '../Components/Footer/Footer.jsx';
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
    const [page, SetPage] = useState(1);
    const [loading, SetLoading] = useState(false);
    const [message, SetMessage] = useState("Loading...");
    const API_Key = "ShQoEK8jjf4yiVBUpwV8_drGUTQTP-EcI2EOZWRp3TE";
    const [inputVal, SetInputVal] = useState("");
    const [result, SetResult] = useState([]);

    const ApiCall = async () => {
        try {
            SetLoading(true);
            let query = inputVal || "Car";
            const { data } = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${API_Key}`);
            const result = data.results;
            if (result.length === 0) {
                SetMessage("No results found");
                SetResult([]);
            } else {
                SetResult(result);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            SetLoading(false);
        } catch (error) {
            SetLoading(true);
            SetMessage("Error!!!!");
        }
    };

    useEffect(() => {
        ApiCall();
    }, [page]);

    return (
        <>
            <Navbar />
            <div className="search-div">
                <input
                    placeholder='Search your Image'
                    type="text"
                    value={inputVal}
                    onChange={(e) => SetInputVal(e.target.value)}
                />
                <button onClick={ApiCall}>Search</button>
            </div>
            {loading ? (
                <div className='Loading-div'><h1>{message}</h1></div>
            ) : (
                <div className="result-imges">
                    {result.map((i, index) => (
                        <Card key={index} data={i} />
                    ))}
                </div>
            )}
            <div className="pages">
                <button onClick={() => SetPage(1)}>1</button>
                <button onClick={() => SetPage(2)}>2</button>
                <button onClick={() => SetPage(3)}>3</button>
            </div>
            <Footer />
        </>
    );
};

export default Home;
