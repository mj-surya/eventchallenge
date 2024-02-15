import { useEffect, useState } from "react";
import './AddEvent.css';
import axios from "axios";
import { toast } from "react-toastify";

function UpdateEvent({id}){
    const [title,setTitle]=useState("");
    const [location,setLocation]=useState("");
    const [max,setMax]=useState("");
    const [date,setDate]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState(0);
    const [event,setEvent]=useState({});

    useEffect(() => {
        axios.get('http://localhost:5103/api/Book/GetById', {
                params: {
                    id: id
                }
            })
            .then((response) => {
                const posts = response.data;
                setEvent(posts);
            })
            .catch(function(error) {
                alert(error.response.data);
            })
    }, []);
    
    useEffect(() => {
        if (event.eventID) {
            setDescription(event.description);
            setPrice(event.price);
            setTitle(event.title);
            setDate(event.date);
            setLocation(event.location);
            setMax(event.max);
        }
    }, [event]);
    


    const updateEvent=(event)=>{
        event.preventDefault();
        const jsonData = {
            eventId: event.eventID,
            title: title,
            description: description,
            date: date,
            price: price,
            location:location,
            max:max,
            userId: localStorage.getItem("id")
        };
        axios.put("http://localhost:5103/api/Book/UpdateBook",jsonData,{
            params :{
                id : id
            },headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(async (userData)=>{
            toast.success("Event Updated");
        })
        .catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })

    }

    return(
        <div>
            <div class="center">
                <h1>Update Event</h1>
                <form onSubmit={updateEvent}>
                <div class="row">
                        <div class="col">
                            <div class="inputbox">
                                <input type="text" required value={title} onChange={(e)=>(setTitle(e.target.value))}/>
                                <span>Title</span>
                            </div>
                            <div class="inputbox">
                                <input type="text" required value={description} onChange={(e)=>(setDescription(e.target.value))}/>
                                <span>Description</span>
                            </div>
                            <div class="inputbox">
                                <input type="text" required value={location} onChange={(e)=>(setLocation(e.target.value))}/>
                                <span>Location</span>
                            </div>
                            
                        </div>
                        <div class="col">
                            <div class="inputbox">
                                <input type="text" required value={max} onChange={(e)=>(setMax(e.target.value))}/>
                                <span>Max Attendees</span>
                            </div>
                            <div class="inputbox">
                                <input type="date" required value={date} onChange={(e)=>(setDate(e.target.value))}/>
                                <span>Event Date</span>
                            </div>
                            <div class="inputbox">
                                <input type="number" required value={price} onChange={(e)=>(setPrice(e.target.value))}/>
                                <span>Price</span>
                            </div>
                        </div>
                    </div>
                    <div class="row ctr">
                        <button type="submit" class="btn btn-primary" >Update Event</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default UpdateEvent;