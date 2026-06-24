/* ===== STORE.JS — Centralised state (mirrors React Context / Redux pattern) =====
 *
 * React Migration Tip:
 *   Replace this with useContext + useReducer (or Zustand / Redux Toolkit).
 *   All state keys map 1-to-1 to React state.
 */

const Store = (() => {
  /* ── State ── */
  let state = {
    cart: [],          // [{ ...product, quantity }]
    wishlist: [],      // [productId]
    activeFilter: 'all',
    searchQuery: '',
    heroIndex: 0,
  };

  const listeners = [];

  /* ── Notify all subscribers ── */
  function notify() {
    listeners.forEach(fn => fn(state));
  }

  /* ── Subscribe ── */
  function subscribe(fn) {
    listeners.push(fn);
    return () => listeners.splice(listeners.indexOf(fn), 1); // unsubscribe
  }

  /* ── Getters ── */
  function getState() { return { ...state }; }

  function getCartCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getCartTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /* ── Cart Actions ── */
  function addToCart(product) {
    const existing = state.cart.find(i => i.id === product.id);
    if (existing) {
      state.cart = state.cart.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      state.cart = [...state.cart, { ...product, quantity: 1 }];
    }
    notify();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    notify();
  }

  function updateQuantity(productId, delta) {
    state.cart = state.cart
      .map(i => i.id === productId ? { ...i, quantity: i.quantity + delta } : i)
      .filter(i => i.quantity > 0);
    notify();
  }

  function clearCart() {
    state.cart = [];
    notify();
  }

  /* ── Wishlist Actions ── */
  function toggleWishlist(productId) {
    if (state.wishlist.includes(productId)) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
    } else {
      state.wishlist = [...state.wishlist, productId];
    }
    notify();
    return state.wishlist.includes(productId);
  }

  function isWishlisted(productId) {
    return state.wishlist.includes(productId);
  }

  /* ── Filter / Search ── */
  function setFilter(filter) {
    state.activeFilter = filter;
    notify();
  }

  function setSearch(query) {
    state.searchQuery = query.toLowerCase();
    notify();
  }

  function getFilteredProducts() {
    let items = PRODUCTS;
    if (state.activeFilter !== 'all') {
      items = items.filter(p => p.category === state.activeFilter);
    }
    if (state.searchQuery) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(state.searchQuery) ||
        p.brand.toLowerCase().includes(state.searchQuery) ||
        p.category.toLowerCase().includes(state.searchQuery)
      );
    }
    return items;
  }

  /* ── Hero ── */
  function setHeroIndex(i) {
    state.heroIndex = i;
    notify();
  }

  return {
    subscribe,
    getState,
    getCartCount,
    getCartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    setFilter,
    setSearch,
    getFilteredProducts,
    setHeroIndex,
  };
})();