/**
 * Skye8 JavaScript Practical Assessment
 * Task 5 - Sales dataset
 *
 * This dataset is provided so that every submission is graded against
 * identical data. Extending it is allowed. Replacing it is not.
 * Do not mutate this array at runtime. sort() mutates: sort a copy.
 *
 * Maintainer: Engr. Lionel A.
 */
 
/* eslint-disable */
var SALES = Object.freeze([
  { id: "S01", product: "ProBook 450 Laptop",     category: "Laptops",     quantity: 2,  price: 485000, date: "2025-01-05", region: "Douala"    },
  { id: "S02", product: "Galaxy A15 Smartphone",  category: "Phones",      quantity: 5,  price: 95000,  date: "2025-01-08", region: "Yaounde"   },
  { id: "S03", product: "JBL Tune 520BT",         category: "Audio",       quantity: 8,  price: 32000,  date: "2025-01-12", region: "Douala"    },
  { id: "S04", product: "USB-C Hub 7-in-1",       category: "Accessories", quantity: 12, price: 18000,  date: "2025-01-15", region: "Bamenda"   },
  { id: "S05", product: "Redmi Note 13",          category: "Phones",      quantity: 4,  price: 125000, date: "2025-01-18", region: "Douala"    },
  { id: "S06", product: "Mi Band 8",              category: "Wearables",   quantity: 10, price: 25000,  date: "2025-01-22", region: "Yaounde"   },
  { id: "S07", product: "WH-1000XM5 Headphones", category: "Audio",       quantity: 1,  price: 245000, date: "2025-01-25", region: "Douala"    },
  { id: "S08", product: "ProDisplay 24 FHD",      category: "Displays",    quantity: 3,  price: 145000, date: "2025-01-28", region: "Bamenda"   },
  { id: "S09", product: "Mechanical Keyboard K8", category: "Accessories", quantity: 6,  price: 47000,  date: "2025-02-02", region: "Yaounde"   },
  { id: "S10", product: "Galaxy A15 Smartphone",  category: "Phones",      quantity: 7,  price: 95000,  date: "2025-02-05", region: "Douala"    },
  { id: "S11", product: "ZenBook 14 Ultrabook",   category: "Laptops",     quantity: 1,  price: 620000, date: "2025-02-08", region: "Yaounde"   },
  { id: "S12", product: "JBL Tune 520BT",         category: "Audio",       quantity: 5,  price: 32000,  date: "2025-02-10", region: "Bamenda"   },
  { id: "S13", product: "Wireless Mouse M720",    category: "Accessories", quantity: 9,  price: 28000,  date: "2025-02-12", region: "Douala"    },
  { id: "S14", product: "Galaxy Watch 6",         category: "Wearables",   quantity: 2,  price: 210000, date: "2025-02-15", region: "Yaounde"   },
  { id: "S15", product: "iPhone SE",              category: "Phones",      quantity: 3,  price: 380000, date: "2025-02-18", region: "Douala"    },
  { id: "S16", product: "Mi Band 8",              category: "Wearables",   quantity: 14, price: 25000,  date: "2025-02-20", region: "Bamenda"   },
  { id: "S17", product: "ProBook 450 Laptop",     category: "Laptops",     quantity: 1,  price: 485000, date: "2025-02-22", region: "Douala"    },
  { id: "S18", product: "USB-C Hub 7-in-1",       category: "Accessories", quantity: 8,  price: 18000,  date: "2025-02-25", region: "Yaounde"   },
  { id: "S19", product: "Redmi Note 13",          category: "Phones",      quantity: 6,  price: 125000, date: "2025-02-28", region: "Bamenda"   },
  { id: "S20", product: "ViewFinity S8 27-inch",  category: "Displays",    quantity: 2,  price: 390000, date: "2025-03-02", region: "Douala"    },
  { id: "S21", product: "AirPods Pro 2",          category: "Audio",       quantity: 4,  price: 195000, date: "2025-03-05", region: "Yaounde"   },
  { id: "S22", product: "Galaxy A15 Smartphone",  category: "Phones",      quantity: 3,  price: 95000,  date: "2025-03-08", region: "Bamenda"   },
  { id: "S23", product: "Mechanical Keyboard K8", category: "Accessories", quantity: 4,  price: 47000,  date: "2025-03-10", region: "Douala"    },
  { id: "S24", product: "IdeaPad Slim 3",         category: "Laptops",     quantity: 2,  price: 310000, date: "2025-03-12", region: "Yaounde"   },
  { id: "S25", product: "JBL Tune 520BT",         category: "Audio",       quantity: 6,  price: 32000,  date: "2025-03-15", region: "Douala"    },
  { id: "S26", product: "Mi Band 8",              category: "Wearables",   quantity: 7,  price: 25000,  date: "2025-03-18", region: "Bamenda"   },
  { id: "S27", product: "UltraSharp U2723QE",     category: "Displays",    quantity: 1,  price: 540000, date: "2025-03-20", region: "Yaounde"   },
  { id: "S28", product: "Wireless Mouse M720",    category: "Accessories", quantity: 11, price: 28000,  date: "2025-03-22", region: "Douala"    },
  { id: "S29", product: "Apple Watch SE",         category: "Wearables",   quantity: 2,  price: 185000, date: "2025-03-25", region: "Yaounde"   },
  { id: "S30", product: "ProBook 450 Laptop",     category: "Laptops",     quantity: 3,  price: 485000, date: "2025-03-28", region: "Bamenda"   },
]);
