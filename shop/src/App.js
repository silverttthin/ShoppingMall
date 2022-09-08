import './App.css';
import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import data from './data';
import DetailCard from "./routes/detailCard.js"
import axios from 'axios';


function App() {

  let [shoes, setShoes] = useState(data);
  let [clickCnt, setClickCnt] = useState(1);
  let navigate = useNavigate(); //useNavigae 훅은 한번 쓰면 그자리에 유용한 함수가 남음.

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">임포7번가</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="navBarLink" to="/">Home</Link>
            <Link className="navBarLink" to="/detail"> Detail</Link>
            {/* <Nav.Link className="navBarLink" onClick={() => {navigate("./")}}>Home</Nav.Link>
            <Nav.Link className="navBarLink" onClick={() => {navigate("/detail")}}>detail</Nav.Link> */}

            {/* Link 컴포넌트와 useNavigate() 훅 둘 중 뭐가 나을지는 써보면서 봐야할듯? */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element=
          {
            <div>
              <div className='main-bg'></div>

              <div className='container'>
                <div className='row'>
                  {shoes.map((item, idx) => {
                    let shoesParameter = idx + 1;
                    return (
                      <Card img={`https://codingapple1.github.io/shop/shoes${shoesParameter}.jpg`}
                        title={shoes[idx].title} content={shoes[idx].content}
                        onClick={() => { navigate(`/detail/${idx}`) }}
                        key={shoes[idx].id} />
                      )
                    })
                  }


                </div>
              </div>

              <button onClick={() => {

                setClickCnt(clickCnt + 1);

                console.log(`이 버튼을 ${clickCnt}만큼 눌렀습니다!`);

                if (clickCnt === 1) {
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((data) => {
                      let cpy = [...shoes, ...data.data]
                      // cpy.push(...data.data)
                      setShoes(cpy);
                    })
                    .catch(()=>{console.log('서버에서 받아오는 과정에서 오류')})
                } 
                
                else if (clickCnt === 2) {
                  axios.get('https://codingapple1.github.io/shop/data3.json')
                    .then((data) => {
                      let cpy = [...shoes, ...data.data]
                      setShoes(cpy);
                    })
                    .catch(()=>{console.log('서버에서 받아오는 과정에서 오류')})
                } else{
                  alert('상품 없음!')
                }

                



              }}>상품 더보기</button>
            </div>
          } />

        <Route path="/detail" element={<div>추가로 파라미터를 주소에 붙이세요;</div>} />
        <Route path="/detail/:id" element=
          {
            <div>
              <DetailCard shoes={shoes} />
            </div>
          }
        />
        {/* 이건 nested route 처리 어케할지 모르겠음*/}
      </Routes>
    </div>
  );
}


function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={props.img} width="80%" alt='item' onClick={props.onClick} />
      <h4 onClick={props.onClick}>{props.title}</h4>
      <p>{props.content}</p>
    </div>
  )
}

export default App;
