// Components
import Categories from "../../components/Categories";
import Sort, { sortList } from "../../components/Sort";
import PizzaItem from "../../components/PizzaItem";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

// libs and hooks
import { v4 as uuidv4 } from "uuid";
import { ReactElement, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import QueryString from "qs";

import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";

// Функция запроса пицц с мокапи в редаксе
import {
  SearchPizzaParams,
  Status,
  fetchPizza,
  pizzaSelector,
} from "../../redux/slices/pizzaSlice";
import { searchSelector, setSearchValue } from "../../redux/slices/searchSlice";
import { useAppDispatch } from "../../redux/store";

export default function Home(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // redux hooks
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const { searchValue } = useSelector(searchSelector);
  const { items, status } = useSelector(pizzaSelector);

  const { setIsLoading } = useContext(AppContext);

  // Получение пицц с мокапи
  const getPizza = async () => {
    setIsLoading(true);
    const search = searchValue ? `search=${searchValue}&` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    try {
      dispatch(
        fetchPizza({
          search,
          categoryId,
          currentPage: String(currentPage),
          sort,
        })
      );
    } catch (error) {
      console.error("При запросе данных произошла ошибка!", error);
    } finally {
      setIsLoading(false);
      window.moveTo(0, 0);
    }
  };

  // Запрашиваем пиццы при первом рендере компонента Home
  useEffect(() => {
    getPizza();
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const qs = QueryString.stringify({
        sortMethod: sort.sortMethod,
        categoryId,
        currentPage,
      });

      navigate(`?${qs}`);
    }
    isMounted.current = true;
  }, [sort.sortMethod, categoryId, currentPage]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const parameters = QueryString.parse(
        window.location.search.substring(1)
      )
      console.log(parameters)
      const sort = sortList.find(obj => obj.sortMethod === parameters.sortMethod);

      if (sort) {
        parameters.sort = sort;
      }

      dispatch(
        setFilters({
          categoryId: parameters.categoryId,
          currentPage: +parameters.currentPage,
          sort: parameters.sort,
        })
      );

      dispatch(
        setSearchValue({
          searchValue: parameters.search,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizza();
    }
    isSearch.current = false;
  }, [sort.sortMethod, categoryId, searchValue, currentPage]);

  const onChangeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(idx) => onChangeCategoryId(idx)}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === Status.ERROR ? (
          <div>Ошибка</div>
        ) : (
          <div className="content__items">
            {status === Status.LOADING
              ? [...new Array(10)].map((item) => <Loader key={uuidv4()} />)
              : items.map((item) => <PizzaItem key={uuidv4()} {...item} />)}
          </div>
        )}
        <Pagination
          onChangePage={(numberOfPage) => onChangePage(numberOfPage)}
        />
      </div>
    </div>
  );
}
