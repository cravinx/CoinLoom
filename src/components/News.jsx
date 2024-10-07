import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import Loader from './Loader';
import axios from 'axios';
import PageNotAvailable from './PageNotAvailable';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = () => {
  const [data, setData] = useState(null);
 
  const url = "https://www.searchapi.io/api/v1/search";
  const params = {
    engine: "bing_news",
    category: "Cryptocurrency",
    api_key: process.env.REACT_APP_NEWS_API_KEY,
  };
  
  useEffect(() => {
    axios.get(url, { params }, {delayed: true})
      .then(response => {
        console.log(response)
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error.message);
      });
  }, []);

  // const myTimeout = (content) => setTimeout(content, 1000);
  if (!data) {
    return <PageNotAvailable />
  }
  
  return (
  <Row>
      {data?.organic_results.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news?.thumbnail || demoImage} alt="" />
              </div>
              <p>{news.snippet.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news?.favicon || demoImage} alt="" />
                  <Text className="provider-name">{news.source}</Text>
                </div>
                <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;