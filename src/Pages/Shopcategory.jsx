import React from 'react';
import './CSS/Shopcategory.css';
import  {useContext} from 'react';
import {ShopContext} from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';


  const Shopcategory = (props) => {
   const {all_product} =  useContext(ShopContext)

  return (
    <div>
      <div className="banner-container">
        <img className="banner" src={props.banner} alt="" />
      </div>

      <div className="shop-category">
        <div className="Shopcategory-indexSort">
          <p>
            <span>showing 1-12 </span> Out of 36 products
          </p>
          <div className="Shopcategory-sort">
            sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-product">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="loadmore">
        <div className="shopcategory-loadmore">
          
          <button> Explore more</button>
        </div>
      </div>
    </div>
  );
}
export default Shopcategory