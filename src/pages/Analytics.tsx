import React, {
  useState,
  useEffect
} from 'react'
import { VictoryPie } from 'victory';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { Book, selectBookList } from '../reducers/bookSlice';

import './Analytics.css'

const Analytics = (props:any): JSX.Element => {
  const bookList = useAppSelector(selectBookList)

  const [genreChartData, setGenreChartData] = useState([])
  const [yearChartData, setYearChartData] = useState([])

  useEffect(()=>{
    setGenreChartData(getChartData(bookList, 'genre'))
    setYearChartData(getChartData(bookList, 'published_year'))
  }, [bookList])

  const getChartData = (books: Array<Book>, dataType: string): any => {
    const charts = books.reduce((prevBook: any, nextBook: any): any => {
      const exists = prevBook.some((book: any) => book?.x == nextBook[dataType]) 

      if (exists){
        const bookIndex = prevBook.findIndex((book: any) => book?.x == nextBook[dataType])

        prevBook[bookIndex]["y"] = prevBook[bookIndex].y + 1
      } else {
        prevBook.push({
          x: nextBook[dataType],
          y: 1
        })
      }

      return prevBook;
    }, [])

    return charts;
  }

  return (
    <>
      <div className="container">
        <div className="chartContainer">
          <h3 className="analyticsTitle">Total Books By Genre</h3>
            <VictoryPie
              width={1000}
              data={genreChartData}
              labels={({ datum }) => {
                return `${datum.x}: ${datum.y}`
              }}
            />
        </div>
        <div className="chartContainer">
          <h3 className="analyticsTitle">Total Books By Year Published</h3>
            <VictoryPie
              width={1000}
              data={yearChartData}
              labels={({ datum }) => {
                return `${datum.x}: ${datum.y}`
              }}
            />
        </div>
      </div>
    </>
  );
}

export default Analytics;