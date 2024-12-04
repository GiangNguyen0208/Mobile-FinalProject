import { routes } from "../../../../routes/index";
import { useRoutes } from "react-router-dom";

export const AllRoutes = () => {
    const elements = useRoutes([routes]);
    return <>{elements}</>;
}
