import { routes } from "../../../../routes/index";
import { useRoutes } from "react-router-dom";

export const AllRoutes = () => {
    const elements = useRoutes([routes]); // Use routes defined in routes/index.js
    return <>{elements}</>;
}
