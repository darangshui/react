import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "오수빈",
    content: '하이1',
    emotion: 5,
    create_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "오민지",
    content: '하이2',
    emotion: 3,
    create_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "오해린",
    content: '하이3',
    emotion: 2,
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList 
        diaryList={dummyList}
      />
    </div>
  );
}

export default App;
