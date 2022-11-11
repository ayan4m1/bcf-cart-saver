(() => {
  const getCartId = () => {
    const cookies = document.cookie.split("; ").map((pair) => pair.split("="));
    const pair = cookies.find(([key, value]) => key === "bc_cart_items");

    if (!pair) {
      return;
    }

    const [_, cartId] = pair;

    return cartId;
  };

  const saveCart = () => {
    localStorage.setItem("bcf-cart-id", getCartId());
  };

  const loadCart = () => {
    const cartId = localStorage.getItem("bcf-cart-id");

    if (!cartId) {
      return;
    }

    document.cookie = `bc_cart_items=${cartId}`;
  };

  try {
    if (getCartId() && !localStorage.getItem("bcf-cart-id")) {
      saveCart();
      alert("Saved cart!");
    } else if (localStorage.getItem("bcf-cart-id")) {
      loadCart();
      alert("Loaded cart!");
    } else {
      alert("Not sure what to do!");
    }
  } catch (error) {
    console.error(error);
    alert("Sorry, an error occurred!");
  }
})();
