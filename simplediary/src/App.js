import './App.css';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [ data, setData ] = useState([]);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res) => res.json());
    
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      }
    });

    setData(initData);
  }

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    }
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {  
    setData(data => data.filter((item) => item.id !== targetId));
  }, [])


  const onEdit = useCallback((targetId, newContent) => {
    setData(
      data => data.map((item) => item.id === targetId ? {...item, content: newContent} : item)
    )
  }, [])

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion > 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/ data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList 
        diaryList={data}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App;