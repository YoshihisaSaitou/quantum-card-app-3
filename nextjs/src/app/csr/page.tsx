"use client"; 
import { useState, useEffect } from 'react';

interface Todo {
    userId: number;
    id: number;
    title: string;
}

export default function CSRendering() {
  const [data, setData] = useState<Todo | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data:Todo = await response.json();
    setData(data);
  };

  return (
    <div>
      <h1>Client Side Rendering Example</h1>
        <div>
          <p>Id: {data?.id}</p>
          <p>Title: {data?.title}</p>
          <p>UserId: {data?.userId}</p>
        </div>
    </div>
  );
}