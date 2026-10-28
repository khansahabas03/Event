import akifPhoto from "../assets/images/akif.jpeg";
import raisaPhoto from "../assets/images/raisa.jpeg";
import memory2018 from "../assets/images/memory2018.jpeg";
import memory2022 from "../assets/images/memory2022.jpeg";

const weddingData = {
  groom: {
    name: "Sheikh Akif",
    address: "Jaipura, Kendrapara, Odisha",
    pin: "754211",
    family: {
      father: { name: "Sk Jabir", relation: "Father" },
      mother: { name: "Sanjida Bibi", relation: "Mother" },
      brothers: [
        { name: "Asif", relation: "Elder Brother" },
        { name: "Tosif", relation: "Elder Brother" },
        { name: "Sahid", relation: "Younger Brother" }
      ]
    }
  },
  bride: {
    name: "Raisa Fareen",
    address: "Fakirabad, Kendrapara, Odisha",
    pin: "754211",
    family: {
      father: { name: "MD Fayaz", relation: "Father" },
      mother: { name: "Razia Bano", relation: "Mother" }
    }
  },
  couple: {
    groomPhoto: akifPhoto,
    bridePhoto: raisaPhoto,
    couplePhoto: memory2022,
    yearsTogether: 10,
    story: "Ten years of love, friendship, trust and countless memories. From the first conversation to this beautiful new beginning, every moment has brought us closer.",
    timeline: [
      { year: "2016", title: "Where It All Began", description: "A beautiful story began and two hearts started their journey together.", image: akifPhoto },
      { year: "2018", title: "Growing Together", description: "Through countless conversations, smiles and memories, their bond grew stronger.", image: memory2018 },
      { year: "2020", title: "Stronger Together", description: "Every challenge made their relationship stronger and their understanding deeper.", image: raisaPhoto },
      { year: "2022", title: "Shared Dreams", description: "They began dreaming about a beautiful future together.", image: memory2022 },
      { year: "2024", title: "Closer Than Ever", description: "Years of memories, laughter and love brought them closer than ever.", image: memory2018 },
      { year: "2026", title: "Forever Begins", description: "After ten beautiful years, their journey leads to a lifetime together.", image: null }
    ]
  },
  events: [
    { id: "haldi", title: "Haldi Ceremony", date: "14 December 2026", time: "Evening onwards", venue: "Residency", mapUrl: "https://maps.app.goo.gl/Wn6P7XpYpKWhhgEw8?g_st=aw", icon: "🌼", note: "A joyful evening of colour, blessings and family." },
    { id: "barat", title: "Barat & Nikah", date: "15 December 2026", time: "12:00 PM onwards", venue: "Mayuree Palace, Garapur, Kendrapara", mapUrl: "https://maps.app.goo.gl/yZE3mc4TZZqcAJc56?g_st=aw", icon: "🥁", note: "Join us as two hearts begin a new chapter together." },
    { id: "reception", title: "Reception", date: "16 December 2026", time: "12:00 PM onwards", venue: "The Palace, Garapur, Kendrapara", mapUrl: "https://maps.app.goo.gl/ZtWcTu4xXAq8yp9F8?g_st=aw", icon: "✨", note: "Celebrate the newlyweds with us." }
  ]
};

export default weddingData;