import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Categories from "./Categories";
import Product from "./Product";
import Cart from "./Cart";

function CategoryFetching_dummy() {
  const navigate = useNavigate();

  //   const navigation = [
  //     { name: "Electronic", href: "#" },
  //     { name: "Men Fashion", href: "#" },
  //     { name: "Women Fashion", href: "#" },
  //     { name: "Jewelry", href: "#" },
  //   ];

  var navigation = [];

  const [header_select, setheader_select] = useState("electronics");
  const [searchInput, setSearchInput] = useState("");
  //   const [searchInput, setSearchInput] = useState("");
  const [cart_page, setcartPage] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [category, setcategory] = useState([]);
  const [all_categories, setall_categories] = useState([]);
  const [product, setproduct] = useState([]);
  const [cart, setcart] = useState([]);
  const [back_btn, setback_btn] = useState(false);

  const handle_all_category = async () => {
    try {
      await axios
        .get("https://fakestoreapi.com/products/categories")
        .then((res) => {
          //   setcategory(res.data);
          navigation = res.data;
          setall_categories(res.data);
          console.log("all categories in navigation", navigation);
          fetchCategory(res.data);
          //   setFilteredCategory(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   const handle_category = () => {
  //     try {
  //         navigation.forEach(element => {
  //             axios
  //             .get("https://fakestoreapi.com/products/category/${element}")
  //             .then((res) => {
  //               console.log(element);
  //               setcategory(res.data);
  //               console.log("${element}",res.data);
  //               setFilteredCategory(res.data);
  //             });
  //         });

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const fetchCategory = async (data) => {
    try {
      console.log("all_categories in fetchCategory", data);
      const promises = data.map(async (category) => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        return response.data;
      });
      const productList = await Promise.all(promises);

      handle_category(productList);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_category = async (data) => {
    try {
      console.log("all_categories in handle_category", data);
      const promises = data.map(async (category) => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        return response.data;
      });

      const productsArray = await Promise.all(promises);
      console.log("productsArray", productsArray);
      const resultObject = {};

      productsArray.forEach((productList) => {
        const category = productList[0]?.category;

        if (category) {
          resultObject[category] = productList;
        }
      });
      console.log("resultObject", resultObject);
      console.log("Electronic products:", resultObject[header_select]);
      // Flatten the array of arrays into a single array
      const flattenedProducts = productsArray.flat();

      setFilteredCategory(resultObject[header_select]);
      console.log("Filtered Category:", flattenedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCategory = (data) => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const handle_click_header_category = (item) => {
    console.log("item", item);
    setheader_select(item);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    console.log("searchInput", event.target.value);
  };

  const callback_product = (data) => {
    console.log("data", data);
    setproduct(data);
  };

  const callback_cart = (newData) => {
    if (cart.length === 0) {
      let newCart = [];
      newCart.push(newData);
      setcart(newCart);
    } else {
      const newCart = [...cart];
      const index = newCart.findIndex((item) => item.id === newData.id);
      if (index === -1) {
        newCart.push(newData);
        console.log("newCart", newCart);
        setcart(newCart);
      }
    }
    console.log(" newData:", newData);
  };

  const handleCardClick = (item) => {
    navigate("/products", { state: { selectedItem: item } });
  };

  useEffect(() => {
    console.log("filterCategory(category)", filterCategory(category));
    setFilteredCategory(
      filterCategory(category).length > 0 ? filterCategory(category) : category
    );
  }, [category, searchInput]);

  useEffect(() => {
    handle_all_category();
  }, []);

  useEffect(() => {
    handle_category();
  }, [all_categories]);

  useEffect(() => {
    if (back_btn) {
      setproduct(false);
      setback_btn(false);
    }
  }, [back_btn]);

  return (
    <div style={{ backgroundColor: "#FFFCFA", fontFamily: "Montserrat" }}>
      {/* Navbar */}
      <nav className="p-4 text-black">
        <div className="container mx-auto px-4 flex justify-between items-center space-x-4">
          <div className="text-xl font-bold">Ecommerce</div>
          <div className="hidden lg:flex lg:gap-x-4">
            {all_categories.map((item) => (
              <a
                key={item}
                className="text-sm font-semibold leading-6 hover:text-gray-400"
                onClick={() => handle_click_header_category(item)}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="p-2 lg:px-10 border rounded-lg"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <span
                style={{
                  cursor: "pointer",
                  position: "relative",
                  right: "35px",
                }}
              >
                <SearchIcon />
              </span>
            </div>
            <button
              style={{
                backgroundColor: "black",
                height: "45px",
                width: "105px",
                borderRadius: "14px",
                color: "white",
              }}
              onClick={() =>
                cart.length > 0 ? setcartPage(true) : setcartPage(false)
              }
            >
              {cart.length || 0} <ShoppingCartIcon />
            </button>
          </div>
        </div>
      </nav>
      {cart.length > 0 && cart_page ? (
        <Cart cart_list={cart} />
      ) : product ? (
        <Product
          back_btn_callback={setback_btn}
          product_details={product}
          cart_callback={callback_cart}
        />
      ) : (
        <Categories
          callback={callback_product}
          cart_callback={callback_cart}
          category_list={filteredCategory}
        />
      )}
    </div>
  );
}

export default CategoryFetching_dummy;
