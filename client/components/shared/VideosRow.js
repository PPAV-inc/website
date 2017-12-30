import React from 'react';
import { Col, Card, Tag } from 'antd';
import format from 'date-fns/format';

const { Meta } = Card;

const VideosRow = ({ videos, colSpan }) =>
  videos.map(
    ({
      code,
      img_url: imgURL,
      title,
      publishedAt,
      models,
      tags,
      total_view_count: totalViewCount,
    }) => (
      <Col span={colSpan} key={code} style={{ padding: '5px' }}>
        <Card hoverable cover={<img alt={code} src={imgURL} />}>
          <Meta
            title={
              <span style={{ whiteSpace: 'normal' }}>
                <b>{`[${code}]`}</b>
                <br />
                {`${title}`}
              </span>
            }
            description={
              <div>
                <span>{`🎬 ${models.join(', ')}`}</span>
                <br />
                <span>
                  {`🗓 ${format(publishedAt, 'YYYY/MM/DD')} 👁 ${totalViewCount}`}
                </span>
                <br />
                <br />
                {tags.map(tag => (
                  <Tag color="magenta" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            }
          />
        </Card>
      </Col>
    )
  );

export default VideosRow;
