// ================= MAIN CATEGORIES =================
import weddingVideo from "../assets/wedding.mp4";
import weddingVideo1 from "../assets/wedding1.mp4";



export const categories = [
  "Photography",
  "Films",
  "Printed T-Shirts",
  "Printed Cups",
];

// ================= SUB CATEGORIES =================
export const subCategories = {
  Photography: [
    "Bridal",
    "Destination",
    "Lehenga",
    "Pre Wedding Shoot",
  ],
  Films: [
    "Weddding",
    "Pre-wedding shoot",
    "Haldi",
    "Mehendi",
    "Reception",
    "parlour shoot",
  ],
  "Printed T-Shirts": [
    "Custom Printing",
    "Sports",
    "Photo printing",
  ],
  "Printed Cups": [
    "Photo Printing",
    "Custom Printing",
    "Quotes and typography",
    "Anniversery",
  ],
};

// ================= WORKS DATA =================
export const worksData = {
  Photography: {
    Bridal: [
      {
        id: 1,
        type: "image",
        src: "https://i.pinimg.com/originals/4a/9a/75/4a9a75bed27b86cf9347fea5dc60a246.jpg",
      },
      {
        id: 2,
        type: "image",
        
        src: "https://top10sense.com/wp-content/uploads/2021/11/Wedding-Poses-5-683x1024.png",
      },
    ],

    Destination: [
      {
        id: 3,
        type: "image",
        src: "https://sophietc.photography/wp-content/uploads/2022/09/Gemma-and-Matt-Beach-shots-8.jpg",
      },
      {
        id: 4,
        type: "image",
        src: "https://cdn.shopify.com/s/files/1/0553/6422/3136/files/destination-wedding-photographer_parkergreyphoto.jpg?v=1680632973",
      },
    ],

    Lehenga: [
      {
        id: 5,
        type: "image",
        src: "https://tse3.mm.bing.net/th/id/OIP.jbEQKd_kGmBCzCJkrUH-mQHaJQ?r=0&cb=thfc1falcon2&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],

    "Pre Wedding Shoot": [
      {
        id: 6,
        type: "image",
        src: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/11/SDIMG-156040199610-1.jpg",
      },
    ],
  },

  Films: [
    {
      id: 7,
      type: "video",
      src:  weddingVideo,
    },
    {
      id: 8,
      type: "video",
      src: weddingVideo1,
    },
  ],

  "Printed T-Shirts": [
    {
      id: 9,
      type: "image",
      src: "data:image/webp;base64,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",
    },
    {
      id: 10,
      type: "image",
      src: "https://thf.bing.com/th/id/OIP.dS2_5lB85fzPu8bImt8cDQHaFk?w=255&h=192&c=7&r=0&o=7&cb=thfc1falcon2&pid=1.7&rm=3",
    },
  ],

  "Printed Cups": [
    {
      id: 11,
      type: "image",
      src: "https://thf.bing.com/th/id/OIP.6ISONbyxhd-BSKOoIbCFvAHaDr?w=303&h=173&c=7&r=0&o=7&cb=thfc1falcon2&pid=1.7&rm=3",
    },
    {
      id: 12,
      type: "image",
      src: "data:image/webp;base64,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",
    },
  ],
};
