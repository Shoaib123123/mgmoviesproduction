// ================= PHOTOGRAPHY =================
import ph1 from "../assets/ph1.jpg";
import ph2 from "../assets/ph2.jpg";
import ph3 from "../assets/ph3.jpg";
import ph4 from "../assets/ph4.jpg";
import ph5 from "../assets/ph5.jpg";

// ================= FILMS (VIDEOS) =================
import film1 from "../assets/work-bg.mp4";
import film2 from "../assets/work-bg1.mp4";

// ================= T-SHIRTS =================
import tshirt1 from "../assets/images/tshirts/tshirts1.jpg";
import tshirt2 from "../assets/images/tshirts/tshirts2.jpg";
import tshirt3 from "../assets/images/tshirts/tshirts3.jpg";
import tshirt4 from "../assets/images/tshirts/tshirts4.jpg";

// ================= CUPS =================
import cup1 from "../assets/cup1.jpg";
import cup2 from "../assets/cup2.jpg";
import cup3 from "../assets/cup3.jpg";
import cup4 from "../assets/cup4.jpg";

// ================= CATEGORIES =================
export const categories = [
  "Photography",
  "Films",
  "Printed T-Shirts",
  "Printed Cups",
];

// ================= WORKS DATA =================
export const worksData = {
  Photography: [
    { id: 1, type: "image", src: ph1 },
    { id: 2, type: "image", src: ph2 },
    { id: 3, type: "image", src: ph3 },
    { id: 4, type: "image", src: ph4 },
    { id: 5, type: "image", src: ph5 },
  ],

  Films: [
    { id: 1, type: "video", src: film1 },
    { id: 2, type: "video", src: film2 },
  ],

  "Printed T-Shirts": [
    { id: 1, type: "image", src: tshirt1 },
    { id: 2, type: "image", src: tshirt2 },
    { id: 3, type: "image", src: tshirt3 },
    { id: 4, type: "image", src: tshirt4 },
  ],

  "Printed Cups": [
    { id: 1, type: "image", src: cup1 },
    { id: 2, type: "image", src: cup2 },
    { id: 3, type: "image", src: cup3 },
    { id: 4, type: "image", src: cup4 },
  ],
};
