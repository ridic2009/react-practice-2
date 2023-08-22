import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaItem from "./components/PizzaItem";
import items from "./assets/data.json";

import "./scss/app.scss";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((item, idx) => (
                <PizzaItem
                  key={idx}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  sizes={item.sizes}
                  types={item.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;