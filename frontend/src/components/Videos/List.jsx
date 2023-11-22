import React from "react";
import axios from "../../axios";

const fetchData = async () => {
    try {
        const response = await axios.get("/videos");
        console.log("VIDEO LIST : ",response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Error while fetching data from server');
    }
};

const List = () => {
    fetchData();
    return (
        <div>
            <h1>List Page</h1>
        </div>
    );
};

export default List;