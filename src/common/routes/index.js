import { FiShoppingCart ,FiUsers ,FiHome ,FiUser ,FiAlignJustify  } from "react-icons/fi";

export const routeLinks = [
    {
      icon: <FiHome  color="#545559" size={22} />,
      route: "/",
      label: "Dashboard",
    },
    {
        icon: <FiAlignJustify color="#545559" size={22}/>,
        route: "/Orders",
        label: "Orders",
      },
    {
      icon: <FiUsers color="#545559" size={22}/>,
      route: "/Customers",
      label: "Customers",
    },
    {
      icon:<FiShoppingCart color="#545559" size={22}/>,
      route: "/Products",
      label: "Products",
    },
    {
        icon:<FiUser color="#545559" size={22}/>,
        route: "/Users",
        label: "Users",
      },
  ];