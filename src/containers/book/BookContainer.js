import React, { useEffect } from 'react';

import Header from '../../components/header/Header2Component';
import Book from '../../components/book/BookComponent';

const BookContainer = () => {
  useEffect(() => {
    console.log('BookContainer:useEffectによる初回処理');
  }, []);
  return (
    <div>
      <Header title="書類管理" />
      <Book />
    </div>
  );
};

export default BookContainer;
