import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Pagination from './components/Pagination/Pagination';
import Card from './components/Card/Card';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MAX_ITEMS_PER_PAGE = 4

function App() {
  const [postData, setPostData] = React.useState({
    status: 'idle',
    data: null,
  });
  const [activePage, setActivePage] = React.useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activePage = urlParams.get('activePage');
    return activePage ? +activePage : 1
  })

  const fetchPosts = async (activePage) => {
    try {
      setPostData(preState =>({
        ...preState,
        status:'loading',
      }))
      const res = await axios.get('http://localhost:8080/api/posts', {
        params: {
          offset: (activePage - 1) * MAX_ITEMS_PER_PAGE
        }
      })
      if (res.data.success) {
        setPostData({
          status: 'success',
          data: {
            posts: res.data.data.data,
            total: res.data.data.total
          }
        })
      } else {
        setPostData(preState =>({
          ...preState,
          status:'error',
        }))
      }
    } catch (error) {
      setPostData(preState =>({
        ...preState,
        status:'error',
      }))
    }
  }

  React.useEffect(() => {
    // setPostData({ status: 'success' })
    // axios.get('http://localhost:8080/api/posts', {
    //   params: {
    //     page: activePage
    //   }
    // }).then()
    fetchPosts(activePage)
  }, [activePage])

  React.useEffect(() => {
    window.history.pushState({ page: activePage }, "", `?activePage=${activePage}`)
  }, [activePage])

  const maxPage = React.useMemo(() => {
    console.log(postData?.data?.total)
    return postData?.data?.total
      ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE)
      : 0;
  }, [postData?.data?.total]);

  const handleChangePage = (newActivePage) => {
    setActivePage(newActivePage);
  }


  const renderPosts = () => {
    const isLoading =
      postData.status === "idle" || postData.status === "loading";
    const isError = postData.status === "error";

    if (isLoading) {
      return <div>Loading....</div>;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }
  
    return (
      <Row>
        {postData.data.posts.map(post => (
          <Col xs={12} md={3} key={post._id}>
            <Card
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              note={post.createdName}
            />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div className="App">
      <Container>
        <div className='App-card'>
          {renderPosts()}
        </div>
        <div className='App-pagination'>
          <Pagination
            handleChangePage={handleChangePage}
            activePage={activePage}
            maxPage={maxPage} />
        </div>
      </Container>


    </div>
  );
}

export default App;

