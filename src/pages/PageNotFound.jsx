import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary" size="large" >Go Back Home</Button>
        </Link>
      }
    />
  );
};

export default PageNotFound;
