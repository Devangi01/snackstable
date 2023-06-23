import React, { useState } from "react";

import "./SnackTable.css"; // Import the CSS file for styling

const snacksData = [
  {
    id: 1,
    product_name: "Granola Bar",
    product_weight: "21g",
    price: 299,
    calories: 150,
    ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"]
  },
  {
    id: 2,
    product_name: "Fruit and Nut Mix",
    product_weight: "73g",
    price: 749,
    calories: 353,
    ingredients: [
      "Almonds",
      "Cashews",
      "Dried Cranberries",
      "Dried Blueberries"
    ]
  },
  {
    id: 3,
    product_name: "Veggie Chips",
    product_weight: "28g",
    price: 279,
    calories: 130,
    ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"]
  },
  {
    id: 4,
    product_name: "Protein Balls",
    product_weight: "100g",
    price: 499,
    calories: 318,
    ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"]
  }
];

const SnacksTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredSnacks = snacksData.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchTerm) ||
      snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm)
      )
  );

  const sortedSnacks = filteredSnacks.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];
    if (columnA < columnB) return sortOrder === "asc" ? -1 : 1;
    if (columnA > columnB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <h1>Snacks Table</h1>
      <div className="snacks-table-container">
        <input
          type="text"
          placeholder="Search with Products and Ingredients..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <table className="snacks-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("product_name")}>Product Name</th>
              <th onClick={() => handleSort("product_weight")}>
                Product Weight
              </th>
              <th onClick={() => handleSort("price")}>Price</th>
              <th onClick={() => handleSort("calories")}>Calories</th>
              <th onClick={() => handleSort("ingredients")}>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {sortedSnacks.map((snack) => (
              <tr key={snack.id}>
                <td>{snack.id}</td>
                <td>{snack.product_name}</td>
                <td>{snack.product_weight}</td>
                <td>{snack.price}</td>
                <td>{snack.calories}</td>
                <td>{snack.ingredients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SnacksTable;
