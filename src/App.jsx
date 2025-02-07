import { Suspense, lazy } from "react";
// React Router components - SPA logic
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// React Context components - global state
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// React Components
import CityList from "./components/CityList";
import CountryList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Lazy load components/pages
// lazy method (built in react library) requires a callback function to execute dynamic import and pass in page file path as String.
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    // Wrap all JSX elements needing to have access to value prop object inside context provider component
    <AuthProvider>
      <CitiesProvider>
        {/* // To use React router need to wrap all components in BrowserRouter
      component imported with react-router-dom */}
        <BrowserRouter>
          {/* Use built in Suspense component from React to load a component in between lazy loaded component/pages - fallback prop is component to be used during loading state */}
          <Suspense fallback={<SpinnerFullPage />}>
            {/* Then need to add Routes component inside which will wrap the Route
      component */}
            <Routes>
              {/* Can then add Route component which requires path attribute which acts as URL slug and element attribute which is component to render under slug URL */}
              <Route index path="/" element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  // AppLayout component renders map and UI sidebar components - child of protectedRoute component which only renders if user is logged in
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Adding index attribute will set Route as default child - will render if no other paths in URL match */}
                {/* Can use Navigate component (provided by React Router) to redirect to a specific path - ensures navigates to app/cities path. Add replace attribute to allow to go back one step if hitting back button in browser */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* For nested routes with components to render as sub-pages need to wrap new Routes under a parent Route - paths will act with parent e.g. app/cities, app/countries */}
                <Route path="cities" element={<CityList />} />

                {/* Passing a param to Route requires creating a new Route component and under path specifying path URL and adding - /: and add param name */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
                {/* To render sub routes need to use Outlet component from react router inside where element components need to be rendered - this case Sidebar component */}
              </Route>
              {/* To account for none matching slug URLs, can set a Route with a path of '*' and will load a component when no URL is matched */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
