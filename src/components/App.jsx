import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import TasksStatistics from './TasksStatistics';
import TasksList from './TasksList';
import TasksForm from './TasksForm';
import logo from '../logo.svg';

const App = () => {
  const { allTodos } = useSelector((state) => state.todos);

  return (
    <Card className="card-height">
      <Card.Header>
        <Card.Img className="logo" variant="top" src={logo} />
        <span className="header-font-size">Tasks manager</span>
      </Card.Header>
      <div className="row">
        <Col md={6}>
          <Card.Body>
            <Card.Title>
              <h5 className="ps-3">Add your task</h5>
            </Card.Title>
            <TasksForm />
            <TasksList tasks={allTodos} />
          </Card.Body>
        </Col>
        <Col md={6}>
          <TasksStatistics />
        </Col>
      </div>
      <Card.Footer className="footer-to-bottom">2023, made by German Nasyrov</Card.Footer>
    </Card>
  );
};

export default App;
