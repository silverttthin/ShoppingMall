import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';


function DetailCard(props) {
    let [eventDC, setEventDC] = useState(true);
    let URLparameter = useParams().id;
    let imgParameter = parseInt(URLparameter) + 1;
    let [num, setNum] = useState('')

    useEffect(()=> {
        setTimeout(()=>{setEventDC(false)}, 2000)
    }, [])


    const item = props.shoes.find(shoe => shoe.id == URLparameter);

    return (
        <div className="container">

            {eventDC === true ? <div className="alert alert-warning">
                2초이내 구매시 70% 할인
            </div> : null}

            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${imgParameter}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}


export default DetailCard
