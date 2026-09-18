import React, { useState } from "react";

const WHATSAPP_NUMBER = "916392688212";

const products = [
  {
    id: "WH-001",
    name: "Wireless Headphones",
    price: 1299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    description: "Premium wireless headphones with clear sound and deep bass."
  },
  {
    id: "SW-002",
    name: "Smart Watch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    description: "Stylish smartwatch with fitness and notification features."
  },
  {
    id: "MK-003",
    name: "Mechanical Keyboard",
    price: 1899,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
    description: "Mechanical keyboard for work, coding and gaming."
  },
  {
    id: "MS-004",
    name: "Wireless Mouse",
    price: 799,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900",
    description: "Comfortable wireless mouse for everyday productivity."
  }
];

function money(value) {
  return "Rs. " + value.toLocaleString("en-IN");
}

function openWhatsApp(message) {
  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    area: "",
    city: "",
    state: "",
    pin: ""
  });

  function addToCart(product) {
    setCart(function (currentCart) {
      const existing = currentCart.find(function (item) {
        return item.id === product.id;
      });

      if (existing) {
        return currentCart.map(function (item) {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  }

  function increaseQuantity(id) {
    setCart(function (currentCart) {
      return currentCart.map(function (item) {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      });
    });
  }

  function decreaseQuantity(id) {
    setCart(function (currentCart) {
      return currentCart
        .map(function (item) {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          }

          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        });
    });
  }

  function removeFromCart(id) {
    setCart(function (currentCart) {
      return currentCart.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  function updateCustomer(field, value) {
    setCustomer(function (current) {
      return {
        ...current,
        [field]: value
      };
    });
  }

  function openOrder(product) {
    setOrderProduct(product);
    setOrderQuantity(1);
  }

  function orderSingleProduct() {
    if (!orderProduct) {
      return;
    }

    if (!customer.name || !customer.mobile || !customer.address || !customer.city || !customer.state || !customer.pin) {
      alert("Please fill all required customer details.");
      return;
    }

    const total = orderProduct.price * orderQuantity;

    const message =
      "Hello! I want to place an order.\n\n" +
      "CUSTOMER DETAILS\n" +
      "Name: " +
      customer.name +
      "\n" +
      "Mobile: " +
      customer.mobile +
      "\n" +
      "House/Flat/Shop: " +
      customer.address +
      "\n" +
      "Area/Street/Landmark: " +
      customer.area +
      "\n" +
      "City: " +
      customer.city +
      "\n" +
      "State: " +
      customer.state +
      "\n" +
      "PIN: " +
      customer.pin +
      "\n\n" +
      "ORDER DETAILS\n" +
      "Product: " +
      orderProduct.name +
      "\n" +
      "Product ID: " +
      orderProduct.id +
      "\n" +
      "Price: " +
      money(orderProduct.price) +
      "\n" +
      "Quantity: " +
      orderQuantity +
      "\n" +
      "Total: " +
      money(total) +
      "\n\n" +
      "Please confirm my order.";

    openWhatsApp(message);
  }

  function orderCart() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customer.name || !customer.mobile || !customer.address || !customer.city || !customer.state || !customer.pin) {
      alert("Please fill all required customer details.");
      return;
    }

    let message =
      "Hello! I want to place a multiple-product order.\n\n" +
      "CUSTOMER DETAILS\n" +
      "Name: " +
      customer.name +
      "\n" +
      "Mobile: " +
      customer.mobile +
      "\n" +
      "House/Flat/Shop: " +
      customer.address +
      "\n" +
      "Area/Street/Landmark: " +
      customer.area +
      "\n" +
      "City: " +
      customer.city +
      "\n" +
      "State: " +
      customer.state +
      "\n" +
      "PIN: " +
      customer.pin +
      "\n\n" +
      "ORDER DETAILS\n\n";

    cart.forEach(function (item, index) {
      const itemTotal = item.price * item.quantity;

      message =
        message +
        index +
        1 +
        ". " +
        item.name +
        "\n" +
        "Product ID: " +
        item.id +
        "\n" +
        "Price: " +
        money(item.price) +
        "\n" +
        "Quantity: " +
        item.quantity +
        "\n" +
        "Item Total: " +
        money(itemTotal) +
        "\n\n";
    });

    message =
      message +
      "--------------------------\n" +
      "GRAND TOTAL: " +
      money(cartTotal()) +
      "\n\n" +
      "Please confirm my order.";

    openWhatsApp(message);
  }

  function cartTotal() {
    return cart.reduce(function (total, item) {
      return total + item.price * item.quantity;
    }, 0);
  }

  function cartCount() {
    return cart.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>AIShop</h1>
          <p style={styles.tagline}>Shop Smart. Order Easily.</p>
        </div>

        <button
          style={styles.cartButton}
          onClick={function () {
            setCartOpen(true);
          }}
        >
          Cart ({cartCount()})
        </button>
      </header>

      <main style={styles.container}>
        <h2 style={styles.heading}>Our Products</h2>

        <div style={styles.grid}>
          {products.map(function (product) {
            return (
              <div style={styles.card} key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />

                <div style={styles.cardBody}>
                  <h3 style={styles.productName}>{product.name}</h3>

                  <p style={styles.description}>
                    {product.description}
                  </p>

                  <p style={styles.price}>{money(product.price)}</p>

                  <div style={styles.buttonRow}>
                    <button
                      style={styles.addButton}
                      onClick={function () {
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      style={styles.orderButton}
                      onClick={function () {
                        openOrder(product);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {orderProduct && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              style={styles.closeButton}
              onClick={function () {
                setOrderProduct(null);
              }}
            >
              X
            </button>

            <h2>Order Now</h2>

            <h3>{orderProduct.name}</h3>

            <p>Price: {money(orderProduct.price)}</p>

            <label>Quantity</label>

            <div style={styles.quantityBox}>
              <button
                style={styles.smallButton}
                onClick={function () {
                  setOrderQuantity(function (q) {
                    return Math.max(1, q - 1);
                  });
                }}
              >
                -
              </button>

              <strong>{orderQuantity}</strong>

              <button
                style={styles.smallButton}
                onClick={function () {
                  setOrderQuantity(function (q) {
                    return q + 1;
                  });
                }}
              >
                +
              </button>
            </div>

            <CustomerForm
              customer={customer}
              updateCustomer={updateCustomer}
            />

            <button
              style={styles.whatsappButton}
              onClick={orderSingleProduct}
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              style={styles.closeButton}
              onClick={function () {
                setCartOpen(false);
              }}
            >
              X
            </button>

            <h2>Your Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map(function (item) {
                  return (
                    <div style={styles.cartItem} key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.cartImage}
                      />

                      <div style={styles.cartInfo}>
                        <h3>{item.name}</h3>

                        <p>{money(item.price)}</p>

                        <div style={styles.quantityBox}>
                          <button
                            style={styles.smallButton}
                            onClick={function () {
                              decreaseQuantity(item.id);
                            }}
                          >
                            -
                          </button>

                          <strong>{item.quantity}</strong>

                          <button
                            style={styles.smallButton}
                            onClick={function () {
                              increaseQuantity(item.id);
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          style={styles.removeButton}
                          onClick={function () {
                            removeFromCart(item.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

                <hr />

                <h2>Total: {money(cartTotal())}</h2>

                <CustomerForm
                  customer={customer}
                  updateCustomer={updateCustomer}
                />

                <button
                  style={styles.whatsappButton}
                  onClick={orderCart}
                >
                  Order All on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerForm({ customer, updateCustomer }) {
  return (
    <div style={styles.customerBox}>
      <h3>Customer Details</h3>

      <input
        style={styles.input}
        placeholder="Full Name *"
        value={customer.name}
        onChange={function (e) {
          updateCustomer("name", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="Mobile Number *"
        value={customer.mobile}
        onChange={function (e) {
          updateCustomer("mobile", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="House / Flat / Shop Address *"
        value={customer.address}
        onChange={function (e) {
          updateCustomer("address", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="Area / Street / Landmark"
        value={customer.area}
        onChange={function (e) {
          updateCustomer("area", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="City *"
        value={customer.city}
        onChange={function (e) {
          updateCustomer("city", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="State *"
        value={customer.state}
        onChange={function (e) {
          updateCustomer("state", e.target.value);
        }}
      />

      <input
        style={styles.input}
        placeholder="PIN Code *"
        value={customer.pin}
        onChange={function (e) {
          updateCustomer("pin", e.target.value);
        }}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
    color: "#222"
  },

  header: {
    background: "#111827",
    color: "white",
    padding: "18px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10
  },

  logo: {
    margin: 0,
    fontSize: "28px"
  },

  tagline: {
    margin: "5px 0 0",
    color: "#cbd5e1"
  },

  cartButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "30px auto"
  },

  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px"
  },

  card: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "18px"
  },

  productName: {
    margin: "0 0 8px",
    fontSize: "20px"
  },

  description: {
    color: "#64748b",
    minHeight: "45px"
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "15px 0"
  },

  buttonRow: {
    display: "flex",
    gap: "10px"
  },

  addButton: {
    flex: 1,
    padding: "11px",
    border: "1px solid #2563eb",
    background: "white",
    color: "#2563eb",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  orderButton: {
    flex: 1,
    padding: "11px",
    border: "none",
    background: "#16a34a",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 100
  },

  modal: {
    background: "white",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "14px",
    padding: "25px",
    position: "relative"
  },

  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "#ef4444",
    color: "white",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "10px 0 20px"
  },

  smallButton: {
    width: "34px",
    height: "34px",
    border: "none",
    background: "#e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px"
  },

  customerBox: {
    marginTop: "20px",
    padding: "18px",
    background: "#f8fafc",
    borderRadius: "10px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px"
  },

  whatsappButton: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    border: "none",
    background: "#16a34a",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  cartItem: {
    display: "flex",
    gap: "15px",
    padding: "15px 0",
    borderBottom: "1px solid #e5e7eb"
  },

  cartImage: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  cartInfo: {
    flex: 1
  },

  removeButton: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "7px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
