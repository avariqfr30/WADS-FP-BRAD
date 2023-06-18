// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Orders"
  },
  {
    icon: UilUsersAlt,
    heading: "Clients"
  },
  {
    icon: UilPackage,
    heading: 'Products'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 50, 87, 42, 3, 22, 75, 69, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-06-03T07:57:07.000Z",
          "2023-06-13T07:46:45.000Z",
          "2023-06-13T07:49:16.000Z",
          "2023-06-19T02:30:00.000Z",
          // "2018-09-19T00:00:00.000Z",
          // "2018-09-19T00:30:00.000Z",
          // "2018-09-19T01:00:00.000Z",
          // "2018-09-19T01:30:00.000Z",
          // "2018-09-19T02:00:00.000Z",
          // "2018-09-19T02:30:00.000Z",
          // "2018-09-19T03:00:00.000Z",
          // "2018-09-19T03:30:00.000Z",
          // "2018-09-19T04:00:00.000Z",
          // "2018-09-19T04:30:00.000Z",
          // "2018-09-19T05:00:00.000Z",
          // "2018-09-19T05:30:00.000Z",
          // "2018-09-19T06:00:00.000Z",
          // "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-06-03T07:57:07.000Z",
          "2023-06-13T07:46:45.000Z",
          "2023-06-13T07:49:16.000Z",
          "2023-06-19T02:30:00.000Z",
          // "2018-09-19T00:00:00.000Z",
          // "2018-09-19T00:30:00.000Z",
          // "2018-09-19T01:00:00.000Z",
          // "2018-09-19T01:30:00.000Z",
          // "2018-09-19T02:00:00.000Z",
          // "2018-09-19T02:30:00.000Z",
          // "2018-09-19T03:00:00.000Z",
          // "2018-09-19T03:30:00.000Z",
          // "2018-09-19T04:00:00.000Z",
          // "2018-09-19T04:30:00.000Z",
          // "2018-09-19T05:00:00.000Z",
          // "2018-09-19T05:30:00.000Z",
          // "2018-09-19T06:00:00.000Z",
          // "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-06-03T07:57:07.000Z",
          "2023-06-13T07:46:45.000Z",
          "2023-06-13T07:49:16.000Z",
          "2023-06-19T02:30:00.000Z",
          // "2018-09-19T00:00:00.000Z",
          // "2018-09-19T00:30:00.000Z",
          // "2018-09-19T01:00:00.000Z",
          // "2018-09-19T01:30:00.000Z",
          // "2018-09-19T02:00:00.000Z",
          // "2018-09-19T02:30:00.000Z",
          // "2018-09-19T03:00:00.000Z",
          // "2018-09-19T03:30:00.000Z",
          // "2018-09-19T04:00:00.000Z",
          // "2018-09-19T04:30:00.000Z",
          // "2018-09-19T05:00:00.000Z",
          // "2018-09-19T05:30:00.000Z",
          // "2018-09-19T06:00:00.000Z",
          // "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
