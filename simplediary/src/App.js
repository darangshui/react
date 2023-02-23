import './App.css';
import React, { useState, useRef } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: "오수빈",
//     content: '하이1',
//     emotion: 5,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "오민지",
//     content: '하이2',
//     emotion: 3,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "오해린",
//     content: '하이3',
//     emotion: 2,
//     create_date: new Date().getTime(),
//   },
// ];

function App() {
  const [ data, setData ] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);  
    setData(newDiaryList);
  }


  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) => item.id === targetId ? {...item, content: newContent} : item)
    )
  }


  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList 
        diaryList={data}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App;
