import Navbar from "../../components/navbar";
import AddAndSearchBar from "./add-and-search-bar";
import FilterButtons from "./filter-buttons";
import CategoryCarousel from "./category-carousel";
import CategoryWrapped from "./category-wrapped";
import { useStore } from "../../zustand/store";
import { useEffect } from "react";
import { getRecipes } from "../../services/api-service";

function Dashboard() {
  // VARIABLES:
  // userID, recipes array and filteredCategory from Zustand store:
  const userID = useStore((state) => state.userID);
  const allRecipes = useStore((state) => state.recipes);
  const { addRecipes } = useStore(); // Populates the Zustand recipes array
  const filteredCategory = useStore((state) => state.filteredCategory);

  // USE EFFECT:
  // Get all recipes on load and update recipes array in the Zustand store:
  useEffect(() => {
    async function getRecipesArr(userID) {
      const res = await getRecipes(userID);
      addRecipes(res);
    }
    getRecipesArr(userID);
  }, []);

  // RENDER:
  return (
    <div className="dashboard-container">
      <Navbar />
      <AddAndSearchBar />
      <FilterButtons />
      {
        // All Recipes button selected:
        filteredCategory === "All Recipes" && allRecipes.length > 0 ? (
          <>
            <CategoryCarousel categoryTitle="Starters" />
            <CategoryCarousel categoryTitle="Mains" />
            <CategoryCarousel categoryTitle="Sides" />
            <CategoryCarousel categoryTitle="Desserts" />
            <CategoryCarousel categoryTitle="Bakery" />
            <CategoryCarousel categoryTitle="Drinks" />
          </>
        ) : (
          filteredCategory === "All Recipes" && (
            <h2>You have no recipes. Get cooking!</h2>
          )
        )
      }

      {
        // Specific category button selected:
        filteredCategory !== "All Recipes" && (
          <CategoryWrapped categoryTitle={`${filteredCategory}`} />
        )
      }
    </div>
  );
}

export default Dashboard;