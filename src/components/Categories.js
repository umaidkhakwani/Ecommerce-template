import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

function Categories({ callback, category_list, cart_callback }) {
  const navigate = useNavigate();

  const navigation = [
    { name: "Electronic", href: "#" },
    { name: "Men Fashion", href: "#" },
    { name: "Women Fashion", href: "#" },
    { name: "Jewelry", href: "#" },
  ];

  // const category_list=props.category_list;

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setcategory] = useState([]);

  console.log("category_list", category_list);

  const handle_category = () => {
    try {
      axios
        .get("https://fakestoreapi.com/products/category/jewelery")
        .then((res) => {
          setcategory(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (item) => {
    callback(item);
    // navigate('/products', { state: { selectedItem: item } });
  };

  const handleCart_add = (item) => {
    cart_callback(item);
  };

  useEffect(() => {
    handle_category();
  }, []);

  return (
    //   <div style={{backgroundColor:"#FFFCFA", fontFamily:"Montserrat"}}>

    <div className="container mx-auto p-8">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{ padding: "5px" }}
      >
        {category_list.map((item) => (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "15px",
            }}
          >
            <img
              src={item.image}
              alt="Product 1"
              // class="w-full h-40 object-cover rounded-md mb-2"
              style={{ width: "100%", height: "200px", objectFit: "contain" , cursor:"pointer"}}
              onClick={() => handleCardClick(item)}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  fontSize: "20px",
                  height: "100px",
                  padding: "8px 0px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(item)}
              >
                {item.title}
              </p>
              <p style={{ fontSize: "16.882px", height: "180px" }}>
                {item.description}
              </p>
              <p style={{ fontSize: "16px" }}>
                Price:{" "}
                <span style={{ fontSize: "20px", fontWeight: "700" }}>
                  ${item.price}
                </span>
              </p>
            </div>
            <button
              style={{
                width: "100%",
                margin: "10px 0px",
                padding: "10px 0px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "14px",
                fontSize: "13.505px",
                cursor: "pointer",
              }}
              onClick={() => handleCart_add(item)}
            >
              <span style={{ marginRight: "10px" }}>Add to cart</span>
              <span>
                <ShoppingCartIcon />
              </span>
            </button>
          </div>
        ))}
        {/* {category.map((item) => (
          <div class="bg-white p-4 rounded-md shadow-md">
            <img
              src={item.image}
              alt="Product 1"
              // class="w-full h-40 object-cover rounded-md mb-2"
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  fontSize: "20px",
                  height: "100px",
                  padding: "8px 0px",
                }}
              >
                {item.title}
              </p>
              <p style={{ fontSize: "16.882px", height: "180px" }}>
                {item.description}
              </p>
              <p class="text-black-500 font-bold">Price: ${item.price}</p>
            </div>
            <button
              style={{
                width: "100%",
                margin: "10px 0px",
                padding: "10px 0px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "14px",
              }}
              onClick={() => handleCart_add(item)}
            >
              Add to cart
            </button>
          </div>
        ))} */}
      </div>
    </div>
    //   </div>
  );
}

export default Categories;
