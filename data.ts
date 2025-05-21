const categories = [
  {
    id: "e1d72f68-77d2-4d18-b323-878984b60e12",
    name: "Hamburger",
    image_url: "/images/hamburger.png",
  },
  {
    id: "59c5e8f0-8255-45e4-9674-1602e4f32998",
    name: "Pizza",
    image_url: "/images/pizza.png",
  },
  {
    id: "0c99583e-93c8-47c5-b407-08082f31ea24",
    name: "Taco´s",
    image_url: "/images/taco.png",
  },
  {
    id: "5e0f48b8-24df-417a-950a-4f1efb658974",
    name: "Coffee",
    image_url: "/images/coffee.png",
  },
  {
    id: "08c2755c-b4f4-4077-a034-25d44d6e125e",
    name: "Burrito",
    image_url: "/images/burrito.png",
  },
  {
    id: "04c77716-ab0b-4bbf-afa3-fc67a35ca2e3",
    name: "Fries",
    image_url: "/images/fries.png",
  },
  {
    id: "9dd2df70-98f9-4011-bf8d-4ac9de15ed78",
    name: "Breakfast",
    image_url: "/images/breakfast.png",
  },
];

const restaurants = [
  {
    id: "79d66f8a-3170-4036-a466-09312c721239",
    name: "Waynes Coffee",
    rating: 4.5,
    filter_ids: ["5e0f48b8-24df-417a-950a-4f1efb658974"],
    image_url: "/images/coffee.png",
    delivery_time_minutes: 30,
    price_range_id: "d09ff4c9-e90e-42c7-b78b-bdc65e3331ce",
  },
  {
    id: "3d76ddd2-8018-48ca-9040-ec021ae72d6e",
    name: "Oskars Tacos",
    rating: 3.8,
    filter_ids: ["0c99583e-93c8-47c5-b407-08082f31ea24"],
    image_url: "/images/taco.png",
    delivery_time_minutes: 45,
    price_range_id: "ff6b5391-2f0d-4b39-8ba8-d415c52a425d",
  },
  {
    id: "544d3ab9-6047-4975-b1b3-6bd741765bac",
    name: "Dawids Deli",
    rating: 4.9,
    filter_ids: [
      "04c77716-ab0b-4bbf-afa3-fc67a35ca2e3",
      "08c2755c-b4f4-4077-a034-25d44d6e125e",
    ],
    image_url: "/images/fries.png",
    delivery_time_minutes: 60,
    price_range_id: "f24fc0fb-a339-4240-a223-1365ec1aee07",
  },
  {
    id: "6eefe48e-9a54-4b5f-a89a-3019c3a7cc49",
    name: "Viktors Valmofrön & Potatis",
    rating: 4.2,
    filter_ids: [
      "59c5e8f0-8255-45e4-9674-1602e4f32998",
      "04c77716-ab0b-4bbf-afa3-fc67a35ca2e3",
    ],
    image_url: "/images/pizza.png",
    delivery_time_minutes: 30,
    price_range_id: "ff6b5391-2f0d-4b39-8ba8-d415c52a425d",
  },
  {
    id: "3272382d-c46b-4d85-bba9-51b6e057df9a",
    name: "Sebbes Slizes",
    rating: 4.3,
    filter_ids: ["59c5e8f0-8255-45e4-9674-1602e4f32998"],
    image_url: "/images/pizza.png",
    delivery_time_minutes: 45,
    price_range_id: "d09ff4c9-e90e-42c7-b78b-bdc65e3331ce",
  },
  {
    id: "9702e667-0128-4eb9-a8a2-3bc56e381e44",
    name: "Karls Korv (vegan)",
    rating: 4.4,
    filter_ids: ["9dd2df70-98f9-4011-bf8d-4ac9de15ed78"],
    image_url: "/images/breakfast.png",
    delivery_time_minutes: 20,
    price_range_id: "93a626e5-5017-416b-9505-7411d22f7b38",
  },
  {
    id: "883916cf-4519-485a-833c-76b27044ee95",
    name: "Emils Elit-biffar",
    rating: 4.5,
    filter_ids: ["e1d72f68-77d2-4d18-b323-878984b60e12"],
    image_url: "/images/hamburger.png",
    delivery_time_minutes: 60,
    price_range_id: "f24fc0fb-a339-4240-a223-1365ec1aee07",
  },
];
