import React, { useState, useEffect } from 'react';
import axios from 'axios';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [data, setData] = useState(null);
 
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/exchanges', options)
      .then(response => {
        setData(response.data)
        console.log(response)
      })
    .catch(err => console.error(err.message));
  }, []);

  if (!data) return <Loader/>

  return (
    <>
      <Row className='exchanges-title'>
        <Col flex="auto" xs={4} md={3} lg={2}>Rank</Col>
        <Col flex="auto" xs={10} sm={8} md={8} lg={6} xl={6}>Exchanges</Col>
        <Col flex="auto" xs={8} sm={8} md={10} lg={6} xl={6}>24h Trade Volume</Col>
        <Col flex="auto" className='country' xs={8} sm={8} md={16} lg={16} xl={8}>Country</Col>
        <Col flex="auto" className='normalized' xs={8} sm={8} md={8} lg={6} xl={6}>Normalized Volume</Col>
        <Col flex="auto" xs={8} sm={8} md={8} lg={8} xl={6}>Trust Score</Col>
      </Row>
      <Row gutter={[0, 16]} >
        {data?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id} className='exchanges-item'>
                    <Col flex="auto" className='exchanges-items' xs={2} md={2} lg={1}><Text><strong>{exchange.trust_score_rank}.</strong></Text></Col>
                    <Col flex="auto" className='exchanges-items exchange-name' xs={8} sm={8} md={6} lg={4} xl={4}>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong><a href={exchange.url}>{exchange.name}</a></strong></Text>
                    </Col>
                    <Col flex="auto" className='exchanges-items' xs={8} sm={8} md={6} lg={6} xl={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col flex="auto" className='exchanges-items country' xs={8} sm={8} md={6} lg={6} xl={6}>{millify(exchange.country)}</Col>
                    <Col flex="auto" className='exchanges-items normalized' xs={8} sm={8} md={6} lg={6} xl={6}>{millify(exchange.trade_volume_24h_btc_normalized)}</Col>
                    <Col flex="auto" className='exchanges-items' span={4}>{millify(exchange.trust_score)}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;