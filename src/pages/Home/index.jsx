import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import PizzaItem from "../../components/PizzaItem";
import Loader from "../../components/Loader";


import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";


export default function Home() {



    const {items, setItems, isLoading, setIsLoading} = useContext(AppContext)
    const [sortMethod, setSortMethod] = useState({name: 'популярности', sort: 'rating'})
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      setIsLoading(true)
      const fetchPizzaFromBackend = async () => {
        try {
          const resp = await fetch(
            `https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?sortBy=${sortMethod.sort}&category=${activeIndex === 0 ? '' : activeIndex}&order='asc'`
          );
          const data = await resp.json();
          setItems(data);
        } catch (error) {
          console.error("При запросе данных произошла ошибка! >:(", error);
        } finally {
          setIsLoading(false);
          window.moveTo(0, 0);
        }
      };
      fetchPizzaFromBackend();
    }, [sortMethod, activeIndex]);

    return (
        <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={activeIndex} onChangeCategory={(idx) => setActiveIndex(idx)}/>
            <Sort value={sortMethod} onChangeSort={(idx) => setSortMethod(idx)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map(item => <Loader key={uuidv4()}/>)
              : items.map(item => (<PizzaItem key={uuidv4()} {...item} />))}
          </div>
        </div>
      </div>
    )
}